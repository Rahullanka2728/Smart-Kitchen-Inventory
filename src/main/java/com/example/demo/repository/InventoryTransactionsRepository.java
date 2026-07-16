package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.inventory_transactions;

@Repository
public interface InventoryTransactionsRepository extends JpaRepository<inventory_transactions, Long> {

    List<inventory_transactions> findByIngredientId(Long ingredientId);

    List<inventory_transactions> findByInventoryId(Long inventoryId);

}