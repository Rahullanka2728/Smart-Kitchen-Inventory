package com.example.demo.service;

import java.util.List;

import com.example.demo.models.expiry_notifications;

public interface ExpiryNotificationsService {

    expiry_notifications save(expiry_notifications notification);

    List<expiry_notifications> getAll();

    expiry_notifications getById(Long id);

    expiry_notifications update(Long id, expiry_notifications notification);

    void delete(Long id);

}