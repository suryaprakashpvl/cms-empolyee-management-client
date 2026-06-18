import axiosInstance from "./axiosInstance";

export const getEmployees = async (params) => {
  const response = await axiosInstance.get("/adminRouter", { params });
  return response.data;
};

export const createEmployee = async (payload) => {
  const response = await axiosInstance.post("/adminRouter", payload);
  return response.data;
};

export const updateEmployee = async (id, payload) => {
  const response = await axiosInstance.put(`/adminRouter/${id}`, payload);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axiosInstance.delete(`/adminRouter/${id}`);
  return response.data;
};