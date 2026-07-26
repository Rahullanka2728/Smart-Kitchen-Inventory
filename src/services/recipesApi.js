import axios from "axios";

const BACKEND_URL = "http://localhost:8080/api/recipes";
const GENAI_URL = "http://localhost:8000/generate-recipe";
const RECIPE_INGREDIENTS_URL = "http://localhost:8080/api/recipe-ingredients";

export const getAllRecipes = async () => {
  const response = await axios.get(BACKEND_URL);
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/${id}`);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await axios.delete(`${BACKEND_URL}/${id}`);
  return response.data;
};

export const getRecipeIngredients = async () => {
  try {
    const response = await axios.get(RECIPE_INGREDIENTS_URL);
    return response.data;
  } catch (err) {
    console.warn("Failed to fetch recipe ingredients:", err);
    return [];
  }
};

export const generateAIRecipe = async (requestData = { ingredients: [], expiry_days: [] }) => {
  const response = await axios.post(GENAI_URL, requestData, {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60000, // 60 seconds timeout for AI generation
  });
  return response.data;
};
