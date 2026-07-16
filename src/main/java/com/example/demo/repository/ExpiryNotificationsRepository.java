package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.expiry_notifications;

@Repository
public interface ExpiryNotificationsRepository extends JpaRepository<expiry_notifications, Long>{

}