import * as Yup from "yup";

const getRegistrationSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    email: Yup.string().required().email().label("Email Address"),
    password: Yup.string().required().min(8).label("Password"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

export default getRegistrationSchema;
