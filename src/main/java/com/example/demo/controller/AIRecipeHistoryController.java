package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.AiRecipeHistory;
import com.example.demo.service.AIRecipeHistoryService;

@RestController
@RequestMapping("/api/ai-history")
@CrossOrigin(origins = "*")
public class AIRecipeHistoryController {

    private final AIRecipeHistoryService service;

    public AIRecipeHistoryController(AIRecipeHistoryService service) {
        this.service = service;
    }

    @PostMapping
    public AiRecipeHistory save(@RequestBody AiRecipeHistory history) {
        return service.saveHistory(history);
    }

    @GetMapping
    public List<AiRecipeHistory> getAll() {
        return service.getAllHistory();
    }

    @GetMapping("/{id}")
    public AiRecipeHistory getById(@PathVariable Long id) {
        return service.getHistoryById(id);
    }

    @PutMapping("/{id}")
    public AiRecipeHistory update(@PathVariable Long id,
                                    @RequestBody AiRecipeHistory history) {
        return service.updateHistory(id, history);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.deleteHistory(id);

        return "History Deleted Successfully";
    }

}