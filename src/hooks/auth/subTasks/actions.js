import axiosInterceptor from "@/utils/axios";

export const listSubTask = async (taskTitle, searchParams) => {
  const parsed = await axiosInterceptor
    .get(`/tasks?title=${taskTitle}&${searchParams}`)
    .then((response) => {
      let data = response.data;
      return { data: data?.data, meta: data?.meta };
    });
  return parsed;
};

export const addSubTask = async ({ payload, form }) => {
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

export const editSubTask = async ({ title, payload, form }) => {
  try {
    const parsed = await axiosInterceptor
      .post(`/tasks/${title}?_method=PATCH`, payload, {
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

export const deleteSubTask = async ({ title, parentTitle }) => {
  const parsed = await axiosInterceptor
    .delete(`/tasks/${title}`, { data: { parentTitle: parentTitle } })
    .then((response) => {
      return response.data;
    });
  return parsed;
};
