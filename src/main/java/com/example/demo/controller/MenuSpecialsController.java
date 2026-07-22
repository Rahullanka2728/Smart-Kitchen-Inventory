package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.MenuSpecials;
import com.example.demo.service.MenuSpecialsService;

@RestController
@RequestMapping("/api/menu-specials")
@CrossOrigin(origins = "*")
public class MenuSpecialsController {

    private final MenuSpecialsService service;

    public MenuSpecialsController(MenuSpecialsService service) {
        this.service = service;
    }

    @PostMapping
    public MenuSpecials save(@RequestBody MenuSpecials special) {
        return service.save(special);
    }

    @GetMapping
    public List<MenuSpecials> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MenuSpecials getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public MenuSpecials update(@PathVariable Long id,
                                @RequestBody MenuSpecials special) {
        return service.update(id, special);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {

        service.delete(id);

        return "Menu Special Deleted Successfully";
    }

}