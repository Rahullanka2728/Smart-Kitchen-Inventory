from fastapi import APIRouter, HTTPException
import traceback

from app.schemas import RecipeRequest, RecipeResponse
from app.graph import graph
from app.image_generator import generate_recipe_image
from app.s3_upload import upload_image
from app.database_service import get_inventory_for_ai
from app.recipe_history import save_recipe_history

router = APIRouter()


@router.post("/generate-recipe", response_model=RecipeResponse)
def generate_recipe(request: RecipeRequest):

    try:

        # Fetch inventory directly from PostgreSQL
        ingredients, expiry_days = get_inventory_for_ai()

        # Prepare LangGraph state
        state = {
            "ingredients": ingredients,
            "expiry_days": expiry_days
        }

        # Generate recipe
        result = graph.invoke(state)
        recipe = result["recipe"]

        print("\n========== GENERATED RECIPE ==========")
        print(recipe)
        print("======================================")

        # Generate recipe image
        image_prompt = recipe["image_prompt"]
        image_bytes = generate_recipe_image(image_prompt)

        # Upload image to AWS S3
        image_url = upload_image(
            image_bytes=image_bytes,
            recipe_name=recipe["recipe_name"]
        )

        # Add image URL to response
        recipe["image_url"] = image_url

        # Save recipe history
        save_recipe_history(
            recipe=recipe,
            ingredients=ingredients,
            prompt=image_prompt
        )

        return recipe

    except Exception as e:

        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )