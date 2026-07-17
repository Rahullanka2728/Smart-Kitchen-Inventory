package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.recipes;
import com.example.demo.service.RecipesService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipesController {

    @Autowired
    private RecipesService recipesService;

    @PostMapping
    public recipes addRecipe(@RequestBody recipes recipe) {
        return recipesService.addRecipe(recipe);
    }

    @GetMapping
    public List<recipes> getAllRecipes() {
        return recipesService.getAllRecipes();
    }

    @GetMapping("/{id}")
    public recipes getRecipeById(@PathVariable Long id) {
        return recipesService.getRecipeById(id);
    }

    @PutMapping("/{id}")
    public recipes updateRecipe(@PathVariable Long id,
                                @RequestBody recipes recipe) {
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