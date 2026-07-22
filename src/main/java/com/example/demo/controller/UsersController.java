package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Users;
import com.example.demo.service.UsersService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    // Register User
    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        return usersService.registerUser(user);
    }

    // Login User
    @PostMapping("/login")
    public Users login(@RequestParam String email,
                       @RequestParam String password) {

        return usersService.login(email, password);
    }

    // Get All Users
    @GetMapping
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    // Get User By ID
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Long id) {
        return usersService.getUserById(id);
    }

    // Update User
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Long id,
                            @RequestBody Users user) {

        return usersService.updateUser(id, user);
    }

    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        usersService.deleteUser(id);

        return "User Deleted Successfully";
    }

}