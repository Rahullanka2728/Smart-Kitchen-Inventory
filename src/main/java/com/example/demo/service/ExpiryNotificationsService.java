package com.example.demo.service;

import java.util.List;

import com.example.demo.models.ExpiryNotifications;

public interface ExpiryNotificationsService {

    ExpiryNotifications save(ExpiryNotifications notification);

    List<ExpiryNotifications> getAll();

    ExpiryNotifications getById(Long id);

    ExpiryNotifications update(Long id, ExpiryNotifications notification);

    void delete(Long id);

}