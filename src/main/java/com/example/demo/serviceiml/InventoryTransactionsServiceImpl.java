package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.inventory_transactions;
import com.example.demo.repository.InventoryTransactionsRepository;
import com.example.demo.service.InventoryTransactionsService;

@Service
public class InventoryTransactionsServiceImpl implements InventoryTransactionsService {

    @Autowired
    private InventoryTransactionsRepository inventoryTransactionsRepository;

    @Override
    public inventory_transactions addTransaction(inventory_transactions transaction) {

        return inventoryTransactionsRepository.save(transaction);
    }

    @Override
    public List<inventory_transactions> getAllTransactions() {

        return inventoryTransactionsRepository.findAll();
    }

    @Override
    public inventory_transactions getTransactionById(Long id) {

        return inventoryTransactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public inventory_transactions updateTransaction(Long id,
            inventory_transactions transaction) {

        inventory_transactions existing = inventoryTransactionsRepository.findById(id)
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

        inventory_transactions existing = inventoryTransactionsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        inventoryTransactionsRepository.delete(existing);
    }

}