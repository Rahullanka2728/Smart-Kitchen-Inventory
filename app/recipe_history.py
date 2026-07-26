import json
import psycopg2
from datetime import datetime

connection = psycopg2.connect(
    host="food-inventory-db.crcawkq2aeeg.ap-south-1.rds.amazonaws.com",
    port=5432,
    database="postgres",
    user="postgres",
    password="FoodInventory2026"
)

def save_recipe_history(recipe, ingredients, prompt):
    """
    Saves the generated recipe into 'recipes' table
    and history into 'ai_recipe_history' table.
    """
    try:
        cursor = connection.cursor()

        # Parse cooking time from string if needed (e.g. "20 minutes" -> 20)
        prep_time_str = recipe.get("preparation_time", "20")
        try:
            cooking_time = int(''.join(filter(str.isdigit, str(prep_time_str))))
        except Exception:
            cooking_time = 20

        try:
            servings = int(''.join(filter(str.isdigit, str(recipe.get("servings", "4")))))
        except Exception:
            servings = 4

        instructions_str = "\n".join(recipe.get("steps", []))
        if isinstance(ingredients, list):
            ingredients_str = ", ".join(ingredients)
        else:
            ingredients_str = str(ingredients)

        # 1. Insert into recipes table
        recipe_query = """
        INSERT INTO recipes (recipe_name, category, description, difficulty, image_url, instructions, cooking_time, servings, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING id;
        """
        cursor.execute(recipe_query, (
            recipe.get("recipe_name", "AI Recipe"),
            "AI Generated",
            f"Difficulty: {recipe.get('difficulty', 'Easy')}",
            recipe.get("difficulty", "Easy"),
            recipe.get("image_url", ""),
            instructions_str,
            cooking_time,
            servings,
            datetime.now()
        ))
        recipe_id = cursor.fetchone()[0]

        # 2. Insert into ai_recipe_history table
        history_query = """
        INSERT INTO ai_recipe_history (id, user_id, prompt, available_ingredients, generated_recipe, ai_model, cooking_time, servings, generated_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        cursor.execute(history_query, (
            recipe_id,
            1,  # Default user_id
            prompt,
            ingredients_str,
            json.dumps(recipe),
            "gemini-1.5-flash",
            cooking_time,
            servings,
            datetime.now()
        ))

        connection.commit()
        cursor.close()
        print(f"Successfully saved recipe with ID {recipe_id} into database.")
    except Exception as e:
        connection.rollback()
        print(f"Error saving recipe history: {e}")
