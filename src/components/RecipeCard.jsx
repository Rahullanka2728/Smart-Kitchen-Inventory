import React from "react";
import { useNavigate } from "react-router-dom";

function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();

  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";

  return (
    <div
      className="card h-100 border-0 shadow-sm recipe-card"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "#1e293b",
        color: "#ffffff",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={recipe.image_url || recipe.imageUrl || fallbackImage}
          alt={recipe.recipe_name || recipe.recipeName || "AI Recipe"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <span
          className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-2"
          style={{ borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}
        >
          {recipe.difficulty || "AI Special"}
        </span>
      </div>

      <div className="card-body p-4 d-flex flex-column justify-content-between">
        <div>
          <h5 className="fw-bold mb-2 text-white">
            {recipe.recipe_name || recipe.recipeName || "AI Generated Recipe"}
          </h5>
          <p className="text-light small mb-3" style={{ opacity: 0.85 }}>
            {recipe.description || recipe.instructions?.substring(0, 90) || "Delicious AI curated recipe based on available kitchen ingredients."}...
          </p>

          <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
            <span>⏱️ {recipe.cooking_time || recipe.cookingTime || 20} mins</span>
            <span>🍽️ {recipe.servings || 4} Servings</span>
          </div>
        </div>

        <div className="d-flex gap-2 mt-2">
          <button
            className="btn btn-outline-success w-100 fw-bold"
            style={{ borderRadius: "10px" }}
            onClick={() => navigate(`/recipe/${recipe.id || 1}`)}
          >
            View Recipe
          </button>
          {onDelete && (
            <button
              className="btn btn-outline-danger"
              style={{ borderRadius: "10px" }}
              onClick={() => onDelete(recipe.id)}
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
