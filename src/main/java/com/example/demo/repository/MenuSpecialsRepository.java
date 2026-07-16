package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.menu_specials;

@Repository
public interface MenuSpecialsRepository extends JpaRepository<menu_specials, Long>{

}