import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import RecipeCard from "../components/RecipeCard";
import { generateAIRecipe, getAllRecipes, deleteRecipe } from "../services/recipesApi";
import { getInventory } from "../services/inventoryApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AI_STEPS = [
  { icon: "📦", text: "Scanning kitchen inventory & checking expiry dates..." },
  { icon: "🧠", text: "Analyzing available ingredients with Google Gemini AI..." },
  { icon: "🍲", text: "Formulating delicious recipe steps & nutrition specs..." },
  { icon: "🎨", text: "Generating high-definition AI recipe image & uploading..." },
  { icon: "💾", text: "Saving AI recipe into kitchen database..." },
];

function RecipeGenerator() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [recipes, setRecipes] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setInitialLoading(true);
      const [fetchedRecipes, fetchedInventory] = await Promise.allSettled([
        getAllRecipes(),
        getInventory(),
      ]);

      if (fetchedRecipes.status === "fulfilled" && Array.isArray(fetchedRecipes.value)) {
        setRecipes(fetchedRecipes.value);
      }
      if (fetchedInventory.status === "fulfilled" && Array.isArray(fetchedInventory.value)) {
        setInventory(fetchedInventory.value);
      }
    } catch (err) {
      console.error("Error loading recipe generator data:", err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleGenerateRecipe = async () => {
    setLoading(true);
    setAnimationStep(0);

    // Cycle animation steps while loading
    const stepInterval = setInterval(() => {
      setAnimationStep((prev) =>
        prev < AI_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 3500);

    try {
      const result = await generateAIRecipe({ ingredients: [], expiry_days: [] });
      clearInterval(stepInterval);
      toast.success(`✨ Recipe Generated: ${result.recipe_name || "AI Recipe"}!`);
      await loadData();
    } catch (error) {
      clearInterval(stepInterval);
      console.error("AI Recipe Generation error:", error);
      toast.error("Failed to generate AI recipe. Please check the GenAI service.");
    } finally {
      setLoading(false);
      setAnimationStep(0);
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm("Delete this recipe from your collection?")) return;
    try {
      await deleteRecipe(id);
      toast.success("Recipe deleted successfully");
      loadData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete recipe");
    }
  };

  // Count items expiring within 7 days
  const expiringCount = inventory.filter((item) => {
    if (!item.expiryDate) return false;
    const diffDays = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  }).length;

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
          {/* Header Banner */}
          <div
            className="d-flex justify-content-between align-items-center mb-4 p-4"
            style={{
              background: "linear-gradient(135deg, #1e1b4b, #312e81)",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
            }}
          >
            <div>
              <h2 className="fw-bold text-white mb-2" style={{ letterSpacing: "1px" }}>
                ✨ Smart AI Recipe Creator
              </h2>
              <p className="text-light mb-1" style={{ opacity: 0.85 }}>
                Leverage LangGraph &amp; Gemini AI to auto-generate gourmet recipes from your expiring inventory.
              </p>
              {expiringCount > 0 && (
                <span className="badge bg-warning text-dark px-3 py-1" style={{ borderRadius: "10px" }}>
                  ⚠️ {expiringCount} ingredient{expiringCount > 1 ? "s" : ""} expiring soon — perfect for AI recipes!
                </span>
              )}
            </div>
            <button
              className="btn btn-lg fw-bold"
              disabled={loading}
              onClick={handleGenerateRecipe}
              style={{
                borderRadius: "14px",
                padding: "14px 32px",
                background: loading
                  ? "linear-gradient(90deg, #4f46e5, #7c3aed)"
                  : "linear-gradient(90deg, #22c55e, #16a34a)",
                border: "none",
                color: "white",
                boxShadow: loading
                  ? "0 10px 25px rgba(99, 102, 241, 0.5)"
                  : "0 10px 25px rgba(34, 197, 94, 0.4)",
                transition: "all 0.3s ease",
                minWidth: "200px",
              }}
            >
              {loading ? "⚡ Creating Magic..." : "🚀 Generate AI Recipe"}
            </button>
          </div>

          {/* AI Generation Animated Progress Panel */}
          {loading && (
            <div
              className="p-5 text-center mb-4"
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e293b)",
                borderRadius: "24px",
                border: "2px solid #6366f1",
                boxShadow: "0 20px 60px rgba(99, 102, 241, 0.35)",
                color: "#ffffff",
              }}
            >
              {/* Glowing Pulse Bubble */}
              <div className="ai-pulse-container mb-4">
                <div className="ai-icon-bubble">
                  <span style={{ fontSize: "56px" }}>{AI_STEPS[animationStep].icon}</span>
                </div>
              </div>

              <h3 className="fw-bold text-white mb-2">AI Recipe Generation in Progress</h3>
              <p className="fs-5 fw-semibold mb-4" style={{ color: "#a5b4fc" }}>
                {AI_STEPS[animationStep].text}
              </p>

              {/* Step Indicators */}
              <div className="d-flex justify-content-center gap-3 mb-4">
                {AI_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      background: idx <= animationStep
                        ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                        : "rgba(255,255,255,0.1)",
                      boxShadow: idx === animationStep ? "0 0 16px rgba(99,102,241,0.8)" : "none",
                      transition: "all 0.5s ease",
                    }}
                  >
                    {step.icon}
                  </div>
                ))}
              </div>

              {/* Progress Bar */}
              <div
                className="progress mx-auto"
                style={{ maxWidth: "600px", height: "12px", borderRadius: "10px", background: "#334155" }}
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  style={{
                    width: `${((animationStep + 1) / AI_STEPS.length) * 100}%`,
                    background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                    transition: "width 0.8s ease-in-out",
                    borderRadius: "10px",
                  }}
                />
              </div>

              <div className="mt-3 text-muted small">
                Step {animationStep + 1} of {AI_STEPS.length} — AI is crafting your recipe using PostgreSQL inventory & S3...
              </div>
            </div>
          )}

          {/* Inventory Summary Pills */}
          {!loading && inventory.length > 0 && (
            <div
              className="card border-0 shadow-sm mb-4"
              style={{
                background: darkMode ? "#1e293b" : "#ffffff",
                borderRadius: "16px",
              }}
            >
              <div className="card-body px-4 py-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <span className="fw-bold" style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}>
                    📦 Inventory Status:
                  </span>
                  <span className="badge bg-success px-3 py-2" style={{ borderRadius: "10px" }}>
                    {inventory.length} Total Items
                  </span>
                  {expiringCount > 0 && (
                    <span className="badge bg-warning text-dark px-3 py-2" style={{ borderRadius: "10px" }}>
                      ⚠️ {expiringCount} Expiring Soon
                    </span>
                  )}
                  <span className="text-muted small ms-auto">
                    AI uses expiring items to minimize waste
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Saved Recipes Collection */}
          <div className="mb-4">
            <h4
              className="fw-bold mb-3 d-flex align-items-center gap-2"
              style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}
            >
              <span>📚 AI Recipe History &amp; Saved Collection</span>
              <span className="badge bg-primary rounded-pill">{recipes.length}</span>
            </h4>

            {initialLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading your AI recipes...</p>
              </div>
            ) : recipes.length === 0 ? (
              <div
                className="text-center py-5 p-4"
                style={{
                  background: darkMode ? "#1e293b" : "#ffffff",
                  borderRadius: "16px",
                  border: "1px dashed #64748b",
                }}
              >
                <div style={{ fontSize: "56px" }} className="mb-3">
                  🍲
                </div>
                <h5 className="fw-bold">No AI Recipes Yet</h5>
                <p className="text-muted">
                  Click <strong>🚀 Generate AI Recipe</strong> above to create your first intelligent recipe
                  from kitchen inventory!
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {recipes.map((rec) => (
                  <div key={rec.id} className="col-lg-4 col-md-6">
                    <RecipeCard recipe={rec} onDelete={handleDeleteRecipe} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Animation Styles */}
      <style>{`
        .ai-pulse-container {
          display: flex;
          justify-content: center;
        }
        .ai-icon-bubble {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 35px rgba(99, 102, 241, 0.6);
          animation: pulseGlow 1.8s infinite alternate;
        }
        @keyframes pulseGlow {
          0% { transform: scale(0.95); box-shadow: 0 0 20px rgba(99,102,241,0.4); }
          100% { transform: scale(1.08); box-shadow: 0 0 50px rgba(124,58,237,0.85); }
        }
      `}</style>
    </div>
  );
}

export default RecipeGenerator;
