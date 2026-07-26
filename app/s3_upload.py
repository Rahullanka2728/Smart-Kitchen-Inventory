import boto3
import uuid
import os
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# AWS Credentials
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")

# Create S3 Client
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)


def upload_image(image_bytes, recipe_name):
    """
    Upload recipe image to S3 under recipes/ folder.

    Example:
    recipes/chicken_biryani_a12bc34d.png
    """

    # Convert recipe name into a safe filename
    safe_name = recipe_name.lower()
    safe_name = re.sub(r'[^a-zA-Z0-9 ]', '', safe_name)
    safe_name = safe_name.replace(" ", "_")

    # Generate unique filename
    filename = f"recipes/{safe_name}_{uuid.uuid4().hex[:8]}.png"

    # Upload to S3
    s3.put_object(
        Bucket=AWS_BUCKET_NAME,
        Key=filename,
        Body=image_bytes,
        ContentType="image/png"
    )

    # Return Public URL
    image_url = (
        f"https://{AWS_BUCKET_NAME}.s3.{AWS_REGION}.amazonaws.com/{filename}"
    )

    return image_url