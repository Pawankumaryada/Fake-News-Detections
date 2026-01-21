import requests
import sys
import json
from datetime import datetime

class FakeNewsDetectionAPITester:
    def __init__(self, base_url="https://truth-checker-10.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.analysis_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Non-dict response'}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    print(f"   Error: {error_detail}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout after {timeout}s")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_analyze_text_validation(self):
        """Test text analysis with validation (less than 50 chars)"""
        success, response = self.run_test(
            "Text Analysis Validation (Short Text)",
            "POST",
            "analyze/text",
            400,
            data={"text": "Short text"}
        )
        return success

    def test_analyze_text_success(self):
        """Test successful text analysis"""
        test_text = "This is a sample news article about climate change that contains enough characters to pass the 50 character minimum requirement for analysis. The article discusses various aspects of environmental policy and scientific research."
        
        success, response = self.run_test(
            "Text Analysis Success",
            "POST",
            "analyze/text",
            200,
            data={"text": test_text},
            timeout=60  # LLM analysis might take longer
        )
        
        if success and response:
            # Store analysis ID for later tests
            self.analysis_id = response.get('id')
            print(f"   Analysis ID: {self.analysis_id}")
            
            # Verify response structure
            required_fields = ['id', 'credibility_score', 'credibility_label', 'bias_analysis', 
                             'source_verification', 'fact_check_summary', 'key_claims', 'red_flags']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"   ⚠️  Missing fields: {missing_fields}")
            else:
                print(f"   ✅ All required fields present")
                print(f"   Credibility Score: {response.get('credibility_score')}")
                print(f"   Credibility Label: {response.get('credibility_label')}")
        
        return success

    def test_analyze_url_success(self):
        """Test URL analysis with a real URL"""
        test_url = "https://www.bbc.com/news"
        
        success, response = self.run_test(
            "URL Analysis Success",
            "POST",
            "analyze/url",
            200,
            data={"url": test_url},
            timeout=60  # Web scraping + LLM analysis might take longer
        )
        
        if success and response:
            print(f"   URL Analysis ID: {response.get('id')}")
            print(f"   Input URL: {response.get('input_url')}")
            print(f"   Credibility Score: {response.get('credibility_score')}")
        
        return success

    def test_get_history(self):
        """Test getting analysis history"""
        success, response = self.run_test(
            "Get Analysis History",
            "GET",
            "history",
            200
        )
        
        if success and response:
            print(f"   History count: {len(response) if isinstance(response, list) else 'Not a list'}")
            if isinstance(response, list) and len(response) > 0:
                print(f"   Latest analysis ID: {response[0].get('id')}")
        
        return success

    def test_get_specific_analysis(self):
        """Test getting a specific analysis by ID"""
        if not self.analysis_id:
            print("⚠️  Skipping - No analysis ID available from previous tests")
            return True
        
        success, response = self.run_test(
            "Get Specific Analysis",
            "GET",
            f"analysis/{self.analysis_id}",
            200
        )
        
        if success and response:
            print(f"   Retrieved analysis ID: {response.get('id')}")
            print(f"   Matches stored ID: {response.get('id') == self.analysis_id}")
        
        return success

    def test_get_nonexistent_analysis(self):
        """Test getting a non-existent analysis"""
        fake_id = "non-existent-id-12345"
        success, response = self.run_test(
            "Get Non-existent Analysis",
            "GET",
            f"analysis/{fake_id}",
            404
        )
        return success

def main():
    print("🚀 Starting Fake News Detection API Tests")
    print("=" * 50)
    
    # Setup
    tester = FakeNewsDetectionAPITester()
    
    # Run all tests
    tests = [
        tester.test_root_endpoint,
        tester.test_analyze_text_validation,
        tester.test_analyze_text_success,
        tester.test_analyze_url_success,
        tester.test_get_history,
        tester.test_get_specific_analysis,
        tester.test_get_nonexistent_analysis
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"📈 Success rate: {success_rate:.1f}%")
    
    if success_rate >= 80:
        print("🎉 Backend API tests mostly successful!")
        return 0
    elif success_rate >= 50:
        print("⚠️  Backend API has some issues but core functionality works")
        return 1
    else:
        print("❌ Backend API has significant issues")
        return 2

if __name__ == "__main__":
    sys.exit(main())