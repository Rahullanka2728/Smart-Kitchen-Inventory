package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.menu_specials;
import com.example.demo.service.MenuSpecialsService;

@RestController
@RequestMapping("/api/menu-specials")
@CrossOrigin(origins = "*")
public class MenuSpecialsController {

    @Autowired
    private MenuSpecialsService service;

    @PostMapping
    public menu_specials save(@RequestBody menu_specials special) {
        return service.save(special);
    }

    @GetMapping
    public List<menu_specials> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public menu_specials getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public menu_specials update(@PathVariable Long id,
                                @RequestBody menu_specials special) {
        return service.update(id, special);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.delete(id);

        return "Menu Special Deleted Successfully";
    }

}