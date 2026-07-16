package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.inventory_transactions;
import com.example.demo.service.InventoryTransactionsService;

@RestController
@RequestMapping("/api/inventory-transactions")
@CrossOrigin(origins = "*")
public class InventoryTransactionsController {

    @Autowired
    private InventoryTransactionsService inventoryTransactionsService;

    @PostMapping
    public inventory_transactions addTransaction(
            @RequestBody inventory_transactions transaction) {

        return inventoryTransactionsService.addTransaction(transaction);
    }

    @GetMapping
    public List<inventory_transactions> getAllTransactions() {

        return inventoryTransactionsService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public inventory_transactions getTransactionById(@PathVariable Long id) {

        return inventoryTransactionsService.getTransactionById(id);
    }

    @PutMapping("/{id}")
    public inventory_transactions updateTransaction(
            @PathVariable Long id,
            @RequestBody inventory_transactions transaction) {

        return inventoryTransactionsService.updateTransaction(id, transaction);
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {

        inventoryTransactionsService.deleteTransaction(id);

        return "Inventory Transaction Deleted Successfully";
    }

}