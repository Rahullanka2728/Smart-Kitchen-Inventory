package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.ExpiryNotifications;
import com.example.demo.service.ExpiryNotificationsService;

@RestController
@RequestMapping("/api/expiry-notifications")
@CrossOrigin(origins = "*")
public class ExpiryNotificationsController {

    private final ExpiryNotificationsService service;

    public ExpiryNotificationsController(ExpiryNotificationsService service) {
        this.service = service;
    }

    @PostMapping
    public ExpiryNotifications save(@RequestBody ExpiryNotifications notification) {

        return service.save(notification);
    }

    @GetMapping
    public List<ExpiryNotifications> getAll() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    public ExpiryNotifications getById(@PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public ExpiryNotifications update(@PathVariable Long id,
            @RequestBody ExpiryNotifications notification) {

        return service.update(id, notification);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.delete(id);

        return "Notification Deleted Successfully";
    }

}