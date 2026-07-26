from app.agents import recipe_agent

ingredients = [
    "Rice",
    "Chicken",
    "Tomato",
    "Onion"
]

expiry_days = [5, 1, 2, 4]

result = recipe_agent(ingredients)

print(result)