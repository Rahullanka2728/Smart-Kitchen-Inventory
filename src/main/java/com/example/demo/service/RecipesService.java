package com.example.demo.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Recipes;

public interface RecipesService {

    Recipes addRecipe(Recipes recipe);

    List<Recipes> getAllRecipes();

    Recipes getRecipeById(Long id);

    Recipes updateRecipe(Long id, Recipes recipe);

    void deleteRecipe(Long id);

    String uploadRecipeImage(Long id, MultipartFile file);

}