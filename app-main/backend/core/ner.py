import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Render-safe fallback
    nlp = spacy.blank("en")

def extract_entities(text: str):
    """
    Returns entities in dict format expected by analyze.py
    [
        {"text": "...", "label": "..."}
    ]
    """
    if not text:
        return []

    doc = nlp(text)

    entities = []
    for ent in doc.ents:
        entities.append({
            "text": ent.text,
            "label": ent.label_
        })

    return entities
