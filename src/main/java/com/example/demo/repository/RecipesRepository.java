package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Recipes;

@Repository
public interface RecipesRepository extends JpaRepository<Recipes, Long> {

    List<Recipes> findByCategory(String category);

}