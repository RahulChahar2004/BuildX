from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
import os
from dotenv import load_dotenv

# Import agent stubs
from app.agents.parser import parse_context
from app.agents.interviewer import generate_agent_response
from app.agents.evaluator import generate_feedback

load_dotenv()

app = FastAPI(title="BuildX AI Agent Service", version="1.0")

class ParseRequest(BaseModel):
    resume_text: str
    job_description: str
    role_level: str

class ChatRequest(BaseModel):
    transcript: List[Dict[str, str]]
    blueprint_summary: str

class EvaluateRequest(BaseModel):
    transcript: List[Dict[str, str]]
    blueprint_summary: str

@app.get("/")
def read_root():
    return {"status": "AI Service Running"}

@app.post("/v1/parse-context")
def api_parse_context(req: ParseRequest):
    try:
        blueprint = parse_context(req.resume_text, req.job_description, req.role_level)
        return {"success": True, "blueprint": blueprint}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/chat")
def api_chat(req: ChatRequest):
    try:
        response, next_action = generate_agent_response(req.transcript, req.blueprint_summary)
        return {"success": True, "agent_response": response, "next_action": next_action}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/v1/evaluate")
def api_evaluate(req: EvaluateRequest):
    try:
        report = generate_feedback(req.transcript, req.blueprint_summary)
        return {"success": True, "report": report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
