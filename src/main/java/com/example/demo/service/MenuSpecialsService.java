package com.example.demo.service;

import java.util.List;

import com.example.demo.models.MenuSpecials;

public interface MenuSpecialsService {

    MenuSpecials save(MenuSpecials special);

    List<MenuSpecials> getAll();

    MenuSpecials getById(Long id);

    MenuSpecials update(Long id, MenuSpecials special);

    void delete(Long id);

}