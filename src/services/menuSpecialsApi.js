import axios from "axios";

const API_URL = "http://localhost:8080/api/menu-specials";

// Get All Menu Specials
export const getMenuSpecials = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get Menu Special By ID
export const getMenuSpecialById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add Menu Special
export const addMenuSpecial = async (menuSpecial) => {
  const response = await axios.post(API_URL, menuSpecial);
  return response.data;
};

// Update Menu Special
export const updateMenuSpecial = async (id, menuSpecial) => {
  const response = await axios.put(`${API_URL}/${id}`, menuSpecial);
  return response.data;
};

// Delete Menu Special
export const deleteMenuSpecial = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};