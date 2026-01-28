TRUSTED_SOURCES = {
    "who.int": 95,
    "cdc.gov": 90,
    "reuters.com": 92,
    "apnews.com": 90,
    "bbc.com": 88,
    "gov": 85
}

def score_sources(text: str):
    score = 0
    for src, val in TRUSTED_SOURCES.items():
        if src in text.lower():
            score = max(score, val)
    return score
