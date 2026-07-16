package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.suppliers;
import com.example.demo.repository.SuppliersRepository;
import com.example.demo.service.SuppliersService;

@Service
public class SuppliersServiceImpl implements SuppliersService {

    @Autowired
    private SuppliersRepository suppliersRepository;

    @Override
    public suppliers addSupplier(suppliers supplier) {

        if (suppliersRepository.existsByEmail(supplier.getEmail())) {
            throw new RuntimeException("Supplier email already exists");
        }

        return suppliersRepository.save(supplier);
    }

    @Override
    public List<suppliers> getAllSuppliers() {
        return suppliersRepository.findAll();
    }

    @Override
    public suppliers getSupplierById(Long id) {

        return suppliersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    @Override
    public suppliers updateSupplier(Long id, suppliers supplier) {

        suppliers existingSupplier = suppliersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        existingSupplier.setSupplierName(supplier.getSupplierName());
        existingSupplier.setContactPerson(supplier.getContactPerson());
        existingSupplier.setEmail(supplier.getEmail());
        existingSupplier.setPhone(supplier.getPhone());
        existingSupplier.setAddress(supplier.getAddress());
        existingSupplier.setStatus(supplier.getStatus());

        return suppliersRepository.save(existingSupplier);
    }

    @Override
    public void deleteSupplier(Long id) {

        suppliers supplier = suppliersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        suppliersRepository.delete(supplier);
    }

}