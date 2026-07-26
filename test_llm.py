from app.llm import generate_response

prompt = """
You are an expert chef.

Suggest one recipe using:
- Tomato
- Cheese
- Mushroom

Return:
1. Recipe Name
2. Ingredients
3. Steps
"""

response = generate_response(prompt)

print(response)