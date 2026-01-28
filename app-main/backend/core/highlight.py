def highlight_incorrect_phrase(text: str, phrase: str):
    if phrase.lower() in text.lower():
        return phrase
    return None
