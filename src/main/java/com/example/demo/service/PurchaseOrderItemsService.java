package com.example.demo.service;

import java.util.List;

import com.example.demo.models.purchase_order_items;

public interface PurchaseOrderItemsService {

    purchase_order_items addPurchaseOrderItem(purchase_order_items purchaseOrderItem);

    List<purchase_order_items> getAllPurchaseOrderItems();

    purchase_order_items getPurchaseOrderItemById(Long id);

    purchase_order_items updatePurchaseOrderItem(Long id, purchase_order_items purchaseOrderItem);

    void deletePurchaseOrderItem(Long id);

}