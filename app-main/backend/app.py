from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
app.config['DEBUG'] = True

# In-memory storage (for development)
scams_db = []
history_db = {}
analyses_db = {}

# Mock user data (in production, use a database)
users_db = [
    {
        "id": 1,
        "email": "test@example.com",
        "name": "Test User",
        "password": "password123"  # In production, hash passwords!
    }
]

# Authentication middleware
def authenticate_user():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None
    
    # Simple token check (replace with JWT in production)
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        # For now, accept any token
        user = next((u for u in users_db if u['email'] == token), None)
        return user
    return None

# ----- SCAMS ENDPOINTS -----
@app.route('/api/scams', methods=['GET'])
def get_scams():
    """Get all scam alerts"""
    return jsonify(scams_db)

@app.route('/api/scams', methods=['POST'])
def add_scam():
    """Add a new scam alert"""
    data = request.json
    new_scam = {
        'id': len(scams_db) + 1,
        'title': data.get('title'),
        'description': data.get('description'),
        'severity': data.get('severity', 'MEDIUM'),
        'date': datetime.now().strftime('%Y-%m-%d'),
        'category': data.get('category', 'Uncategorized'),
        'region': data.get('region', 'Global'),
        'reported_by': data.get('reported_by', 'Anonymous'),
        'tags': data.get('tags', [])
    }
    scams_db.append(new_scam)
    return jsonify(new_scam), 201

# ----- HISTORY ENDPOINTS -----
@app.route('/api/history/<email>', methods=['GET'])
def get_user_history(email):
    """Get user's analysis history"""
    if email not in history_db:
        history_db[email] = []
    return jsonify(history_db[email])

@app.route('/api/history', methods=['POST'])
def add_to_history():
    """Add analysis to history"""
    data = request.json
    user_email = data.get('user_email')
    
    if not user_email:
        return jsonify({'error': 'User email required'}), 400
    
    if user_email not in history_db:
        history_db[user_email] = []
    
    history_item = {
        'id': data.get('id', f"hist_{len(history_db[user_email]) + 1}"),
        'input_text': data.get('input_text', ''),
        'final_label': data.get('final_label', 'Processing'),
        'confidence': data.get('confidence', 0),
        'timestamp': data.get('timestamp', datetime.now().isoformat()),
        'type': data.get('type', 'text'),
        'source': data.get('source', 'user'),
        'analysis_id': data.get('analysis_id')
    }
    
    history_db[user_email].append(history_item)
    return jsonify(history_item), 201

# ----- ANALYSIS ENDPOINTS -----
@app.route('/api/analyze/text', methods=['POST'])
def analyze_text():
    """Analyze text for misinformation"""
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'Text is required'}), 400
    
    # Mock analysis (replace with actual ML model)
    analysis_id = f"analysis_{len(analyses_db) + 1}"
    
    # Simple keyword-based detection
    fake_keywords = ['hoax', 'fake', 'scam', 'conspiracy', 'misinformation']
    real_keywords = ['verified', 'confirmed', 'official', 'trusted']
    
    fake_count = sum(1 for keyword in fake_keywords if keyword in text.lower())
    real_count = sum(1 for keyword in real_keywords if keyword in text.lower())
    
    if fake_count > real_count:
        verdict = 'FAKE'
        confidence = min(90 + fake_count * 5, 99)
    else:
        verdict = 'LIKELY TRUE'
        confidence = min(70 + real_count * 5, 95)
    
    analysis = {
        'id': analysis_id,
        'input_text': text[:100] + ('...' if len(text) > 100 else ''),
        'full_text': text,
        'final_label': verdict,
        'confidence': confidence,
        'timestamp': datetime.now().isoformat(),
        'breakdown': {
            'source_credibility': 85,
            'factual_consistency': 78,
            'bias_detection': 65,
            'emotional_language': fake_count * 10
        },
        'sources_checked': [
            'FactCheck.org',
            'Reuters Fact Check',
            'AP News Verification'
        ],
        'recommendation': 'Verify with additional sources' if confidence < 90 else 'Highly credible'
    }
    
    analyses_db[analysis_id] = analysis
    return jsonify(analysis)

