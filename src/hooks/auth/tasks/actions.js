import axiosInterceptor from "@/utils/axios";

export const listTask = async (searchParams) => {
  const parsed = await axiosInterceptor
    .get(`/tasks?${searchParams}`)
    .then((response) => {
      console.log(['task', response.data])
      let data = response.data;
      return { data: data?.data, meta: data?.meta };
    });
  return parsed;
};

export const addTask = async ({ payload, form }) => {
  try {
    const response = await axiosInterceptor.post("/tasks", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    form?.reset();
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const editTask = async ({ title, payload, form }) => {
  try {
    const parsed = await axiosInterceptor
      .patch(`/tasks/${title}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data.data;
      });
    return parsed;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async ({ title }) => {
  const parsed = await axiosInterceptor
    .delete(`/tasks/${title}`)
    .then((response) => {
      return response.data;
    });
  return parsed;
};
