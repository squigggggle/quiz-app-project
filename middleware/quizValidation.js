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
    })
}