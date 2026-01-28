import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    # Fallback if model is not available (Render-safe)
    nlp = spacy.blank("en")

def extract_entities(text: str):
    doc = nlp(text)
    return [(ent.text, ent.label_) for ent in doc.ents]
