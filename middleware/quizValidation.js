import Joi from "joi";

const validatePostQuiz = (req, res, next) => {
  const quizSchema = Joi.object({
    name: Joi.string().min(5).max(30).pattern(/^[a-zA-Z]+$/).messages({
        "string.base":"Name should be a string",
        "string.empty":"Name cannot be empty",
        "string.min":"Name should have a minimum length of {#limit}",
        "string.max":"Name should have a maximum length of {#limit}",
        "string.pattern":"Name should contain alpha characters only",
    }),
    startDate: Joi.date().messages({

    }),
    endDate: Joi.date().messages({

    }),
    questions: Joi.array().length(10).messages({

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