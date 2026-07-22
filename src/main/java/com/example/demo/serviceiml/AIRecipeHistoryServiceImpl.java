package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.AiRecipeHistory;
import com.example.demo.repository.AIRecipeHistoryRepository;
import com.example.demo.service.AIRecipeHistoryService;

@Service
public class AIRecipeHistoryServiceImpl implements AIRecipeHistoryService {

    private final AIRecipeHistoryRepository repository;

    public AIRecipeHistoryServiceImpl(AIRecipeHistoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public AiRecipeHistory saveHistory(AiRecipeHistory history) {
        return repository.save(history);
    }

    @Override
    public List<AiRecipeHistory> getAllHistory() {
        return repository.findAll();
    }

    @Override
    public AiRecipeHistory getHistoryById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("History not found"));
    }

    @Override
    public AiRecipeHistory updateHistory(Long id, AiRecipeHistory history) {

        AiRecipeHistory existing = getHistoryById(id);

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