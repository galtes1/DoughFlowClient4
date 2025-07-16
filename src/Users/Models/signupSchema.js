import Joi from "joi";

const signupSchema = {
  name: Joi.string().min(2).max(256).required(),

   email: Joi.string()
  .pattern(/^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]{2,5})$/)
  .message("Email must be valid")
    .required(),

     password: Joi.string()
       .pattern(/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*-]).{7,20}/)
    .message(
      "Password must be 7-20 chars, include upper/lower, number & special char"
    )
    .required(),

    isBusiness: Joi.boolean().required(),
  currentPassword: Joi.string().allow(""),
};

export default signupSchema;
