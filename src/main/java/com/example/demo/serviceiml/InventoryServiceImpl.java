package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Inventory;
import com.example.demo.repository.InventoryRepository;
import com.example.demo.service.InventoryService;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryServiceImpl(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @Override
    public Inventory addInventory(Inventory inventory) {

        return inventoryRepository.save(inventory);
    }

    @Override
    public List<Inventory> getAllInventory() {

        return inventoryRepository.findAll();
    }

    @Override
    public Inventory getInventoryById(Long id) {

        return inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    @Override
    public Inventory updateInventory(Long id, Inventory inventory) {

        Inventory existingInventory = inventoryRepository.findById(id)
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

        Inventory existingInventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        inventoryRepository.delete(existingInventory);
    }
}