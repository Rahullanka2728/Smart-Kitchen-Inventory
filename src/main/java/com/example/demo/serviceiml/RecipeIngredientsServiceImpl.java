package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.recipe_ingredients;
import com.example.demo.repository.RecipeIngredientsRepository;
import com.example.demo.service.RecipeIngredientsService;

@Service
public class RecipeIngredientsServiceImpl implements RecipeIngredientsService {

    @Autowired
    private RecipeIngredientsRepository recipeIngredientsRepository;

    @Override
    public recipe_ingredients addRecipeIngredient(recipe_ingredients recipeIngredient) {
        return recipeIngredientsRepository.save(recipeIngredient);
    }

    @Override
    public List<recipe_ingredients> getAllRecipeIngredients() {
        return recipeIngredientsRepository.findAll();
    }

    @Override
    public recipe_ingredients getRecipeIngredientById(Long id) {

        return recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));
    }

    @Override
    public recipe_ingredients updateRecipeIngredient(Long id, recipe_ingredients recipeIngredient) {

        recipe_ingredients existing = recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));

        existing.setRecipe(recipeIngredient.getRecipe());
        existing.setIngredient(recipeIngredient.getIngredient());
        existing.setQuantity(recipeIngredient.getQuantity());
        existing.setUnit(recipeIngredient.getUnit());

        return recipeIngredientsRepository.save(existing);
    }

    @Override
    public void deleteRecipeIngredient(Long id) {

        recipe_ingredients existing = recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));

        recipeIngredientsRepository.delete(existing);
    }

}