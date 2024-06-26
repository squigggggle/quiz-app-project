/**
 * @file Quiz.jsx
 * @description This file contains the Quiz component, which displays quizzes and user information.
 * @author Jack Young
 */

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import QuizForm from "./forms/QuizForm";

const API_URL = import.meta.env.VITE_API_URL;

const Quiz = () => {
  const { isLoading: quizLoading, data: quizData } = useQuery({
    queryKey: ["quizData"],
    queryFn: () => fetch(`${API_URL}/api/v1/quiz`).then((res) => res.json()),
  });

  const { isLoading: userLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`${API_URL}/api/v1/user/current`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
    enabled: !!`${localStorage.getItem("token")}` && !quizLoading && !!quizData,
  });

  if (quizLoading) return "Loading quizzes...";
  if (userLoading) return "Loading user information...";

  return (
    <>
      {userData?.data ? (
        userData.data.role == "ADMIN_USER" ? (
          <QuizForm />
        ) : null
      ) : userData?.msg === "No token provided" ? null : (
        <p>{userData.msg}</p>
      )}
      {quizData.msg ? (
        <div>{quizData.msg}</div>
      ) : (
        quizData.data.map((quiz) => (
          <QuizCard
            key={quiz.id}
            name={quiz.name}
            difficulty={quiz.difficulty}
            type={quiz.type}
            startdate={quiz.startDate}
            enddate={quiz.endDate}
            category={quiz.category.name}
          />
        ))
      )}
    </>
  );
};

export default Quiz;
