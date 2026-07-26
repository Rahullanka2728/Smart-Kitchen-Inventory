import requests
import urllib.parse


def generate_recipe_image(image_prompt: str):
    """
    Generates an AI image using Pollinations AI
    and returns the image bytes.
    """

    prompt = urllib.parse.quote(image_prompt)

    url = f"https://image.pollinations.ai/prompt/{prompt}"

    response = requests.get(url)

    if response.status_code != 200:
        raise Exception("Image generation failed.")

    return response.content