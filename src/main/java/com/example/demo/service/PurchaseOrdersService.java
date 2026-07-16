package com.example.demo.service;

import java.util.List;

import com.example.demo.models.purchase_orders;

public interface PurchaseOrdersService {

    purchase_orders addPurchaseOrder(purchase_orders purchaseOrder);

    List<purchase_orders> getAllPurchaseOrders();

    purchase_orders getPurchaseOrderById(Long id);

    purchase_orders updatePurchaseOrder(Long id, purchase_orders purchaseOrder);

    void deletePurchaseOrder(Long id);

}