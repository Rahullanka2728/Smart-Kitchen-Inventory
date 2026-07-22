package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Ingredients;
import com.example.demo.repository.IngredientsRepository;
import com.example.demo.service.IngredientsService;

@Service
public class IngredientsServiceImpl implements IngredientsService {

    private final IngredientsRepository ingredientsRepository;

    public IngredientsServiceImpl(IngredientsRepository ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }

    @Override
    public Ingredients addIngredient(Ingredients ingredient) {

        if (ingredientsRepository.existsByIngredientName(ingredient.getIngredientName())) {
            throw new RuntimeException("Ingredient already exists");
        }

        return ingredientsRepository.save(ingredient);
    }

    @Override
    public List<Ingredients> getAllIngredients() {
        return ingredientsRepository.findAll();
    }

    @Override
    public Ingredients getIngredientById(Long id) {

        return ingredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));
    }

    @Override
    public Ingredients updateIngredient(Long id, Ingredients ingredient) {

        Ingredients existingIngredient = ingredientsRepository.findById(id)
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

        Ingredients ingredient = ingredientsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ingredient not found"));

        ingredientsRepository.delete(ingredient);
    }
}