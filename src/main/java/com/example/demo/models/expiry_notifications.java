package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "expiry_notifications")
public class expiry_notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "inventory_id", nullable = false)
    private inventory inventory;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private ingredients ingredient;

    @Column(name = "notification_type", nullable = false)
    private String notificationType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "notification_date")
    private LocalDateTime notificationDate;

    @Column(name = "is_read")
    private Boolean isRead;

    @Column(nullable = false)
    private String status;

    public expiry_notifications() {
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public inventory getInventory() {
        return inventory;
    }

    public void setInventory(inventory inventory) {
        this.inventory = inventory;
    }

    public ingredients getIngredient() {
        return ingredient;
    }

    public void setIngredient(ingredients ingredient) {
        this.ingredient = ingredient;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getNotificationDate() {
        return notificationDate;
    }

    public void setNotificationDate(LocalDateTime notificationDate) {
        this.notificationDate = notificationDate;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}