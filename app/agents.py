import json

from app.prompts import RECIPE_PROMPT_TEMPLATE
from app.llm import generate_response


def recipe_agent(inventory_context):

    # Build prompt
    prompt = RECIPE_PROMPT_TEMPLATE.format(
        ingredients=inventory_context
    )

    # Generate response from LLM
    response = generate_response(prompt)

    print("\n========== AI RESPONSE ==========")
    print(response)
    print("=================================\n")

    # Remove markdown code block if present
    response = response.strip()

    if response.startswith("```json"):
        response = response.replace("```json", "", 1)

    if response.startswith("```"):
        response = response.replace("```", "", 1)

    if response.endswith("```"):
        response = response[:-3]

    response = response.strip()

    # Convert JSON string to Python dictionary
    recipe = json.loads(response)

    # Convert ingredient list if AI returns strings
    if (
        recipe.get("ingredients")
        and len(recipe["ingredients"]) > 0
        and isinstance(recipe["ingredients"][0], str)
    ):

        recipe["ingredients"] = [
            {
                "name": ingredient,
                "quantity": "As required"
            }
            for ingredient in recipe["ingredients"]
        ]

    return recipe