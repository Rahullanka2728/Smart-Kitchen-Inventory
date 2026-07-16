package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.inventory;
import com.example.demo.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @PostMapping
    public inventory addInventory(@RequestBody inventory inventory) {
        return inventoryService.addInventory(inventory);
    }

    @GetMapping
    public List<inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }

    @GetMapping("/{id}")
    public inventory getInventoryById(@PathVariable Long id) {
        return inventoryService.getInventoryById(id);
    }

    @PutMapping("/{id}")
    public inventory updateInventory(@PathVariable Long id,
                                     @RequestBody inventory inventory) {
        return inventoryService.updateInventory(id, inventory);
    }

    @DeleteMapping("/{id}")
    public String deleteInventory(@PathVariable Long id) {

        inventoryService.deleteInventory(id);

        return "Inventory Deleted Successfully";
    }
}