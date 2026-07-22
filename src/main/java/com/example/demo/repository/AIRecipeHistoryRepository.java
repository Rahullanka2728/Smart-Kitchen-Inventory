package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.AiRecipeHistory;

@Repository
public interface AIRecipeHistoryRepository extends JpaRepository<AiRecipeHistory, Long> {

    List<AiRecipeHistory> findByUserId(Long userId);

}