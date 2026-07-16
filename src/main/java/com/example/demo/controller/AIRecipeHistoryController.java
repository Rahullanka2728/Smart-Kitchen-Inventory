package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.ai_recipe_history;
import com.example.demo.service.AIRecipeHistoryService;

@RestController
@RequestMapping("/api/ai-history")
@CrossOrigin(origins = "*")
public class AIRecipeHistoryController {

    @Autowired
    private AIRecipeHistoryService service;

    @PostMapping
    public ai_recipe_history save(@RequestBody ai_recipe_history history) {
        return service.saveHistory(history);
    }

    @GetMapping
    public List<ai_recipe_history> getAll() {
        return service.getAllHistory();
    }

    @GetMapping("/{id}")
    public ai_recipe_history getById(@PathVariable Long id) {
        return service.getHistoryById(id);
    }

    @PutMapping("/{id}")
    public ai_recipe_history update(@PathVariable Long id,
                                    @RequestBody ai_recipe_history history) {
        return service.updateHistory(id, history);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.deleteHistory(id);

        return "History Deleted Successfully";
    }

}