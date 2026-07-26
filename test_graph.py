from app.graph import graph

state = {
    "ingredients": ["Rice", "Chicken", "Tomato", "Onion"],
    "expiry_days": [5, 1, 2, 4],
    "sorted_ingredients": [],
    "recipe": ""
}

result = graph.invoke(state)

print(result)