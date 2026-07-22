package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.PurchaseOrderItems;
import com.example.demo.repository.PurchaseOrderItemsRepository;
import com.example.demo.service.PurchaseOrderItemsService;

@Service
public class PurchaseOrderItemsServiceImpl implements PurchaseOrderItemsService {

    private final PurchaseOrderItemsRepository purchaseOrderItemsRepository;

    public PurchaseOrderItemsServiceImpl(PurchaseOrderItemsRepository purchaseOrderItemsRepository) {
        this.purchaseOrderItemsRepository = purchaseOrderItemsRepository;
    }

    @Override
    public PurchaseOrderItems addPurchaseOrderItem(PurchaseOrderItems purchaseOrderItem) {

        return purchaseOrderItemsRepository.save(purchaseOrderItem);
    }

    @Override
    public List<PurchaseOrderItems> getAllPurchaseOrderItems() {

        return purchaseOrderItemsRepository.findAll();
    }

    @Override
    public PurchaseOrderItems getPurchaseOrderItemById(Long id) {

        return purchaseOrderItemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order Item not found"));
    }

    @Override
    public PurchaseOrderItems updatePurchaseOrderItem(Long id,
            PurchaseOrderItems purchaseOrderItem) {

        PurchaseOrderItems existingItem = purchaseOrderItemsRepository.findById(id)
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

        PurchaseOrderItems existingItem = purchaseOrderItemsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order Item not found"));

        purchaseOrderItemsRepository.delete(existingItem);
    }

}