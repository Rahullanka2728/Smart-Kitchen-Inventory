package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.InventoryTransactions;
import com.example.demo.repository.InventoryTransactionsRepository;
import com.example.demo.service.InventoryTransactionsService;

@Service
public class InventoryTransactionsServiceImpl implements InventoryTransactionsService {

    private final InventoryTransactionsRepository inventoryTransactionsRepository;

    public InventoryTransactionsServiceImpl(InventoryTransactionsRepository inventoryTransactionsRepository) {
        this.inventoryTransactionsRepository = inventoryTransactionsRepository;
    }

    @Override
    public InventoryTransactions addTransaction(InventoryTransactions transaction) {

        return inventoryTransactionsRepository.save(transaction);
    }

    @Override
    public List<InventoryTransactions> getAllTransactions() {

        return inventoryTransactionsRepository.findAll();
    }

    @Override
    public InventoryTransactions getTransactionById(Long id) {

        return inventoryTransactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public InventoryTransactions updateTransaction(Long id,
            InventoryTransactions transaction) {

        InventoryTransactions existing = inventoryTransactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        existing.setInventory(transaction.getInventory());
        existing.setIngredient(transaction.getIngredient());
        existing.setTransactionType(transaction.getTransactionType());
        existing.setQuantity(transaction.getQuantity());
        existing.setUnit(transaction.getUnit());
        existing.setTransactionDate(transaction.getTransactionDate());
        existing.setReferenceNumber(transaction.getReferenceNumber());
        existing.setRemarks(transaction.getRemarks());
        existing.setCreatedBy(transaction.getCreatedBy());

        return inventoryTransactionsRepository.save(existing);
    }

    @Override
    public void deleteTransaction(Long id) {

        InventoryTransactions existing = inventoryTransactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        inventoryTransactionsRepository.delete(existing);
    }

}