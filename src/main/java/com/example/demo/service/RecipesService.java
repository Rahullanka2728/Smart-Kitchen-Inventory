package com.example.demo.service;

import java.util.List;

import com.example.demo.models.recipes;

public interface RecipesService {

    recipes addRecipe(recipes recipe);

    List<recipes> getAllRecipes();

    recipes getRecipeById(Long id);

    recipes updateRecipe(Long id, recipes recipe);

    void deleteRecipe(Long id);

}