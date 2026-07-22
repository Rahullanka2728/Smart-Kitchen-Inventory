package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.RecipeIngredients;
import com.example.demo.repository.RecipeIngredientsRepository;
import com.example.demo.service.RecipeIngredientsService;

@Service
public class RecipeIngredientsServiceImpl implements RecipeIngredientsService {

    private final RecipeIngredientsRepository recipeIngredientsRepository;

    public RecipeIngredientsServiceImpl(RecipeIngredientsRepository recipeIngredientsRepository) {
        this.recipeIngredientsRepository = recipeIngredientsRepository;
    }

    @Override
    public RecipeIngredients addRecipeIngredient(RecipeIngredients recipeIngredient) {
        return recipeIngredientsRepository.save(recipeIngredient);
    }

    @Override
    public List<RecipeIngredients> getAllRecipeIngredients() {
        return recipeIngredientsRepository.findAll();
    }

    @Override
    public RecipeIngredients getRecipeIngredientById(Long id) {

        return recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));
    }

    @Override
    public RecipeIngredients updateRecipeIngredient(Long id, RecipeIngredients recipeIngredient) {

        RecipeIngredients existing = recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));

        existing.setRecipe(recipeIngredient.getRecipe());
        existing.setIngredient(recipeIngredient.getIngredient());
        existing.setQuantity(recipeIngredient.getQuantity());
        existing.setUnit(recipeIngredient.getUnit());

        return recipeIngredientsRepository.save(existing);
    }

    @Override
    public void deleteRecipeIngredient(Long id) {

        RecipeIngredients existing = recipeIngredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe Ingredient not found"));

        recipeIngredientsRepository.delete(existing);
    }

}