from app.schemas import RecipeRequest

request = RecipeRequest(
    ingredients=["Rice", "Chicken", "Tomato"],
    expiry_days=[5, 1, 2]
)

print(request)