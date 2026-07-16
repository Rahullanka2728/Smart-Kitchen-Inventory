package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ingredients;
import com.example.demo.repository.IngredientsRepository;
import com.example.demo.service.IngredientsService;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    @Autowired
    private IngredientsRepository ingredientsRepository;

    @Override
    public ingredients addIngredient(ingredients ingredient) {

        if (ingredientsRepository.existsByIngredientName(ingredient.getIngredientName())) {
            throw new RuntimeException("Ingredient already exists");
        }

        return ingredientsRepository.save(ingredient);
    }

    @Override
    public List<ingredients> getAllIngredients() {
        return ingredientsRepository.findAll();
    }

    @Override
    public ingredients getIngredientById(Long id) {

        return ingredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
    }

    @Override
    public ingredients updateIngredient(Long id, ingredients ingredient) {

        ingredients existingIngredient = ingredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        existingIngredient.setIngredientName(ingredient.getIngredientName());
        existingIngredient.setCategory(ingredient.getCategory());
        existingIngredient.setUnit(ingredient.getUnit());
        existingIngredient.setMinimumStock(ingredient.getMinimumStock());
        existingIngredient.setDescription(ingredient.getDescription());

        return ingredientsRepository.save(existingIngredient);
    }

    @Override
    public void deleteIngredient(Long id) {

        ingredients ingredient = ingredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        ingredientsRepository.delete(ingredient);
    }
}