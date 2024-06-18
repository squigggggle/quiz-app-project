import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

const createQuiz = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json",
      });
    }
    
    const { categoryId, name, type, difficulty, startDate, endDate } = req.body;

    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    /**
     * If the authenticated user is not an admin, they can
     * not create a new quiz
     */
    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    let quizJson = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=${type}&difficulty=${difficulty}`);
    let quizData = quizJson.data.results;
    let quizArray = Array.isArray(quizData) ? quizData : [];
   
    const questions = [];
    quizArray.forEach((quiz) => {
      questions.push({
        question: quiz.question,
        correctAnswer: quiz.correct_answer,
        incorrectAnswers: quiz.incorrect_answers,
      });
    });

    await prisma.quiz.create({
      data: {
        categoryId: Number(categoryId),
        difficulty,
        name,
        type,
        startDate,
        endDate,
        questions: {
          create: questions.map((question) => {
            return {
              question: question.question,
              correctAnswer: question.correctAnswer,
              incorrectAnswers: question.incorrectAnswers,
            };
          }),
        },
      },
    })

    const newQuizzes = await prisma.quiz.findMany({});

    return res.status(201).json({
      msg: "Quiz successfully created",
      data: newQuizzes,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include:{
        questions:true
      }
    });

    if (quizzes.length === 0) {
      return res.status(404).json({ msg: "No quizzes found" });
    }

    return res.json({ data: quizzes });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        questions:true
      }
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ msg: `No quiz with the id: ${req.params.id} found` });
    }

    return res.json({
      data: quiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || contentType !== "application/json") {
      return res.status(400).json({
        msg: "Invalid Content-Type. Expected application/json.",
      });
    }

    let quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ msg: `No quiz with the id: ${req.params.id} found` });
    }

    quiz = await prisma.quiz.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Quiz with the id: ${req.params.id} successfully updated`,
      data: quiz,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await prisma.user.findUnique({ where: { id: id } });

    /**
     * If the authenticated user is not an admin, they can
     * not delete a record
     */
    if (user.role !== "ADMIN_USER") {
      return res.status(403).json({
        msg: "Not authorized to access this route",
      });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ msg: `No quiz with the id: ${req.params.id} found` });
    }

    await prisma.quiz.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Quiz with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz,
};