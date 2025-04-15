import axios from "@/utils/axios";

export const register = async ({ payload }) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/register", payload);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.errorCode;
  }
};
