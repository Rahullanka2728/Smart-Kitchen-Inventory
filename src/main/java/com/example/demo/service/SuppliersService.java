package com.example.demo.service;

import java.util.List;

import com.example.demo.models.suppliers;

public interface SuppliersService {

    suppliers addSupplier(suppliers supplier);

    List<suppliers> getAllSuppliers();

    suppliers getSupplierById(Long id);

    suppliers updateSupplier(Long id, suppliers supplier);

    void deleteSupplier(Long id);

}