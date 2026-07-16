package com.example.demo.service;

import java.util.List;

import com.example.demo.models.inventory;

public interface InventoryService {

    inventory addInventory(inventory inventory);

    List<inventory> getAllInventory();

    inventory getInventoryById(Long id);

    inventory updateInventory(Long id, inventory inventory);

    void deleteInventory(Long id);

}