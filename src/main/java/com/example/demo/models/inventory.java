package com.example.demo.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private ingredients ingredient;

    @Column(name = "available_quantity", nullable = false)
    private BigDecimal availableQuantity;

    @Column(name = "reserved_quantity")
    private BigDecimal reservedQuantity;

    @Column(nullable = false)
    private String unit;

    @Column(name = "purchase_price")
    private BigDecimal purchasePrice;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "storage_location")
    private String storageLocation;

    @Column(nullable = false)
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public inventory() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ingredients getIngredient() {
		return ingredient;
	}

	public void setIngredient(ingredients ingredient) {
		this.ingredient = ingredient;
	}

	public BigDecimal getAvailableQuantity() {
		return availableQuantity;
	}

	public void setAvailableQuantity(BigDecimal availableQuantity) {
		this.availableQuantity = availableQuantity;
	}

	public BigDecimal getReservedQuantity() {
		return reservedQuantity;
	}

	public void setReservedQuantity(BigDecimal reservedQuantity) {
		this.reservedQuantity = reservedQuantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public BigDecimal getPurchasePrice() {
		return purchasePrice;
	}

	public void setPurchasePrice(BigDecimal purchasePrice) {
		this.purchasePrice = purchasePrice;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public LocalDate getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(LocalDate expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public inventory(Long id, ingredients ingredient, BigDecimal availableQuantity, BigDecimal reservedQuantity,
			String unit, BigDecimal purchasePrice, LocalDate purchaseDate, LocalDate expiryDate, String supplierName,
			String storageLocation, String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.ingredient = ingredient;
		this.availableQuantity = availableQuantity;
		this.reservedQuantity = reservedQuantity;
		this.unit = unit;
		this.purchasePrice = purchasePrice;
		this.purchaseDate = purchaseDate;
		this.expiryDate = expiryDate;
		this.supplierName = supplierName;
		this.storageLocation = storageLocation;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}


}