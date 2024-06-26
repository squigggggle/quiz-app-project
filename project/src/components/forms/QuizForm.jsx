/**
 * @file QuizForm.jsx
 * @description This file contains the implementation of the QuizForm component.
 * @author Jack Young
 */

import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const QuizForm = () => {
  const { isLoading: categoryLoading, data: categoryData } = useQuery({
    queryKey: ["categoryData"],
    queryFn: () =>
      fetch(`${API_URL}/api/v1/categories`).then((res) => res.json()),
  });

  const quizForm = useForm();

  const { mutate: postQuizMutation, data: quizData } = useMutation({
    mutationFn: (quiz) =>
      fetch(`${API_URL}/api/v1/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          categoryId: quiz.categoryId,
          name: quiz.name,
          difficulty: quiz.difficulty,
          type: quiz.type,
          startDate: quiz.startDate,
          endDate: quiz.endDate,
        }),
      }).then((res) => {
        if (res.status === 200) {
          quizForm.reset((formValues) => ({
            ...formValues,
            categoryId: 0,
            name: "",
            difficulty: "",
            type: "",
            startDate: "",
            endDate: "",
          }));
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("quizData");
    },
  });

  const handleQuizSubmit = (values) => {
    const startDate = new Date(values.startDate).toISOString();
    const endDate = new Date(values.endDate).toISOString();
    postQuizMutation({ ...values, startDate, endDate });
  };

  const today = new Date().toISOString().slice(0, 16);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);
  const maxDateString = maxDate.toISOString().slice(0, 16);

  if (categoryLoading) return "Loading categories...";

  return (
    <>
      <h2>Create Quiz</h2>
      <form onSubmit={quizForm.handleSubmit(handleQuizSubmit)}>
        <label htmlFor="quiz-categoryId">Category</label>
        <select
          id="quiz-categoryId"
          name="categoryId"
          {...quizForm.register("categoryId")}
        >
          {categoryData.data.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="quiz-name">Quiz Name</label>
        <input
          type="text"
          id="quiz-name"
          name="name"
          {...quizForm.register("name")}
        />
        <label htmlFor="quiz-difficulty">Difficulty</label>
        <select
          id="quiz-difficulty"
          name="difficulty"
          {...quizForm.register("difficulty")}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="quiz-type">Type</label>
        <select id="quiz-type" name="type" {...quizForm.register("type")}>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
        <label htmlFor="quiz-startDate">Start Date</label>
        <input
          type="datetime-local"
          id="quiz-startDate"
          {...quizForm.register("startDate")}
          min={today.replace("Z", "")}
          max={maxDateString.replace("Z", "")}
        />
        <label htmlFor="quiz-endDate">End Date</label>
        <input
          type="datetime-local"
          id="quiz-endDate"
          {...quizForm.register("endDate")}
          min={today.replace("Z", "")}
          max={maxDateString.replace("Z", "")}
        />
        <button type="submit">Create Quiz</button>
      </form>
      <p>{quizData?.msg}</p>
    </>
  );
};

export default QuizForm;
