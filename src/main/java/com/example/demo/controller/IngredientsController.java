package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Ingredients;
import com.example.demo.service.IngredientsService;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "*")
public class IngredientsController {

    private final IngredientsService ingredientsService;

    public IngredientsController(IngredientsService ingredientsService) {
        this.ingredientsService = ingredientsService;
    }

    @PostMapping
    public Ingredients addIngredient(@RequestBody Ingredients ingredient) {
        return ingredientsService.addIngredient(ingredient);
    }

    @GetMapping
    public List<Ingredients> getAllIngredients() {
        
        return ingredientsService.getAllIngredients();
    }

    @GetMapping("/{id}")
    public Ingredients getIngredientById(@PathVariable Long id) {
        return ingredientsService.getIngredientById(id);
    }

    @PutMapping("/{id}")
    public Ingredients updateIngredient(@PathVariable Long id,
                                        @RequestBody Ingredients ingredient) {
        return ingredientsService.updateIngredient(id, ingredient);
    }

    @DeleteMapping("/{id}")
    public String deleteIngredient(@PathVariable Long id) {

        ingredientsService.deleteIngredient(id);

        return "Ingredient Deleted Successfully";
    }
}