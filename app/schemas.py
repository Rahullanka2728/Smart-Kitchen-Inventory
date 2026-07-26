from pydantic import BaseModel
from typing import Optional

# Request Model - all fields optional since inventory is auto-fetched from DB
class RecipeRequest(BaseModel):
    ingredients: Optional[list[str]] = None
    expiry_days: Optional[list[int]] = None



class Ingredient(BaseModel):
    name: str
    quantity: str


class Nutrition(BaseModel):
    calories: str
    protein: str
    carbohydrates: str
    fat: str


class RecipeResponse(BaseModel):
    recipe_name: str
    ingredients: list[Ingredient]
    steps: list[str]
    preparation_time: str
    difficulty: str
    servings: str
    nutrition: Nutrition
    cooking_tips: list[str]
    image_prompt: str
    image_url: str