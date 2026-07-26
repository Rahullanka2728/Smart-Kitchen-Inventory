from app.inventory import sort_by_expiry

ingredients = [
    "Rice",
    "Chicken",
    "Tomato",
    "Onion"
]

expiry_days = [5, 1, 2, 4]

result = sort_by_expiry(ingredients, expiry_days)

print(result)