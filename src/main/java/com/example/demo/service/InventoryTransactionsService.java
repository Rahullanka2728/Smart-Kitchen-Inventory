package com.example.demo.service;

import java.util.List;

import com.example.demo.models.InventoryTransactions;

public interface InventoryTransactionsService {

    InventoryTransactions addTransaction(InventoryTransactions transaction);

    List<InventoryTransactions> getAllTransactions();

    InventoryTransactions getTransactionById(Long id);

    InventoryTransactions updateTransaction(Long id, InventoryTransactions transaction);

    void deleteTransaction(Long id);

}