package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.PurchaseOrders;
import com.example.demo.service.PurchaseOrdersService;

@RestController
@RequestMapping("/api/purchase-orders")
@CrossOrigin(origins = "*")
public class PurchaseOrdersController {

    private final PurchaseOrdersService purchaseOrdersService;

    public PurchaseOrdersController(PurchaseOrdersService purchaseOrdersService) {
        this.purchaseOrdersService = purchaseOrdersService;
    }

    @PostMapping
    public PurchaseOrders addPurchaseOrder(@RequestBody PurchaseOrders purchaseOrder) {

        return purchaseOrdersService.addPurchaseOrder(purchaseOrder);
    }

    @GetMapping
    public List<PurchaseOrders> getAllPurchaseOrders() {

        return purchaseOrdersService.getAllPurchaseOrders();
    }

    @GetMapping("/{id}")
    public PurchaseOrders getPurchaseOrderById(@PathVariable Long id) {

        return purchaseOrdersService.getPurchaseOrderById(id);
    }

    @PutMapping("/{id}")
    public PurchaseOrders updatePurchaseOrder(@PathVariable Long id,
                                              @RequestBody PurchaseOrders purchaseOrder) {

        return purchaseOrdersService.updatePurchaseOrder(id, purchaseOrder);
    }

    @DeleteMapping("/{id}")
    public String deletePurchaseOrder(@PathVariable Long id) {

        purchaseOrdersService.deletePurchaseOrder(id);

        return "Purchase Order Deleted Successfully";
    }

}