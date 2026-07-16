package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.ai_recipe_history;
import com.example.demo.repository.AIRecipeHistoryRepository;
import com.example.demo.service.AIRecipeHistoryService;

@Service
public class AIRecipeHistoryServiceImpl implements AIRecipeHistoryService {

    @Autowired
    private AIRecipeHistoryRepository repository;

    @Override
    public ai_recipe_history saveHistory(ai_recipe_history history) {
        return repository.save(history);
    }

    @Override
    public List<ai_recipe_history> getAllHistory() {
        return repository.findAll();
    }

    @Override
    public ai_recipe_history getHistoryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("History not found"));
    }

    @Override
    public ai_recipe_history updateHistory(Long id, ai_recipe_history history) {

        ai_recipe_history existing = getHistoryById(id);

        existing.setUser(history.getUser());
        existing.setPrompt(history.getPrompt());
        existing.setAvailableIngredients(history.getAvailableIngredients());
        existing.setGeneratedRecipe(history.getGeneratedRecipe());
        existing.setCookingTime(history.getCookingTime());
        existing.setServings(history.getServings());
        existing.setAiModel(history.getAiModel());
        existing.setGeneratedAt(history.getGeneratedAt());

        return repository.save(existing);
    }

    @Override
    public void deleteHistory(Long id) {

        repository.delete(getHistoryById(id));
    }

}