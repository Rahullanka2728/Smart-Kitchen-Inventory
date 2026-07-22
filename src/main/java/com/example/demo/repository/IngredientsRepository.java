package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Ingredients;

@Repository
public interface IngredientsRepository extends JpaRepository<Ingredients, Long> {

    Optional<Ingredients> findByIngredientName(String ingredientName);

    boolean existsByIngredientName(String ingredientName);

}