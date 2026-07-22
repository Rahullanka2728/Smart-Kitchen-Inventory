package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.InventoryTransactions;

@Repository
public interface InventoryTransactionsRepository extends JpaRepository<InventoryTransactions, Long> {

    List<InventoryTransactions> findByIngredientId(Long ingredientId);

    List<InventoryTransactions> findByInventoryId(Long inventoryId);

}