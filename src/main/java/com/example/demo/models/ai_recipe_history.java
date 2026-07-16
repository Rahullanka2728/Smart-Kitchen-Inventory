package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "ai_recipe_history")
public class ai_recipe_history {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private users user;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String prompt;

    @Column(name = "available_ingredients", columnDefinition = "TEXT")
    private String availableIngredients;

    @Column(name = "generated_recipe", columnDefinition = "TEXT")
    private String generatedRecipe;

    @Column(name = "cooking_time")
    private Integer cookingTime;

    private Integer servings;

    @Column(name = "ai_model")
    private String aiModel;

    @Column(name = "generated_at")
    private LocalDateTime generatedAt;

    public ai_recipe_history() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public users getUser() {
        return user;
    }

    public void setUser(users user) {
        this.user = user;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getAvailableIngredients() {
        return availableIngredients;
    }

    public void setAvailableIngredients(String availableIngredients) {
        this.availableIngredients = availableIngredients;
    }

    public String getGeneratedRecipe() {
        return generatedRecipe;
    }

    public void setGeneratedRecipe(String generatedRecipe) {
        this.generatedRecipe = generatedRecipe;
    }

    public Integer getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Integer cookingTime) {
        this.cookingTime = cookingTime;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public String getAiModel() {
        return aiModel;
    }

    public void setAiModel(String aiModel) {
        this.aiModel = aiModel;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}