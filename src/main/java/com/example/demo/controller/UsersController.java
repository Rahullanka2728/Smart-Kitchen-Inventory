package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.users;
import com.example.demo.service.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    @Autowired
    private UsersService usersService;

    // Register User
    @PostMapping("/register")
    public users registerUser(@RequestBody users user) {
        return usersService.registerUser(user);
    }

    // Login User
    @PostMapping("/login")
    public users login(@RequestParam String email,
                       @RequestParam String password) {

        return usersService.login(email, password);
    }

    // Get All Users
    @GetMapping
    public List<users> getAllUsers() {
        return usersService.getAllUsers();
    }

    // Get User By ID
    @GetMapping("/{id}")
    public users getUserById(@PathVariable Long id) {
        return usersService.getUserById(id);
    }

    // Update User
    @PutMapping("/{id}")
    public users updateUser(@PathVariable Long id,
                            @RequestBody users user) {

        return usersService.updateUser(id, user);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        usersService.deleteUser(id);

        return "User Deleted Successfully";
    }

}