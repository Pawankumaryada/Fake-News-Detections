import requests

WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"

def get_wikipedia_summary(entity: str):
    try:
        url = WIKI_API + entity.replace(" ", "_")
        res = requests.get(url, timeout=5)

        if res.status_code != 200:
            return None

        data = res.json()

        return {
            "title": data.get("title"),
            "description": data.get("description"),
            "extract": data.get("extract"),
            "source": data.get("content_urls", {}).get("desktop", {}).get("page"),
        }

    except Exception:
        return None
