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


def analyze_with_ai(text: str):
    try:
        prompt = f"""
You are a PROFESSIONAL FACT-CHECKER.

CRITICAL RULES (FOLLOW STRICTLY):
- Be skeptical by default
- TRUE requires strong, widely accepted evidence
- If a claim is unverifiable, misleading, or incomplete → verdict MUST be FALSE
- Do NOT assume intent or correctness
- Health, finance, science claims without citations → FALSE

OUTPUT RULES:
- Output ONLY valid JSON
- No markdown
- No explanation
- No extra text

Return JSON EXACTLY in this format:

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

STATEMENT TO CHECK:
{text}
"""

        res = groq.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.0,
            max_tokens=700,
        )

        raw = res.choices[0].message.content.strip()

        # DEBUG LOG
        print("🧠 AI RAW RESPONSE:\n", raw)

        start = raw.find("{")
        end = raw.rfind("}")
        if start == -1 or end == -1:
            raise ValueError("No JSON found")

        data = json.loads(raw[start:end + 1])

        data["key_claims"] = normalize_list(data.get("key_claims", []))
        data["red_flags"] = normalize_list(data.get("red_flags", []))

        # 🔒 HARD PENALTY LOGIC
        verdict = data.get("verdict", "FALSE")
        score = int(data.get("credibility_score", 0))

        if verdict == "TRUE" and score < 75:
            data["verdict"] = "FALSE"
            data["credibility_score"] = min(score, 50)
            data["credibility_label"] = "Moderate"

        if verdict == "FALSE":
            data["credibility_score"] = min(score, 40)

        return data

    except Exception as e:
        logger.error(f"❌ AI failed: {e}")
        return {
            "credibility_score": 20,
            "credibility_label": "Low",
            "verdict": "FALSE",
            "bias_analysis": "AI verification failed",
            "source_verification": "Unavailable",
            "fact_check_summary": "Unable to verify claims",
            "key_claims": [],
            "red_flags": ["AI parsing or response error"],
        }
