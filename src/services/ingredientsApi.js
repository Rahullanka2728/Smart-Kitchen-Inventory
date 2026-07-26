import axios from "axios";

const API_URL = "http://localhost:8080/api/ingredients";

export const getIngredients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getIngredientById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};