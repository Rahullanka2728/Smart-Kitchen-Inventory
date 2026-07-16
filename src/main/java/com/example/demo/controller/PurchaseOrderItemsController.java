package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.purchase_order_items;
import com.example.demo.service.PurchaseOrderItemsService;

@RestController
@RequestMapping("/api/purchase-order-items")
@CrossOrigin(origins = "*")
public class PurchaseOrderItemsController {

    @Autowired
    private PurchaseOrderItemsService purchaseOrderItemsService;

    @PostMapping
    public purchase_order_items addPurchaseOrderItem(
            @RequestBody purchase_order_items purchaseOrderItem) {

        return purchaseOrderItemsService.addPurchaseOrderItem(purchaseOrderItem);
    }

    @GetMapping
    public List<purchase_order_items> getAllPurchaseOrderItems() {

        return purchaseOrderItemsService.getAllPurchaseOrderItems();
    }

    @GetMapping("/{id}")
    public purchase_order_items getPurchaseOrderItemById(@PathVariable Long id) {

        return purchaseOrderItemsService.getPurchaseOrderItemById(id);
    }

    @PutMapping("/{id}")
    public purchase_order_items updatePurchaseOrderItem(
            @PathVariable Long id,
            @RequestBody purchase_order_items purchaseOrderItem) {

        return purchaseOrderItemsService.updatePurchaseOrderItem(id, purchaseOrderItem);
    }

    @DeleteMapping("/{id}")
    public String deletePurchaseOrderItem(@PathVariable Long id) {

        purchaseOrderItemsService.deletePurchaseOrderItem(id);

        return "Purchase Order Item Deleted Successfully";
    }

}