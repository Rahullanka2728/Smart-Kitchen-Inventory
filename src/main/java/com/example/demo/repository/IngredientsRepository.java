package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.ingredients;

@Repository
public interface IngredientsRepository extends JpaRepository<ingredients, Long> {

    Optional<ingredients> findByIngredientName(String ingredientName);

    boolean existsByIngredientName(String ingredientName);

}