package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.PurchaseOrders;
import com.example.demo.repository.PurchaseOrdersRepository;
import com.example.demo.service.PurchaseOrdersService;

@Service
public class PurchaseOrdersServiceImpl implements PurchaseOrdersService {

    private final PurchaseOrdersRepository purchaseOrdersRepository;

    public PurchaseOrdersServiceImpl(PurchaseOrdersRepository purchaseOrdersRepository) {
        this.purchaseOrdersRepository = purchaseOrdersRepository;
    }

    @Override
    public PurchaseOrders addPurchaseOrder(PurchaseOrders purchaseOrder) {

        return purchaseOrdersRepository.save(purchaseOrder);
    }

    @Override
    public List<PurchaseOrders> getAllPurchaseOrders() {

        return purchaseOrdersRepository.findAll();
    }

    @Override
    public PurchaseOrders getPurchaseOrderById(Long id) {

        return purchaseOrdersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
    }

    @Override
    public PurchaseOrders updatePurchaseOrder(Long id, PurchaseOrders purchaseOrder) {

        PurchaseOrders existingOrder = purchaseOrdersRepository.findById(id)
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

        PurchaseOrders existingOrder = purchaseOrdersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));

        purchaseOrdersRepository.delete(existingOrder);
    }

}