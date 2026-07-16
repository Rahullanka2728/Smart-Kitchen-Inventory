package com.example.demo.service;

import java.util.List;

import com.example.demo.models.ai_recipe_history;

public interface AIRecipeHistoryService {

    ai_recipe_history saveHistory(ai_recipe_history history);

    List<ai_recipe_history> getAllHistory();

    ai_recipe_history getHistoryById(Long id);

    ai_recipe_history updateHistory(Long id, ai_recipe_history history);

    void deleteHistory(Long id);

}