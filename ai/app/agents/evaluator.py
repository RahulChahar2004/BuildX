import os
import json
from typing import List, Dict
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

def generate_feedback(transcript: List[Dict[str, str]], blueprint: str) -> Dict[str, any]:
    """
    Agent 3: The Grader
    Takes the full conversation and generates a structured rubric score and actionable feedback.
    """
    llm = ChatOpenAI(temperature=0.2, model_name="gpt-4", openai_api_key=os.getenv("OPENAI_API_KEY"))
    
    transcript_text = "\\n".join([f"{msg['role'].capitalize()}: {msg['content']}" for msg in transcript])

    prompt = PromptTemplate(
        input_variables=["transcript", "blueprint"],
        template="""You are an expert technical interview grader. Evaluate the following interview transcript.
        
        Original Interview Blueprint Strategy:
        {blueprint}
        
        Transcript:
        {transcript}
        
        Generate a structured JSON evaluation. STRICTLY return ONLY valid JSON in this exact format, no markdown tags:
        {{
            "scores": {{
                "communication": (score 0-100),
                "technical": (score 0-100),
                "overall": (score 0-100)
            }},
            "feedback": {{
                "strengths": ["strength 1", "strength 2"],
                "weaknesses": ["weakness 1", "weakness 2"],
                "suggestions": ["suggestion 1", "suggestion 2"]
            }}
        }}
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    response_text = chain.run(transcript=transcript_text, blueprint=blueprint).strip()
    
    if response_text.startswith("```json"):
        response_text = response_text[7:-3]
    elif response_text.startswith("```"):
         response_text = response_text[3:-3]
         
    try:
        report = json.loads(response_text)
    except Exception as e:
        report = {
            "error": "Failed to parse LLM JSON",
            "raw_response": response_text
        }
        
    return report
