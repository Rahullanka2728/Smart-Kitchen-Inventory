package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.purchase_order_items;

@Repository
public interface PurchaseOrderItemsRepository extends JpaRepository<purchase_order_items, Long> {

    List<purchase_order_items> findByPurchaseOrderId(Long purchaseOrderId);

}