package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Suppliers;

@Repository
public interface SuppliersRepository extends JpaRepository<Suppliers, Long> {

    Optional<Suppliers> findByEmail(String email);

    boolean existsByEmail(String email);

}