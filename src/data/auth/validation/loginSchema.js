import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email Address"),
  password: Yup.string().required().label("Password"),
});

export default loginSchema;
