package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.PurchaseOrders;

@Repository
public interface PurchaseOrdersRepository extends JpaRepository<PurchaseOrders, Long> {

    List<PurchaseOrders> findByOrderStatus(String orderStatus);

    List<PurchaseOrders> findByPaymentStatus(String paymentStatus);

}