package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.purchase_orders;
import com.example.demo.repository.PurchaseOrdersRepository;
import com.example.demo.service.PurchaseOrdersService;

@Service
public class PurchaseOrdersServiceImpl implements PurchaseOrdersService {

    @Autowired
    private PurchaseOrdersRepository purchaseOrdersRepository;

    @Override
    public purchase_orders addPurchaseOrder(purchase_orders purchaseOrder) {

        return purchaseOrdersRepository.save(purchaseOrder);
    }

    @Override
    public List<purchase_orders> getAllPurchaseOrders() {

        return purchaseOrdersRepository.findAll();
    }

    @Override
    public purchase_orders getPurchaseOrderById(Long id) {

        return purchaseOrdersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
    }

    @Override
    public purchase_orders updatePurchaseOrder(Long id, purchase_orders purchaseOrder) {

        purchase_orders existingOrder = purchaseOrdersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));

        existingOrder.setSupplier(purchaseOrder.getSupplier());
        existingOrder.setOrderNumber(purchaseOrder.getOrderNumber());
        existingOrder.setOrderDate(purchaseOrder.getOrderDate());
        existingOrder.setExpectedDelivery(purchaseOrder.getExpectedDelivery());
        existingOrder.setTotalAmount(purchaseOrder.getTotalAmount());
        existingOrder.setPaymentStatus(purchaseOrder.getPaymentStatus());
        existingOrder.setOrderStatus(purchaseOrder.getOrderStatus());
        existingOrder.setRemarks(purchaseOrder.getRemarks());
        existingOrder.setCreatedAt(purchaseOrder.getCreatedAt());
        existingOrder.setUpdatedAt(purchaseOrder.getUpdatedAt());

        return purchaseOrdersRepository.save(existingOrder);
    }

    @Override
    public void deletePurchaseOrder(Long id) {

        purchase_orders existingOrder = purchaseOrdersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));

        purchaseOrdersRepository.delete(existingOrder);
    }

}