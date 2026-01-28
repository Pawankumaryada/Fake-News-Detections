import requests

def get_wikidata_id(entity: str):
    try:
        url = "https://www.wikidata.org/w/api.php"
        params = {
            "action": "wbsearchentities",
            "search": entity,
            "language": "en",
            "format": "json",
            "limit": 1
        }

        response = requests.get(url, params=params, timeout=5)

        # ✅ HARD CHECK
        if response.status_code != 200:
            return None

        data = response.json()

        if not data.get("search"):
            return None

        return data["search"][0]["id"]

    except Exception:
        return None
