import Joi from "joi";

const validatePostQuiz = (req, res, next) => {
  const quizSchema = Joi.object({
    categoryId: Joi.number(),
    difficulty: Joi.string(),
    type: Joi.string(),
    name: Joi.string()
      .min(5)
      .max(30)
      .pattern(/^[a-zA-Z]+$/)
      .messages({
        "string.base": "Name should be a string",
        "string.empty": "Name cannot be empty",
        "string.min": "Name should have a minimum length of {#limit}",
        "string.max": "Name should have a maximum length of {#limit}",
        "string.pattern": "Name should contain alpha characters only",
      }),
    startDate: Joi.date().min("now").messages({
      "date.base": "Start date should be a valid date",
      "date.min": "Start date should be today or in the future",
    }),
    // https://stackoverflow.com/questions/76214994/should-be-a-maximum-of-30-days-between-two-dates
    endDate: Joi.date()
      .min(Joi.ref("startDate"))
      .max(
        Joi.ref("startDate", {
          adjust: (v) => v.getTime() + 5 * 24 * 60 * 60 * 1000,
        }),
      )
      .messages({
        "date.base": "End date should be a valid date",
        "date.min": "End date should be after the start date",
        "date.max":
          "End date should not be more than 5 days from the start date",
      }),
    questions: Joi.array().length(10).messages({
      "array.length":
        "Questions array should contain exactly {#limit} questions",
    }),
  });

  const { error } = quizSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      msg: error.details[0].message,
    });
  }

  next();
};

export { validatePostQuiz };
