package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Recipes;
import com.example.demo.service.RecipesService;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipesController {

    private final RecipesService recipesService;

    public RecipesController(RecipesService recipesService) {
        this.recipesService = recipesService;
    }

    @PostMapping
    public Recipes addRecipe(@RequestBody Recipes recipe) {
        return recipesService.addRecipe(recipe);
    }

    @GetMapping
    public List<Recipes> getAllRecipes() {
        return recipesService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public Recipes getRecipeById(@PathVariable Long id) {
        return recipesService.getRecipeById(id);
    }

    @PutMapping("/{id}")
    public Recipes updateRecipe(@PathVariable Long id,
                                @RequestBody Recipes recipe) {
        return recipesService.updateRecipe(id, recipe);
    }

    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable Long id) {

        recipesService.deleteRecipe(id);

        return "Recipe Deleted Successfully";
    }

    @PostMapping("/{id}/upload-image")
    public String uploadRecipeImage(@PathVariable Long id,
                                    @RequestParam("file") MultipartFile file) {

        return recipesService.uploadRecipeImage(id, file);
    }
}