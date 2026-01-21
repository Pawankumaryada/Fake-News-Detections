import json
from groq import Groq
from core.config import GROQ_API_KEY, logger

groq = Groq(api_key=GROQ_API_KEY)

def normalize_list(items):
    if not isinstance(items, list):
        return []
    out = []
    for item in items:
        if isinstance(item, str):
            out.append(item)
        elif isinstance(item, dict):
            c = item.get("claim")
            v = item.get("verification")
            if c and v:
                out.append(f"{c} ({v})")
            elif c:
                out.append(c)
    return out

async def analyze_with_ai(text: str):
    try:
        prompt = f"""
You are a STRICT FACT-CHECKING AI.

Rules:
- Output ONLY JSON
- No markdown
- No explanation
- No extra text

Return JSON in EXACT format:

{{
  "credibility_score": 0-100,
  "credibility_label": "Critical | Low | Moderate | High | Verified",
  "verdict": "TRUE or FALSE",
  "bias_analysis": "string",
  "source_verification": "string",
  "fact_check_summary": "string",
  "key_claims": [],
  "red_flags": []
}}

STATEMENT:
{text}
"""

        res = groq.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.1,
            max_tokens=700,
        )

        raw = res.choices[0].message.content.strip()

        # 🔍 DEBUG (IMPORTANT)
        print("🧠 AI RAW RESPONSE:\n", raw)

        # 🔐 SAFE JSON EXTRACTION
        start = raw.find("{")
        end = raw.rfind("}")
        if start == -1 or end == -1:
            raise ValueError("No JSON object found in AI response")

        data = json.loads(raw[start:end + 1])

        data["key_claims"] = normalize_list(data.get("key_claims", []))
        data["red_flags"] = normalize_list(data.get("red_flags", []))

        return data

    except Exception as e:
        logger.error(f"❌ AI failed: {e}")
        return {
            "credibility_score": 0,
            "credibility_label": "Low",
            "verdict": "FALSE",
            "bias_analysis": "AI unavailable",
            "source_verification": "AI unavailable",
            "fact_check_summary": "Verification failed",
            "key_claims": [],
            "red_flags": ["AI parsing error"],
        }
