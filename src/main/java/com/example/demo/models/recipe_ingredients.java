package com.example.demo.models;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "recipe_ingredients")
public class recipe_ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private recipes recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private ingredients ingredient;

    @Column(nullable = false)
    private BigDecimal quantity;

    @Column(nullable = false)
    private String unit;

    public recipe_ingredients() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public recipes getRecipe() {
		return recipe;
	}

	public void setRecipe(recipes recipe) {
		this.recipe = recipe;
	}

	public ingredients getIngredient() {
		return ingredient;
	}

	public void setIngredient(ingredients ingredient) {
		this.ingredient = ingredient;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

	public void setQuantity(BigDecimal quantity) {
		this.quantity = quantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public recipe_ingredients(Long id, recipes recipe, ingredients ingredient, BigDecimal quantity, String unit) {
		super();
		this.id = id;
		this.recipe = recipe;
		this.ingredient = ingredient;
		this.quantity = quantity;
		this.unit = unit;
	}


}