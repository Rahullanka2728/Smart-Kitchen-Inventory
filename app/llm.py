from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq

# Load environment variables
load_dotenv()

# Read Groq API Key
api_key = os.getenv("GROQ_API_KEY")

# Create Groq LLM
llm = ChatGroq(
    groq_api_key=api_key,
    model_name="llama-3.3-70b-versatile",
    temperature=0.7
)

# Function to generate response
def generate_response(prompt):
    response = llm.invoke(prompt)
    return response.content