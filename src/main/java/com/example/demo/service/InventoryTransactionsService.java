package com.example.demo.service;

import java.util.List;

import com.example.demo.models.inventory_transactions;

public interface InventoryTransactionsService {

    inventory_transactions addTransaction(inventory_transactions transaction);

    List<inventory_transactions> getAllTransactions();

    inventory_transactions getTransactionById(Long id);

    inventory_transactions updateTransaction(Long id, inventory_transactions transaction);

    void deleteTransaction(Long id);

}