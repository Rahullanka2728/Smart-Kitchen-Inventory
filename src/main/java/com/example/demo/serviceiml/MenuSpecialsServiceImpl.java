package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.menu_specials;
import com.example.demo.repository.MenuSpecialsRepository;
import com.example.demo.service.MenuSpecialsService;

@Service
public class MenuSpecialsServiceImpl implements MenuSpecialsService {

    @Autowired
    private MenuSpecialsRepository repository;

    @Override
    public menu_specials save(menu_specials special) {

        return repository.save(special);
    }

    @Override
    public List<menu_specials> getAll() {

        return repository.findAll();
    }

    @Override
    public menu_specials getById(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Special not found"));
    }

    @Override
    public menu_specials update(Long id, menu_specials special) {

        menu_specials existing = getById(id);

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