from app.image_generator import generate_recipe_image
from app.s3_upload import upload_image

prompt = "Delicious Chicken Fried Rice on a white plate, realistic food photography"

image = generate_recipe_image(prompt)

image_url = upload_image(image, "Chicken Fried Rice")

print("Upload Successful!")
print(image_url)