import * as Yup from "yup";

const addTaskSchema = Yup.object().shape({
  title: Yup.string().required().label("Task title").max(100, 'Task title must not exceed 100 characters'),
  content: Yup.string().required().label("Task content"),
  attachment: Yup.mixed()
    .test("fileSize", "Image size is too large", (value) => {
      console.log([value, "sizee"])
      if (!value) return true;
      return value.size <= 4194304;
    }),
});

export default addTaskSchema;
