from fpdf import FPDF
import os

pdf = FPDF()
pdf.add_page()
pdf.set_font("Arial", size=12)

content = """ALEX CHEN
Senior Full-Stack Engineer
alex.chen@email.com | San Francisco, CA | github.com/alexc

SUMMARY
Senior Software Engineer with 6+ years of experience designing scalable, distributed systems and agentic AI tools. 
Proven track record of leading migrations from monolithic to microservice architectures.

EXPERIENCE
TechCorp Inc. -- Senior Backend Engineer (2021 - Present)
- Led the migration of a monolithic payment processing system to a scalable Node.js/Express 
  microservices architecture, reducing latency by 45%.
- Implemented a vector embeddings search layer using Python, FastAPI, and Pinecone, 
  increasing search relevance by 30%.
- Mentored 3 junior developers and established CI/CD best practices using GitHub Actions.

StartupX -- Full Stack Developer (2018 - 2021)
- Developed responsive frontend applications using Next.js, React, and Tailwind CSS.
- Optimized MongoDB aggregation pipelines, cutting down report generation time from 10 minutes 
  to 45 seconds.

SKILLS
Languages: JavaScript, TypeScript, Python, SQL
Frameworks: React, Next.js, Node.js, Express, FastAPI, LangChain
Databases: MongoDB, PostgreSQL, Redis, Pinecone Vector DB"""

for line in content.split('\n'):
    pdf.cell(200, 8, txt=line.encode('latin-1', 'replace').decode('latin-1'), ln=True)

output_path = r"d:\Antigravity projects\BuildX\Mock_Resume.pdf"
pdf.output(output_path)
print(f"Successfully generated PDF at: {output_path}")
