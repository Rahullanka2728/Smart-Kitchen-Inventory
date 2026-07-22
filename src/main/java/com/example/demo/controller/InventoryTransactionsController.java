package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.InventoryTransactions;
import com.example.demo.service.InventoryTransactionsService;

@RestController
@RequestMapping("/api/inventory-transactions")
@CrossOrigin(origins = "*")
public class InventoryTransactionsController {

    private final InventoryTransactionsService inventoryTransactionsService;

    public InventoryTransactionsController(InventoryTransactionsService inventoryTransactionsService) {
        this.inventoryTransactionsService = inventoryTransactionsService;
    }

    @PostMapping
    public InventoryTransactions addTransaction(
            @RequestBody InventoryTransactions transaction) {

        return inventoryTransactionsService.addTransaction(transaction);
    }

    @GetMapping
    public List<InventoryTransactions> getAllTransactions() {

        return inventoryTransactionsService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public InventoryTransactions getTransactionById(@PathVariable Long id) {

        return inventoryTransactionsService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public InventoryTransactions updateTransaction(
            @PathVariable Long id,
            @RequestBody InventoryTransactions transaction) {

        return inventoryTransactionsService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        inventoryTransactionsService.deleteTransaction(id);

        return "Inventory Transaction Deleted Successfully";
    }

}