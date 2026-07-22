package com.example.demo.service;

import java.util.List;

import com.example.demo.models.PurchaseOrders;

public interface PurchaseOrdersService {

    PurchaseOrders addPurchaseOrder(PurchaseOrders purchaseOrder);

    List<PurchaseOrders> getAllPurchaseOrders();

    PurchaseOrders getPurchaseOrderById(Long id);

    PurchaseOrders updatePurchaseOrder(Long id, PurchaseOrders purchaseOrder);

    void deletePurchaseOrder(Long id);

}