package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.users;

@Repository
public interface UsersRepository extends JpaRepository<users, Long>{

    Optional<users> findByEmail(String email);

    boolean existsByEmail(String email);

}