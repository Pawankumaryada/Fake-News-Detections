TRUST_SCORES = {
    "wikipedia.org": 90,
    "reuters.com": 95,
    "bbc.com": 95,
    "thehindu.com": 90,
    "aljazeera.com": 85,
}

def rank_sources(urls):
    ranked = []

    for url in urls:
        for domain, score in TRUST_SCORES.items():
            if domain in url:
                ranked.append({
                    "url": url,
                    "trust_score": score
                })
                break
        else:
            ranked.append({
                "url": url,
                "trust_score": 50
            })

    return sorted(ranked, key=lambda x: x["trust_score"], reverse=True)
