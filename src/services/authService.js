import axiosInstance from "./axiosInstance";

export const login = async (payload) => {
  const response = await axiosInstance.post("/authRouter/admin_login", payload);
  return response.data;
};