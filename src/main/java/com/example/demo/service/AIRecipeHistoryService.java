package com.example.demo.service;

import java.util.List;

import com.example.demo.models.AiRecipeHistory;

public interface AIRecipeHistoryService {

    AiRecipeHistory saveHistory(AiRecipeHistory history);

    List<AiRecipeHistory> getAllHistory();

    AiRecipeHistory getHistoryById(Long id);

    AiRecipeHistory updateHistory(Long id, AiRecipeHistory history);

    void deleteHistory(Long id);

}