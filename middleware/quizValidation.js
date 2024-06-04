import Joi from "joi";

const validatePostQuiz = (req, res, next) => {
  const quizSchema = Joi.object({
    name: Joi.string().messages({

    }),
    startDate: Joi.date().messages({

    }),
    endDate: Joi.date().messages({

    }),
    questions: Joi.array.messages({
        
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

export { validatePostQuiz };