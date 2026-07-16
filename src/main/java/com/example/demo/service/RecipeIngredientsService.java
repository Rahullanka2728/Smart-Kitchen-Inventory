package com.example.demo.service;

import java.util.List;

import com.example.demo.models.recipe_ingredients;

public interface RecipeIngredientsService {

    recipe_ingredients addRecipeIngredient(recipe_ingredients recipeIngredient);

    List<recipe_ingredients> getAllRecipeIngredients();

    recipe_ingredients getRecipeIngredientById(Long id);

    recipe_ingredients updateRecipeIngredient(Long id, recipe_ingredients recipeIngredient);

    void deleteRecipeIngredient(Long id);

}