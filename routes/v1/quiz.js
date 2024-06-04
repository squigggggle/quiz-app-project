import express from "express";

import {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
} from "../../controllers/v1/quiz.js";

const router = express.Router();

router.post("/", createQuiz)
router.get("/", getQuiz);
router.get("/:id", getQuizzes);
router.put("/:id", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
