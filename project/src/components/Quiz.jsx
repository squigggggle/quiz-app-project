import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";

const Quiz = () => {
  const { isLoading: quizLoading, data: quizData } = useQuery({
    queryKey: ["quizData"],
    queryFn: () =>
      fetch(
        "https://s1-24-id608001-project-squigggggle.onrender.com/api/v1/quiz",
      ).then((res1) => res1.json()),
  });

  const token = localStorage.getItem('token');

  const { isLoading: userLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(
        "https://s1-24-id608001-project-squigggggle.onrender.com/api/v1/user/current",
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        },
      ).then((res2) => res2.json()),
      enabled: !!token && !quizLoading && !!quizData,
  });

  if (quizLoading) return "Loading quizzes...";
  if (userLoading) return "Loading user information..."

  return (
    <>
    {userData ? (userData.data.role == "ADMIN_USER" ? <p>you are admin woww</p> : null) : null}
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
          />
        ))
      )}
    </>
  );
};

export default Quiz;
