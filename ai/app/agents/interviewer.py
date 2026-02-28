import os
from typing import List, Dict, Tuple
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage, AIMessage

def generate_agent_response(transcript: List[Dict[str, str]], blueprint: str) -> Tuple[str, str]:
    """
    Agent 2: The Interviewer
    Maintains memory of the conversation and the initial blueprint.
    Determines if it needs to probe deeper or move on.
    """
    llm = ChatOpenAI(temperature=0.7, model_name="gpt-4", openai_api_key=os.getenv("OPENAI_API_KEY"))
    
    messages = [
        SystemMessage(content=f"You are a Senior Engineering Manager conducting a technical and behavioral interview for a candidate. "
                              f"You must act like a human interviewer. Ask ONE question at a time. Keep responses conversational and concise.\\n"
                              f"Here is your Interview Blueprint (Strategy):\\n{blueprint}")
    ]
    
    for msg in transcript:
        if msg["role"] == "user":
            messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "agent":
            messages.append(AIMessage(content=msg["content"]))
            
    # LLM Call for the response
    response = llm(messages)
    ai_response = response.content
    
    # Internal state decision (simplified)
    next_action = "CONTINUE" 
    if len(transcript) > 15:
        next_action = "CONCLUDE"

    return ai_response, next_action
