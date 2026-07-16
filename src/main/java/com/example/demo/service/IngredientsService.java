package com.example.demo.service;

import java.util.List;

import com.example.demo.models.ingredients;

public interface IngredientsService {

    ingredients addIngredient(ingredients ingredient);

    List<ingredients> getAllIngredients();

    ingredients getIngredientById(Long id);

    ingredients updateIngredient(Long id, ingredients ingredient);

    void deleteIngredient(Long id);

}