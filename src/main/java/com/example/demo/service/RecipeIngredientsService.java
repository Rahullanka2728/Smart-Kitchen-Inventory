package com.example.demo.service;

import java.util.List;

import com.example.demo.models.RecipeIngredients;

public interface RecipeIngredientsService {

    RecipeIngredients addRecipeIngredient(RecipeIngredients recipeIngredient);

    List<RecipeIngredients> getAllRecipeIngredients();

    RecipeIngredients getRecipeIngredientById(Long id);

    RecipeIngredients updateRecipeIngredient(Long id, RecipeIngredients recipeIngredient);

    void deleteRecipeIngredient(Long id);

}