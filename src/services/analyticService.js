
import axiosInstance from "./axiosInstance";


export const getAnalyticsData = async (id) => {
  const response = await axiosInstance.get(`/adminRouter/${id}/analytics`);
  return response.data;
};