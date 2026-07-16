package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.recipe_ingredients;
import com.example.demo.service.RecipeIngredientsService;

@RestController
@RequestMapping("/api/recipe-ingredients")
@CrossOrigin(origins = "*")
public class RecipeIngredientsController {

    @Autowired
    private RecipeIngredientsService recipeIngredientsService;

    @PostMapping
    public recipe_ingredients addRecipeIngredient(@RequestBody recipe_ingredients recipeIngredient) {
        return recipeIngredientsService.addRecipeIngredient(recipeIngredient);
    }

    @GetMapping
    public List<recipe_ingredients> getAllRecipeIngredients() {
        return recipeIngredientsService.getAllRecipeIngredients();
    }

    @GetMapping("/{id}")
    public recipe_ingredients getRecipeIngredientById(@PathVariable Long id) {
        return recipeIngredientsService.getRecipeIngredientById(id);
    }

    @PutMapping("/{id}")
    public recipe_ingredients updateRecipeIngredient(@PathVariable Long id,
                                                    @RequestBody recipe_ingredients recipeIngredient) {
        return recipeIngredientsService.updateRecipeIngredient(id, recipeIngredient);
    }

    @DeleteMapping("/{id}")
    public String deleteRecipeIngredient(@PathVariable Long id) {

        recipeIngredientsService.deleteRecipeIngredient(id);

        return "Recipe Ingredient Deleted Successfully";
    }
}