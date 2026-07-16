package com.example.demo.service;

import java.util.List;

import com.example.demo.models.menu_specials;

public interface MenuSpecialsService {

    menu_specials save(menu_specials special);

    List<menu_specials> getAll();

    menu_specials getById(Long id);

    menu_specials update(Long id, menu_specials special);

    void delete(Long id);

}