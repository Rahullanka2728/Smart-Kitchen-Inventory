package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.suppliers;
import com.example.demo.service.SuppliersService;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SuppliersController {

    @Autowired
    private SuppliersService suppliersService;

    @PostMapping
    public suppliers addSupplier(@RequestBody suppliers supplier) {
        return suppliersService.addSupplier(supplier);
    }

    @GetMapping
    public List<suppliers> getAllSuppliers() {
        return suppliersService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public suppliers getSupplierById(@PathVariable Long id) {
        return suppliersService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    public suppliers updateSupplier(@PathVariable Long id,
                                    @RequestBody suppliers supplier) {
        return suppliersService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable Long id) {

        suppliersService.deleteSupplier(id);

        return "Supplier Deleted Successfully";
    }

}