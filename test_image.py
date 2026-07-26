from app.image_generator import generate_recipe_image

image = generate_recipe_image(
    "Delicious Chicken Fried Rice on a white plate, realistic food photography"
)

with open("recipe.png", "wb") as f:
    f.write(image)

print("Image Generated Successfully!")