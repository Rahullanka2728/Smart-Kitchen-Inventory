package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.purchase_orders;
import com.example.demo.service.PurchaseOrdersService;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin(origins = "*")
public class PurchaseOrdersController {

    @Autowired
    private PurchaseOrdersService purchaseOrdersService;

    @PostMapping
    public purchase_orders addPurchaseOrder(@RequestBody purchase_orders purchaseOrder) {

        return purchaseOrdersService.addPurchaseOrder(purchaseOrder);
    }

    @GetMapping
    public List<purchase_orders> getAllPurchaseOrders() {

        return purchaseOrdersService.getAllPurchaseOrders();
    }

    @GetMapping("/{id}")
    public purchase_orders getPurchaseOrderById(@PathVariable Long id) {

        return purchaseOrdersService.getPurchaseOrderById(id);
    }

    @PutMapping("/{id}")
    public purchase_orders updatePurchaseOrder(@PathVariable Long id,
                                              @RequestBody purchase_orders purchaseOrder) {

        return purchaseOrdersService.updatePurchaseOrder(id, purchaseOrder);
    }

    @DeleteMapping("/{id}")
    public String deletePurchaseOrder(@PathVariable Long id) {

        purchaseOrdersService.deletePurchaseOrder(id);

        return "Purchase Order Deleted Successfully";
    }

}