def confidence_breakdown(wiki, news, contradiction):
    breakdown = {
        "wikipedia_match": bool(wiki),
        "news_confirmation": len(news) if news else 0,
        "contradiction_found": bool(contradiction)
    }

    score = 0
    if wiki:
        score += 40
    if news:
        score += 30
    if not contradiction:
        score += 30

    return score, breakdown
