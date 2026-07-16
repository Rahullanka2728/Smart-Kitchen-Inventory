package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.purchase_orders;

@Repository
public interface PurchaseOrdersRepository extends JpaRepository<purchase_orders, Long> {

    List<purchase_orders> findByOrderStatus(String orderStatus);

    List<purchase_orders> findByPaymentStatus(String paymentStatus);

}