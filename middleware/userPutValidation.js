import Joi from "joi";

const validatePutBasicUser = (req, res, next) => {
  const userSchema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "string.base": "First Name should be a string",
        "string.min": "First Name should have a minimum length of {#limit}",
        "string.max": "First Name should have a maximum length of {#limit}",
        "string.pattern": "First Name should contain alpha characters only",
      }),
    lastName: Joi.string()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "string.base": "Last Name should be a string",
        "string.min": "Last Name should have a minimum length of {#limit}",
        "string.max": "Last Name should have a maximum length of {#limit}",
        "string.pattern": "Last Name should contain alpha characters only",
      }),
    username: Joi.string().min(5).max(10).alphanum().messages({
      "string.base": "Username should be a string",
      "string.min": "Username should have a minimum length of {#limit}",
      "string.max": "Username should have a maximum length of {#limit}",
      "string.alphanum": "Username should contain alphanumeric characters only",
    }),
    email: Joi.string().email().messages({
      "string.base": "Email should be a string",
      "string.email": "Email should use valid syntax",
    }),
    // not stolen from here https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    password: Joi.string()
      .min(8)
      .max(16)
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
      )
      .messages({
        "string.base": "Password should be a string",
        "string.min": "Password should have a minimum length of {#limit}",
        "string.max": "Password should have a maximum length of {#limit}",
        "string.pattern.base":
          "Password must have at least one letter, one number and one special character",
      }),
    // also not stolen from here https://stackoverflow.com/questions/29827082/hapi-route-joi-validation-of-password-confirmation
    confirmPassword: Joi.any().valid(Joi.ref("password")).messages({
      "any.only": "Password must match",
    }).when("password", {
      is: Joi.exist(),
      then: Joi.required()
    }),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};
export { validatePutBasicUser };
