package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Ingredients;

public interface IngredientsService {

    Ingredients addIngredient(Ingredients ingredient);

    List<Ingredients> getAllIngredients();

    Ingredients getIngredientById(Long id);

    Ingredients updateIngredient(Long id, Ingredients ingredient);

    void deleteIngredient(Long id);

}