package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.users;
import com.example.demo.repository.UsersRepository;
import com.example.demo.service.UsersService;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public users registerUser(users user) {

        if (usersRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return usersRepository.save(user);
    }

    @Override
    public List<users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public users getUserById(Long id) {

        return usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public users updateUser(Long id, users user) {

        users existingUser = usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setFirstName(user.getFirstName());
        existingUser.setLastName(user.getLastName());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setRole(user.getRole());
        existingUser.setStatus(user.getStatus());

        return usersRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id) {

        users existingUser = usersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        usersRepository.delete(existingUser);
    }

    @Override
    public users login(String email, String password) {

        users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }

}