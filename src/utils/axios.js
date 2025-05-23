import axios from "axios";
import { getSession } from "next-auth/react";
const ApiClient = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });

  instance.interceptors.request.use(
    async (request) => {
      const session = await getSession();
      if (session) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.message);
    }
  );

  return instance;
};

export default ApiClient();
