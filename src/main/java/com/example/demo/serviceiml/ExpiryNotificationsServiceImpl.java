package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.ExpiryNotifications;
import com.example.demo.repository.ExpiryNotificationsRepository;
import com.example.demo.service.ExpiryNotificationsService;

@Service
public class ExpiryNotificationsServiceImpl implements ExpiryNotificationsService {

    private final ExpiryNotificationsRepository repository;

    public ExpiryNotificationsServiceImpl(ExpiryNotificationsRepository repository) {
        this.repository = repository;
    }

    @Override
    public ExpiryNotifications save(ExpiryNotifications notification) {

        return repository.save(notification);
    }

    @Override
    public List<ExpiryNotifications> getAll() {

        return repository.findAll();
    }

    @Override
    public ExpiryNotifications getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    @Override
    public ExpiryNotifications update(Long id,
            ExpiryNotifications notification) {

        ExpiryNotifications existing = getById(id);

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