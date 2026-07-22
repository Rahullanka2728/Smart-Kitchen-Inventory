package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.MenuSpecials;
import com.example.demo.repository.MenuSpecialsRepository;
import com.example.demo.service.MenuSpecialsService;

@Service
public class MenuSpecialsServiceImpl implements MenuSpecialsService {

    private final MenuSpecialsRepository repository;

    public MenuSpecialsServiceImpl(MenuSpecialsRepository repository) {
        this.repository = repository;
    }

    @Override
    public MenuSpecials save(MenuSpecials special) {

        return repository.save(special);
    }

    @Override
    public List<MenuSpecials> getAll() {

        return repository.findAll();
    }

    @Override
    public MenuSpecials getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Special not found"));
    }

    @Override
    public MenuSpecials update(Long id, MenuSpecials special) {

        MenuSpecials existing = getById(id);

        existing.setRecipe(special.getRecipe());
        existing.setGeneratedBy(special.getGeneratedBy());
        existing.setSpecialTitle(special.getSpecialTitle());
        existing.setRecommendationReason(special.getRecommendationReason());
        existing.setMenuDate(special.getMenuDate());
        existing.setPriority(special.getPriority());
        existing.setStatus(special.getStatus());
        existing.setCreatedAt(special.getCreatedAt());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {

        repository.delete(getById(id));
    }

}