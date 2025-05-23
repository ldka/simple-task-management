import axios from "@/utils/axios";

export const register = async ({ payload }) => {
  try {
    const response = await axios.post('/register', payload);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data;
  }
};
