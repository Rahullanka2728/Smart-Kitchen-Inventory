package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.purchase_order_items;
import com.example.demo.repository.PurchaseOrderItemsRepository;
import com.example.demo.service.PurchaseOrderItemsService;

@Service
public class PurchaseOrderItemsServiceImpl implements PurchaseOrderItemsService {

    @Autowired
    private PurchaseOrderItemsRepository purchaseOrderItemsRepository;

    @Override
    public purchase_order_items addPurchaseOrderItem(purchase_order_items purchaseOrderItem) {

        return purchaseOrderItemsRepository.save(purchaseOrderItem);
    }

    @Override
    public List<purchase_order_items> getAllPurchaseOrderItems() {

        return purchaseOrderItemsRepository.findAll();
    }

    @Override
    public purchase_order_items getPurchaseOrderItemById(Long id) {

        return purchaseOrderItemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order Item not found"));
    }

    @Override
    public purchase_order_items updatePurchaseOrderItem(Long id,
            purchase_order_items purchaseOrderItem) {

        purchase_order_items existingItem = purchaseOrderItemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order Item not found"));

        existingItem.setPurchaseOrder(purchaseOrderItem.getPurchaseOrder());
        existingItem.setIngredient(purchaseOrderItem.getIngredient());
        existingItem.setQuantity(purchaseOrderItem.getQuantity());
        existingItem.setUnit(purchaseOrderItem.getUnit());
        existingItem.setUnitPrice(purchaseOrderItem.getUnitPrice());
        existingItem.setTotalPrice(purchaseOrderItem.getTotalPrice());
        existingItem.setReceivedQuantity(purchaseOrderItem.getReceivedQuantity());
        existingItem.setRemarks(purchaseOrderItem.getRemarks());

        return purchaseOrderItemsRepository.save(existingItem);
    }

    @Override
    public void deletePurchaseOrderItem(Long id) {

        purchase_order_items existingItem = purchaseOrderItemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order Item not found"));

        purchaseOrderItemsRepository.delete(existingItem);
    }

}