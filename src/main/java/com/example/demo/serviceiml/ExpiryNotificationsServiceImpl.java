package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.expiry_notifications;
import com.example.demo.repository.ExpiryNotificationsRepository;
import com.example.demo.service.ExpiryNotificationsService;

@Service
public class ExpiryNotificationsServiceImpl implements ExpiryNotificationsService {

    @Autowired
    private ExpiryNotificationsRepository repository;

    @Override
    public expiry_notifications save(expiry_notifications notification) {

        return repository.save(notification);
    }

    @Override
    public List<expiry_notifications> getAll() {

        return repository.findAll();
    }

    @Override
    public expiry_notifications getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    @Override
    public expiry_notifications update(Long id,
            expiry_notifications notification) {

        expiry_notifications existing = getById(id);

        existing.setInventory(notification.getInventory());
        existing.setIngredient(notification.getIngredient());
        existing.setNotificationType(notification.getNotificationType());
        existing.setMessage(notification.getMessage());
        existing.setNotificationDate(notification.getNotificationDate());
        existing.setIsRead(notification.getIsRead());
        existing.setStatus(notification.getStatus());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {

        repository.delete(getById(id));
    }

}