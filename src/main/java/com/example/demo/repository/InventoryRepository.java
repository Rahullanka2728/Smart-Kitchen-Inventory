package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.inventory;

@Repository
public interface InventoryRepository extends JpaRepository<inventory, Long>{

    List<inventory> findByStatus(String status);

}