package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.PurchaseOrderItems;
import com.example.demo.service.PurchaseOrderItemsService;

@RestController
@RequestMapping("/api/purchase-order-items")
@CrossOrigin(origins = "*")
public class PurchaseOrderItemsController {

    private final PurchaseOrderItemsService purchaseOrderItemsService;

    public PurchaseOrderItemsController(PurchaseOrderItemsService purchaseOrderItemsService) {
        this.purchaseOrderItemsService = purchaseOrderItemsService;
    }

    @PostMapping
    public PurchaseOrderItems addPurchaseOrderItem(
            @RequestBody PurchaseOrderItems purchaseOrderItem) {

        return purchaseOrderItemsService.addPurchaseOrderItem(purchaseOrderItem);
    }

    @GetMapping
    public List<PurchaseOrderItems> getAllPurchaseOrderItems() {

        return purchaseOrderItemsService.getAllPurchaseOrderItems();
    }

    @GetMapping("/{id}")
    public PurchaseOrderItems getPurchaseOrderItemById(@PathVariable Long id) {

        return purchaseOrderItemsService.getPurchaseOrderItemById(id);
    }

    @PutMapping("/{id}")
    public PurchaseOrderItems updatePurchaseOrderItem(
            @PathVariable Long id,
            @RequestBody PurchaseOrderItems purchaseOrderItem) {

        return purchaseOrderItemsService.updatePurchaseOrderItem(id, purchaseOrderItem);
    }

    @DeleteMapping("/{id}")
    public String deletePurchaseOrderItem(@PathVariable Long id) {

        purchaseOrderItemsService.deletePurchaseOrderItem(id);

        return "Purchase Order Item Deleted Successfully";
    }

}