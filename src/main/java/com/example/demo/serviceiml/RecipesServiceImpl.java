package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.recipes;
import com.example.demo.repository.RecipesRepository;
import com.example.demo.service.RecipesService;

@Service
public class RecipesServiceImpl implements RecipesService {

    @Autowired
    private RecipesRepository recipesRepository;

    @Override
    public recipes addRecipe(recipes recipe) {
        return recipesRepository.save(recipe);
    }

    @Override
    public List<recipes> getAllRecipes() {
        return recipesRepository.findAll();
    }

    @Override
    public recipes getRecipeById(Long id) {

        return recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @Override
    public recipes updateRecipe(Long id, recipes recipe) {

        recipes existingRecipe = recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        existingRecipe.setRecipeName(recipe.getRecipeName());
        existingRecipe.setCategory(recipe.getCategory());
        existingRecipe.setDescription(recipe.getDescription());
        existingRecipe.setInstructions(recipe.getInstructions());
        existingRecipe.setCookingTime(recipe.getCookingTime());
        existingRecipe.setServings(recipe.getServings());
        existingRecipe.setDifficulty(recipe.getDifficulty());
        existingRecipe.setImageUrl(recipe.getImageUrl());
        existingRecipe.setCreatedBy(recipe.getCreatedBy());

        return recipesRepository.save(existingRecipe);
    }

    @Override
    public void deleteRecipe(Long id) {

        recipes recipe = recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipesRepository.delete(recipe);
    }
}