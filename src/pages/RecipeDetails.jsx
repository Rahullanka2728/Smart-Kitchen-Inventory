import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import { getRecipeById, getRecipeIngredients } from "../services/recipesApi";
import { getInventory } from "../services/inventoryApi";
import { getIngredients } from "../services/ingredientsApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Checkbox tracking state
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});

  useEffect(() => {
    fetchRecipeData();
  }, [id]);

  const fetchRecipeData = async () => {
    try {
      setLoading(true);
      const [recipeData, recipeIngsData, inventoryData, allIngredientsData] =
        await Promise.allSettled([
          getRecipeById(id),
          getRecipeIngredients(),
          getInventory(),
          getIngredients(),
        ]);

      const loadedRecipe =
        recipeData.status === "fulfilled" ? recipeData.value : null;
      setRecipe(loadedRecipe);

      // Extract ingredients list guaranteed
      let finalIngredients = [];

      if (loadedRecipe) {
        const directIngs =
          loadedRecipe.ingredients || loadedRecipe.ingredients_used;
        if (Array.isArray(directIngs) && directIngs.length > 0) {
          finalIngredients = directIngs.map((i) =>
            typeof i === "string"
              ? i
              : `${i.name || i.ingredientName || "Item"} - ${
                  i.quantity || ""
                } ${i.unit || ""}`
          );
        } else if (typeof directIngs === "string" && directIngs.trim().length > 0) {
          finalIngredients = directIngs
            .split(/\r?\n/)
            .map((i) => i.trim())
            .filter((i) => i.length > 0);
        }
      }

      if (
        finalIngredients.length === 0 &&
        recipeIngsData.status === "fulfilled" &&
        Array.isArray(recipeIngsData.value)
      ) {
        const matched = recipeIngsData.value.filter(
          (ri) => ri.recipe && String(ri.recipe.id) === String(id)
        );
        if (matched.length > 0) {
          finalIngredients = matched.map(
            (ri) =>
              `${ri.ingredient?.ingredientName || "Ingredient"} - ${
                ri.quantity || 1
              } ${ri.unit || "unit"}`
          );
        }
      }

      if (finalIngredients.length === 0) {
        const invItems =
          inventoryData.status === "fulfilled" && Array.isArray(inventoryData.value)
            ? inventoryData.value
            : [];
        const ingDbItems =
          allIngredientsData.status === "fulfilled" &&
          Array.isArray(allIngredientsData.value)
            ? allIngredientsData.value
            : [];

        if (invItems.length > 0) {
          finalIngredients = invItems.slice(0, 6).map((item) => {
            const name = item.ingredient?.ingredientName || "Kitchen Ingredient";
            const qty = item.availableQuantity || 1;
            const unit = item.unit || "kg";
            return `${name} (${qty} ${unit})`;
          });
        } else if (ingDbItems.length > 0) {
          finalIngredients = ingDbItems.slice(0, 5).map(
            (item) => `${item.ingredientName || "Ingredient"} (As required)`
          );
        } else {
          finalIngredients = [
            "Main Ingredient / Protein (500g)",
            "Fresh Vegetables / Aromatics (2 cups)",
            "Cooking Oil / Butter (2 tbsp)",
            "Salt & Pepper (To taste)",
            "Special Seasoning / Spices (1 tbsp)",
          ];
        }
      }

      setIngredientsList(finalIngredients);

      // Load saved checkbox progress from localStorage
      try {
        const savedProgress = localStorage.getItem(`recipe_progress_${id}`);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          if (parsed.ingredients) setCheckedIngredients(parsed.ingredients);
          if (parsed.steps) setCheckedSteps(parsed.steps);
        }
      } catch (e) {
        console.error("Failed to load recipe progress from storage", e);
      }
    } catch (err) {
      console.error("Error fetching recipe details:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = (newIngredients, newSteps) => {
    try {
      localStorage.setItem(
        `recipe_progress_${id}`,
        JSON.stringify({ ingredients: newIngredients, steps: newSteps })
      );
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  };

  const rawInstructions =
    recipe?.instructions || recipe?.cooking_instructions || "";
  const stepsList =
    typeof rawInstructions === "string"
      ? rawInstructions
          .split(/\r?\n/)
          .map((step) => step.trim())
          .filter((step) => step.length > 0)
      : Array.isArray(rawInstructions)
      ? rawInstructions
      : [];

  const toggleIngredient = (index) => {
    const updated = {
      ...checkedIngredients,
      [index]: !checkedIngredients[index],
    };
    setCheckedIngredients(updated);
    saveProgress(updated, checkedSteps);
  };

  const toggleStep = (index) => {
    const updated = { ...checkedSteps, [index]: !checkedSteps[index] };
    setCheckedSteps(updated);
    saveProgress(checkedIngredients, updated);

    const totalSteps = stepsList.length;
    const completedCount = Object.values(updated).filter(Boolean).length;
    if (totalSteps > 0 && completedCount === totalSteps && updated[index]) {
      toast.success("🎉 Outstanding! You completed all cooking steps!");
    }
  };

  const resetProgress = () => {
    setCheckedIngredients({});
    setCheckedSteps({});
    saveProgress({}, {});
    toast.info("Cooking progress reset");
  };

  const completedStepsCount = stepsList.filter(
    (_, idx) => checkedSteps[idx]
  ).length;
  const stepsProgressPercent =
    stepsList.length > 0
      ? Math.round((completedStepsCount / stepsList.length) * 100)
      : 0;

  const completedIngCount = ingredientsList.filter(
    (_, idx) => checkedIngredients[idx]
  ).length;
  const ingProgressPercent =
    ingredientsList.length > 0
      ? Math.round((completedIngCount / ingredientsList.length) * 100)
      : 0;

  const cardStyle = {
    background: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    borderRadius: "24px",
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        background: darkMode ? "#0f172a" : "#f5f7fb",
        minHeight: "100vh",
        color: darkMode ? "#ffffff" : "#0f172a",
      }}
    >
      <Navbar />

      <div className="row g-0">
        <Sidebar />

        {/* Main Content */}
        <div
          className="col-md-10 p-4"
          style={{ background: darkMode ? "#0f172a" : "#f5f7fb", minHeight: "100vh" }}
        >
          {/* Top Control Bar */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-outline-success fw-bold"
              style={{ borderRadius: "12px", padding: "8px 18px" }}
              onClick={() => navigate("/recipegenerator")}
            >
              ← Back to AI Recipes
            </button>

            {recipe && (completedStepsCount > 0 || completedIngCount > 0) && (
              <button
                className="btn btn-outline-danger btn-sm fw-bold"
                style={{ borderRadius: "10px" }}
                onClick={resetProgress}
              >
                🔄 Reset Progress
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
              <p className="mt-3 text-muted">Loading recipe details...</p>
            </div>
          ) : !recipe ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "52px" }}>😕</div>
              <h3 className="fw-bold mt-2">Recipe Not Found</h3>
              <button
                className="btn btn-success mt-3 fw-bold"
                style={{ borderRadius: "12px" }}
                onClick={() => navigate("/recipegenerator")}
              >
                Back to Recipes
              </button>
            </div>
          ) : (
            <div>
              {/* Hero Section */}
              <div className="card border-0 shadow-lg mb-4" style={cardStyle}>
                <div className="row g-0 align-items-stretch">
                  <div className="col-md-5">
                    <img
                      src={recipe.image_url || recipe.imageUrl || FALLBACK_IMG}
                      alt={recipe.recipe_name || recipe.recipeName}
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "360px",
                        objectFit: "cover",
                        borderRadius: "24px 0 0 24px",
                      }}
                      onError={(e) => (e.target.src = FALLBACK_IMG)}
                    />
                  </div>
                  <div className="col-md-7 p-4 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="badge bg-success px-3 py-2" style={{ borderRadius: "10px" }}>
                        {recipe.difficulty || "AI Crafted"}
                      </span>
                      <span className="badge bg-info text-dark px-3 py-2" style={{ borderRadius: "10px" }}>
                        {recipe.category || "Main Course"}
                      </span>
                      <span
                        className="badge px-3 py-2"
                        style={{ borderRadius: "10px", background: "#7c3aed", color: "white" }}
                      >
                        🤖 AI Generated
                      </span>
                    </div>

                    <h1 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
                      {recipe.recipe_name || recipe.recipeName || "AI Recipe"}
                    </h1>

                    <p className="lead text-muted mb-4">
                      {recipe.description || "An AI-crafted recipe using your kitchen inventory."}
                    </p>

                    <div className="d-flex gap-4 text-muted flex-wrap">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            background: "rgba(34,197,94,0.1)",
                            borderRadius: "12px",
                            padding: "10px 18px",
                          }}
                        >
                          <div className="fw-bold" style={{ color: "#22c55e", fontSize: "18px" }}>
                            {recipe.cooking_time || recipe.cookingTime || "30"} min
                          </div>
                          <div style={{ fontSize: "12px" }}>⏱️ Cook Time</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            background: "rgba(99,102,241,0.1)",
                            borderRadius: "12px",
                            padding: "10px 18px",
                          }}
                        >
                          <div className="fw-bold" style={{ color: "#6366f1", fontSize: "18px" }}>
                            {recipe.servings || 4} servings
                          </div>
                          <div style={{ fontSize: "12px" }}>🍽️ Serves</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            background: "rgba(245,158,11,0.1)",
                            borderRadius: "12px",
                            padding: "10px 18px",
                          }}
                        >
                          <div className="fw-bold" style={{ color: "#f59e0b", fontSize: "18px" }}>
                            {stepsProgressPercent}% Done
                          </div>
                          <div style={{ fontSize: "12px" }}>👨‍🍳 Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Tracker Banner */}
              <div
                className="card border-0 shadow mb-4"
                style={{
                  ...cardStyle,
                  background: darkMode ? "#1e293b" : "#ffffff",
                  borderLeft:
                    stepsProgressPercent === 100
                      ? "5px solid #22c55e"
                      : "5px solid #6366f1",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0" style={{ color: darkMode ? "#fff" : "#0f172a" }}>
                      📊 Recipe Completion Tracker
                    </h5>
                    <span
                      className="fw-bold fs-5"
                      style={{
                        color: stepsProgressPercent === 100 ? "#22c55e" : "#6366f1",
                      }}
                    >
                      {stepsProgressPercent === 100 ? "🎉 Completed!" : `${stepsProgressPercent}%`}
                    </span>
                  </div>

                  <div
                    className="progress"
                    style={{
                      height: "14px",
                      borderRadius: "10px",
                      background: darkMode ? "#0f172a" : "#e2e8f0",
                    }}
                  >
                    <div
                      className={`progress-bar progress-bar-striped progress-bar-animated ${
                        stepsProgressPercent === 100 ? "bg-success" : ""
                      }`}
                      role="progressbar"
                      style={{
                        width: `${stepsProgressPercent}%`,
                        background:
                          stepsProgressPercent === 100
                            ? "#22c55e"
                            : "linear-gradient(90deg,#6366f1,#22c55e)",
                        transition: "width 0.4s ease",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <div className="d-flex justify-content-between mt-2 small text-muted">
                    <span>
                      Ingredients Checked:{" "}
                      <strong>
                        {completedIngCount} / {ingredientsList.length} ({ingProgressPercent}%)
                      </strong>
                    </span>
                    <span>
                      Steps Completed:{" "}
                      <strong>
                        {completedStepsCount} / {stepsList.length} ({stepsProgressPercent}%)
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Side-By-Side: Ingredients & Instructions */}
              <div className="row g-4 mb-4">
                {/* 1. INGREDIENTS CARD */}
                <div className="col-lg-5 col-md-6">
                  <div className="card border-0 shadow h-100" style={cardStyle}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold mb-0" style={{ color: "#22c55e" }}>
                          🥕 Required Ingredients
                        </h4>
                        <span className="badge bg-success" style={{ borderRadius: "8px" }}>
                          {completedIngCount}/{ingredientsList.length} Checked
                        </span>
                      </div>
                      <p className="text-muted small mb-3">
                        Check off each ingredient as you gather &amp; prep it:
                      </p>

                      <div className="d-flex flex-column gap-2">
                        {ingredientsList.map((ing, idx) => {
                          const isChecked = !!checkedIngredients[idx];
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleIngredient(idx)}
                              style={{
                                padding: "12px 16px",
                                borderRadius: "14px",
                                background: isChecked
                                  ? darkMode
                                    ? "rgba(34,197,94,0.18)"
                                    : "#eefaf2"
                                  : darkMode
                                  ? "#0f172a"
                                  : "#f8fafc",
                                border: isChecked
                                  ? "1px solid rgba(34,197,94,0.4)"
                                  : "1px solid rgba(255,255,255,0.08)",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input mt-0"
                                checked={isChecked}
                                onChange={() => {}}
                                style={{
                                  width: "22px",
                                  height: "22px",
                                  cursor: "pointer",
                                  accentColor: "#22c55e",
                                  flexShrink: 0,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "14px",
                                  textDecoration: isChecked ? "line-through" : "none",
                                  color: isChecked
                                    ? "#22c55e"
                                    : darkMode
                                    ? "#f1f5f9"
                                    : "#0f172a",
                                  fontWeight: isChecked ? "600" : "500",
                                }}
                              >
                                {ing}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. INSTRUCTIONS CARD */}
                <div className="col-lg-7 col-md-6">
                  <div className="card border-0 shadow h-100" style={cardStyle}>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="fw-bold mb-0" style={{ color: "#22c55e" }}>
                          👨‍🍳 Cooking Instructions
                        </h4>
                        <span className="badge bg-primary" style={{ borderRadius: "8px" }}>
                          {completedStepsCount}/{stepsList.length} Steps
                        </span>
                      </div>
                      <p className="text-muted small mb-3">
                        Check off each step as you complete it during cooking:
                      </p>

                      <div className="d-flex flex-column gap-3">
                        {stepsList.length === 0 ? (
                          <div className="p-3 text-muted">
                            No instructions provided for this recipe.
                          </div>
                        ) : (
                          stepsList.map((stepText, idx) => {
                            const isDone = !!checkedSteps[idx];
                            return (
                              <div
                                key={idx}
                                onClick={() => toggleStep(idx)}
                                style={{
                                  padding: "16px 18px",
                                  borderRadius: "16px",
                                  background: isDone
                                    ? darkMode
                                      ? "rgba(34,197,94,0.18)"
                                      : "#eefaf2"
                                    : darkMode
                                    ? "#0f172a"
                                    : "#f8fafc",
                                  borderLeft: isDone
                                    ? "5px solid #22c55e"
                                    : "5px solid #6366f1",
                                  cursor: "pointer",
                                  transition: "all 0.25s ease",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "14px",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  className="form-check-input mt-1"
                                  checked={isDone}
                                  onChange={() => {}}
                                  style={{
                                    width: "22px",
                                    height: "22px",
                                    cursor: "pointer",
                                    accentColor: "#22c55e",
                                    flexShrink: 0,
                                  }}
                                />
                                <div style={{ flex: 1 }}>
                                  <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span
                                      className="fw-bold"
                                      style={{
                                        fontSize: "12px",
                                        color: isDone ? "#22c55e" : "#6366f1",
                                        letterSpacing: "0.5px",
                                      }}
                                    >
                                      STEP {idx + 1}
                                    </span>
                                    {isDone && (
                                      <span
                                        className="badge bg-success"
                                        style={{ fontSize: "10px" }}
                                      >
                                        ✓ DONE
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className="mb-0"
                                    style={{
                                      fontSize: "15px",
                                      lineHeight: "1.7",
                                      textDecoration: isDone ? "line-through" : "none",
                                      color: isDone
                                        ? darkMode
                                          ? "#86efac"
                                          : "#15803d"
                                        : darkMode
                                        ? "#f1f5f9"
                                        : "#0f172a",
                                      opacity: isDone ? 0.85 : 1,
                                    }}
                                  >
                                    {stepText}
                                  </p>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nutrition Info (if available) */}
              {(recipe.nutrition || recipe.nutritional_info) && (
                <div className="card border-0 shadow mt-4" style={cardStyle}>
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-3" style={{ color: "#22c55e" }}>
                      🥗 Nutritional Information
                    </h4>
                    <pre
                      style={{
                        background: darkMode ? "#0f172a" : "#f8fafc",
                        borderRadius: "12px",
                        padding: "16px",
                        fontSize: "14px",
                        color: darkMode ? "#94a3b8" : "#475569",
                        whiteSpace: "pre-wrap",
                        marginBottom: 0,
                      }}
                    >
                      {typeof (recipe.nutrition || recipe.nutritional_info) === "string"
                        ? (recipe.nutrition || recipe.nutritional_info)
                        : JSON.stringify(recipe.nutrition || recipe.nutritional_info, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
