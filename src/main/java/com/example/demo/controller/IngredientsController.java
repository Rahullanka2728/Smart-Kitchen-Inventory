package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.ingredients;
import com.example.demo.service.IngredientsService;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "*")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping
    public ingredients addIngredient(@RequestBody ingredients ingredient) {
        return ingredientsService.addIngredient(ingredient);
    }

    @GetMapping
    public List<ingredients> getAllIngredients() {
        return ingredientsService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public ingredients getIngredientById(@PathVariable Long id) {
        return ingredientsService.getIngredientById(id);
    }

    @PutMapping("/{id}")
    public ingredients updateIngredient(@PathVariable Long id,
                                        @RequestBody ingredients ingredient) {
        return ingredientsService.updateIngredient(id, ingredient);
    }

    @DeleteMapping("/{id}")
    public String deleteIngredient(@PathVariable Long id) {

        ingredientsService.deleteIngredient(id);

        return "Ingredient Deleted Successfully";
    }
}