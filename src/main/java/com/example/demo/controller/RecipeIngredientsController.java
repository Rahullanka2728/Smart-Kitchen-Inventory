package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.RecipeIngredients;
import com.example.demo.service.RecipeIngredientsService;

@RestController
@RequestMapping("/api/recipe-ingredients")
@CrossOrigin(origins = "*")
public class RecipeIngredientsController {

    private final RecipeIngredientsService recipeIngredientsService;

    public RecipeIngredientsController(RecipeIngredientsService recipeIngredientsService) {
        this.recipeIngredientsService = recipeIngredientsService;
    }

    @PostMapping
    public RecipeIngredients addRecipeIngredient(@RequestBody RecipeIngredients recipeIngredient) {
        return recipeIngredientsService.addRecipeIngredient(recipeIngredient);
    }

    @GetMapping
    public List<RecipeIngredients> getAllRecipeIngredients() {
        return recipeIngredientsService.getAllRecipeIngredients();
    }

    @GetMapping("/{id}")
    public RecipeIngredients getRecipeIngredientById(@PathVariable Long id) {
        return recipeIngredientsService.getRecipeIngredientById(id);
    }

    @PutMapping("/{id}")
    public RecipeIngredients updateRecipeIngredient(@PathVariable Long id,
                                                    @RequestBody RecipeIngredients recipeIngredient) {
        return recipeIngredientsService.updateRecipeIngredient(id, recipeIngredient);
    }

    @DeleteMapping("/{id}")
    public String deleteRecipeIngredient(@PathVariable Long id) {

        recipeIngredientsService.deleteRecipeIngredient(id);

        return "Recipe Ingredient Deleted Successfully";
    }
}