package com.example.demo.models;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "purchase_order_items")
public class purchase_order_items {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_order_id", nullable = false)
    private purchase_orders purchaseOrder;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private ingredients ingredient;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(nullable = false)
    private String unit;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "received_quantity")
    private BigDecimal receivedQuantity;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    public purchase_order_items() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public purchase_orders getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(purchase_orders purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public ingredients getIngredient() {
        return ingredient;
    }

    public void setIngredient(ingredients ingredient) {
        this.ingredient = ingredient;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getReceivedQuantity() {
        return receivedQuantity;
    }

    public void setReceivedQuantity(BigDecimal receivedQuantity) {
        this.receivedQuantity = receivedQuantity;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}