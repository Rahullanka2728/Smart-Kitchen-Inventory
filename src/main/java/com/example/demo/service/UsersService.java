package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Users;

public interface UsersService {

    Users registerUser(Users user);

    List<Users> getAllUsers();

    Users getUserById(Long id);

    Users updateUser(Long id, Users user);

    void deleteUser(Long id);

    Users login(String email, String password);

}