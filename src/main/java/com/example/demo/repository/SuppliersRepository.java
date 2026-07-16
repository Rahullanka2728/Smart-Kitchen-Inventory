package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.suppliers;

@Repository
public interface SuppliersRepository extends JpaRepository<suppliers, Long> {

    Optional<suppliers> findByEmail(String email);

    boolean existsByEmail(String email);

}