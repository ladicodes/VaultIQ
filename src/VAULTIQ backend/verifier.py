import json
from models.ocr import extract_text
from models.fraud_detection import check_forgery
from models.market_validation import validate_market_value

async def run_verification(doc, metadata_str):
    metadata = json.loads(metadata_str)
    extracted = extract_text(doc)
    fraud_score = check_forgery(doc)
    market_score = validate_market_value(metadata)

    final_score = (fraud_score + market_score) / 2
    status = "approved" if final_score > 0.8 else "flagged"
    return {
        "score": final_score,
        "status": status,
        "details": {
            "fraud": fraud_score,
            "market": market_score,
            "ocr_data": extracted
        }
    }

