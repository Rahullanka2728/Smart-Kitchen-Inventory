package com.example.demo.service;

import java.util.List;

import com.example.demo.models.users;

public interface UsersService {

    users registerUser(users user);

    List<users> getAllUsers();

    users getUserById(Long id);

    users updateUser(Long id, users user);

    void deleteUser(Long id);

    users login(String email, String password);

}