@app.route('/api/analyze/url', methods=['POST'])
def analyze_url():
    """Analyze URL for misinformation"""
    data = request.json
    url = data.get('url', '')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    # Mock analysis (replace with actual web scraping)
    analysis_id = f"url_analysis_{len(analyses_db) + 1}"
    
    analysis = {
        'id': analysis_id,
        'url': url,
        'final_label': 'REAL',
        'confidence': 88,
        'timestamp': datetime.now().isoformat(),
        'domain_trust_score': 85,
        'fact_check': 'No major issues found',
        'sources': ['WHO', 'CDC', 'Reuters'],
        'recommendation': 'Source is generally reliable'
    }
    
    analyses_db[analysis_id] = analysis
    return jsonify(analysis)

@app.route('/api/analysis/<analysis_id>', methods=['GET'])
def get_analysis(analysis_id):
    """Get analysis by ID"""
    if analysis_id in analyses_db:
        return jsonify(analyses_db[analysis_id])
    return jsonify({'error': 'Analysis not found'}), 404

# ----- TRENDING ENDPOINTS -----
@app.route('/api/trending', methods=['GET'])
def get_trending():
    """Get trending misinformation topics"""
    trending = [
        "Election misinformation spreading globally",
        "AI deepfake videos targeting politicians",
        "Health misinformation about new treatments",
        "Financial scam alerts rising by 40%",
        "Fake celebrity endorsements on social media"
    ]
    return jsonify(trending)

# ----- AUTH ENDPOINTS -----
@app.route('/api/login', methods=['POST'])
def login():
    """User login"""
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = next((u for u in users_db if u['email'] == email and u['password'] == password), None)
    
    if user:
        return jsonify({
            'token': email,  # Simple token (use JWT in production)
            'user': {
                'id': user['id'],
                'email': user['email'],
                'name': user['name']
            }
        })
    
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/register', methods=['POST'])
def register():
    """User registration"""
    data = request.json
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    
    if not all([email, name, password]):
        return jsonify({'error': 'All fields are required'}), 400
    
    # Check if user exists
    if any(u['email'] == email for u in users_db):
        return jsonify({'error': 'User already exists'}), 400
    
    new_user = {
        'id': len(users_db) + 1,
        'email': email,
        'name': name,
        'password': password
    }
    
    users_db.append(new_user)
    
    return jsonify({
        'message': 'Registration successful',
        'user': {
            'id': new_user['id'],
            'email': new_user['email'],
            'name': new_user['name']
        }
    })

# ----- HEALTH CHECK -----
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'timestamp': datetime.now().isoformat(),
        'endpoints': [
            '/api/scams',
            '/api/history/<email>',
            '/api/analyze/text',
            '/api/analyze/url',
            '/api/trending',
            '/api/login',
            '/api/register'
        ]
    })

if __name__ == '__main__':
    # Initialize with some sample data
    scams_db.extend([
        {
            "id": 1,
            "title": "Fake Government Grant Scam",
            "description": "Scammers contacting individuals claiming they've won government grants requiring processing fees.",
            "severity": "HIGH",
            "date": "2024-01-20",
            "category": "Government Impersonation",
            "region": "Global",
            "reported_by": "FTC Alerts",
            "tags": ["phishing", "government", "financial"]
        },
        {
            "id": 2,
            "title": "AI Deepfake Investment Scams",
            "description": "Fraudsters using AI-generated videos of celebrities to promote fake cryptocurrency investments.",
            "severity": "HIGH",
            "date": "2024-01-18",
            "category": "Investment Fraud",
            "region": "Worldwide",
            "reported_by": "SEC",
            "tags": ["deepfake", "crypto", "investment"]
        }
    ])
    
    # Start the server
    print("Starting Veritas Backend API...")
    print("Available endpoints:")
    print("  GET  /api/scams")
    print("  POST /api/scams")
    print("  GET  /api/history/<email>")
    print("  POST /api/analyze/text")
    print("  POST /api/analyze/url")
    print("  GET  /api/trending")
    print("  POST /api/login")
    print("  POST /api/register")
    print("  GET  /api/health")
    print("\nServer running at: http://127.0.0.1:8000")
    
    app.run(host='127.0.0.1', port=8000, debug=True)