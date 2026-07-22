package com.example.demo.service;

import java.util.List;

import com.example.demo.models.PurchaseOrderItems;

public interface PurchaseOrderItemsService {

    PurchaseOrderItems addPurchaseOrderItem(PurchaseOrderItems purchaseOrderItem);

    List<PurchaseOrderItems> getAllPurchaseOrderItems();

    PurchaseOrderItems getPurchaseOrderItemById(Long id);

    PurchaseOrderItems updatePurchaseOrderItem(Long id, PurchaseOrderItems purchaseOrderItem);

    void deletePurchaseOrderItem(Long id);

}