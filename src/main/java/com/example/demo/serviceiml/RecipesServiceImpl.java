package com.example.demo.serviceiml;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Recipes;
import com.example.demo.repository.RecipesRepository;
import com.example.demo.service.RecipesService;
import com.example.demo.service.S3Service;

@Service
public class RecipesServiceImpl implements RecipesService {

    private final RecipesRepository recipesRepository;
    private final S3Service s3Service;

    public RecipesServiceImpl(RecipesRepository recipesRepository, S3Service s3Service) {
        this.recipesRepository = recipesRepository;
        this.s3Service = s3Service;
    }

    @Override
    public Recipes addRecipe(Recipes recipe) {
        return recipesRepository.save(recipe);
    }

    @Override
    public List<Recipes> getAllRecipes() {
        return recipesRepository.findAll();
    }

    @Override
    public Recipes getRecipeById(Long id) {

        return recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    @Override
    public Recipes updateRecipe(Long id, Recipes recipe) {

        Recipes existingRecipe = recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        existingRecipe.setRecipeName(recipe.getRecipeName());
        existingRecipe.setCategory(recipe.getCategory());
        existingRecipe.setDescription(recipe.getDescription());
        existingRecipe.setInstructions(recipe.getInstructions());
        existingRecipe.setCookingTime(recipe.getCookingTime());
        existingRecipe.setServings(recipe.getServings());
        existingRecipe.setDifficulty(recipe.getDifficulty());
        existingRecipe.setImageUrl(recipe.getImageUrl());
        existingRecipe.setCreatedBy(recipe.getCreatedBy());

        return recipesRepository.save(existingRecipe);
    }

    @Override
    public void deleteRecipe(Long id) {

        Recipes recipe = recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        recipesRepository.delete(recipe);
    }

    @Override
    public String uploadRecipeImage(Long id, MultipartFile file) {

        Recipes recipe = recipesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        // Upload image to S3
        String imageUrl = s3Service.uploadFile(file);

        // Save S3 URL into database
        recipe.setImageUrl(imageUrl);

        recipesRepository.save(recipe);

        return imageUrl;
    }
}