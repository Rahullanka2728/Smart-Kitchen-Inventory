package com.example.demo.service;

import java.util.List;

import com.example.demo.models.Suppliers;

public interface SuppliersService {

    Suppliers addSupplier(Suppliers supplier);

    List<Suppliers> getAllSuppliers();

    Suppliers getSupplierById(Long id);

    Suppliers updateSupplier(Long id, Suppliers supplier);

    void deleteSupplier(Long id);

}