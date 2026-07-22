package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.models.Suppliers;
import com.example.demo.service.SuppliersService;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "*")
public class SuppliersController {

    private final SuppliersService suppliersService;

    public SuppliersController(SuppliersService suppliersService) {
        this.suppliersService = suppliersService;
    }

    @PostMapping
    public Suppliers addSupplier(@RequestBody Suppliers supplier) {
        return suppliersService.addSupplier(supplier);
    }

    @GetMapping
    public List<Suppliers> getAllSuppliers() {
        return suppliersService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public Suppliers getSupplierById(@PathVariable Long id) {
        return suppliersService.getSupplierById(id);
    }

    @PutMapping("/{id}")
    public Suppliers updateSupplier(@PathVariable Long id,
                                    @RequestBody Suppliers supplier) {
        return suppliersService.updateSupplier(id, supplier);
    }

    @DeleteMapping("/{id}")
    public String deleteSupplier(@PathVariable Long id) {

        suppliersService.deleteSupplier(id);

        return "Supplier Deleted Successfully";
    }

}