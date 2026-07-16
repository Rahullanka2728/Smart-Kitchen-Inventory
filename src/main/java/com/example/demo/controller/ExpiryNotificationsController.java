package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.expiry_notifications;
import com.example.demo.service.ExpiryNotificationsService;

@RestController
@RequestMapping("/api/expiry-notifications")
@CrossOrigin(origins = "*")
public class ExpiryNotificationsController {

    @Autowired
    private ExpiryNotificationsService service;

    @PostMapping
    public expiry_notifications save(@RequestBody expiry_notifications notification) {

        return service.save(notification);
    }

    @GetMapping
    public List<expiry_notifications> getAll() {

        return service.getAll();
    }

    @GetMapping("/{id}")
    public expiry_notifications getById(@PathVariable Long id) {

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public expiry_notifications update(@PathVariable Long id,
            @RequestBody expiry_notifications notification) {

        return service.update(id, notification);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.delete(id);

        return "Notification Deleted Successfully";
    }

}