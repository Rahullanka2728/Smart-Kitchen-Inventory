package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.recipe_ingredients;

@Repository
public interface RecipeIngredientsRepository extends JpaRepository<recipe_ingredients, Long> {

    List<recipe_ingredients> findByRecipeId(Long recipeId);

}