import spacy

try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    nlp = spacy.blank("en")

def extract_entities(text: str):
    doc = nlp(text)
    return [
        {
            "text": ent.text,
            "label": ent.label_
        }
        for ent in doc.ents
    ]
