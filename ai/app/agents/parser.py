import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

def parse_context(resume_text: str, job_description: str, role_level: str) -> str:
    """
    Agent 1: Context Extractor
    Takes the resume and JD, identifies skill gaps, and creates an Interview Blueprint.
    """
    llm = ChatOpenAI(temperature=0.2, model_name="gpt-4", openai_api_key=os.getenv("OPENAI_API_KEY"))
    
    prompt = PromptTemplate(
        input_variables=["resume", "jd", "role"],
        template="""You are an expert technical recruiter and engineering manager.
        Your task is to analyze the candidate's resume against the provided Job Description for a {role} position.
        
        Resume: {resume}
        Job Description: {jd}
        
        Output an 'Interview Blueprint' which is a concise strategy guide for the AI interviewer. The blueprint should include:
        1. Core strengths to validate quickly.
        2. Potential weak points or missing skills to probe deeply.
        3. 3-4 specific technical topics or past projects from their resume to ask follow-up questions about.
        """
    )
    
    chain = LLMChain(llm=llm, prompt=prompt)
    blueprint = chain.run(resume=resume_text, jd=job_description, role=role_level)
    
    return blueprint
