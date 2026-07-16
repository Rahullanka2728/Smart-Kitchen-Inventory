package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.ai_recipe_history;

@Repository
public interface AIRecipeHistoryRepository extends JpaRepository<ai_recipe_history, Long> {

    List<ai_recipe_history> findByUserId(Long userId);

}