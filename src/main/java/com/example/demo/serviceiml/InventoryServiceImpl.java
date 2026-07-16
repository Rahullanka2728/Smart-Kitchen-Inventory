package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.inventory;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public inventory addInventory(inventory inventory) {

        return inventoryRepository.save(inventory);
    }

    @Override
    public List<inventory> getAllInventory() {

        return inventoryRepository.findAll();
    }

    @Override
    public inventory getInventoryById(Long id) {

        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    @Override
    public inventory updateInventory(Long id, inventory inventory) {

        inventory existingInventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        existingInventory.setIngredient(inventory.getIngredient());
        existingInventory.setAvailableQuantity(inventory.getAvailableQuantity());
        existingInventory.setReservedQuantity(inventory.getReservedQuantity());
        existingInventory.setUnit(inventory.getUnit());
        existingInventory.setPurchasePrice(inventory.getPurchasePrice());
        existingInventory.setPurchaseDate(inventory.getPurchaseDate());
        existingInventory.setExpiryDate(inventory.getExpiryDate());
        existingInventory.setSupplierName(inventory.getSupplierName());
        existingInventory.setStorageLocation(inventory.getStorageLocation());
        existingInventory.setStatus(inventory.getStatus());

        return inventoryRepository.save(existingInventory);
    }

    @Override
    public void deleteInventory(Long id) {

        inventory existingInventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventoryRepository.delete(existingInventory);
    }
}