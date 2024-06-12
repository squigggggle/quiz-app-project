import express from "express";
import authRouteMiddleware from "../../middleware/authRoute.js";
import { validatePostQuiz } from "../../middleware/quizValidation.js";

import {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
} from "../../controllers/v1/quiz.js";

const router = express.Router();

router.post("/", authRouteMiddleware, validatePostQuiz, createQuiz)
router.get("/", getQuizzes);
router.get("/:id", getQuiz);
router.put("/:id", authRouteMiddleware, updateQuiz);
router.delete("/:id", authRouteMiddleware, deleteQuiz);

export default router;
