import axios from "axios";

const API = "http://localhost:8080/api/suppliers";

export const getSuppliers = async () => {

  const response = await axios.get(API);

  return response.data;

};

export const addSupplier = async (supplier) => {

  const response = await axios.post(API, supplier);

  return response.data;

};

export const deleteSupplier = async (id) => {

  await axios.delete(`${API}/${id}`);

};

export const updateSupplier = async (id, supplier) => {

  const response = await axios.put(`${API}/${id}`, supplier);

  return response.data;

};
