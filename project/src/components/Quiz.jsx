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

  const [querySucceeded, setQuerySucceeded] = useState(false);

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
      ).then((res2) => {
        if (!res2.ok) {
          // Check if response indicates token expired or invalid
          if (res2.status === 401) {
            // Clear token from localStorage
            localStorage.removeItem("token");
          }
          throw new Error('Failed to fetch user data');
        }
        return res2.json();
      }),
      enabled: !!token && !quizLoading && !!quizData,
  });

  useEffect(() => {
    // Check if userData is defined and not loading to determine success
    if (!userLoading && userData) {
      setQuerySucceeded(true);
    }
  }, [userLoading, userData]);


  if (quizLoading) return "Loading quizzes...";
  if (userLoading) return "Loading user information..."

  return (
    <>
    {querySucceeded ? (userData.data.role == "ADMIN_USER" ? <p>you are admin woww</p> : null) : null}
      {/* {userData ? (userData.data.role == "ADMIN_USER" ? <p>you are admin woww</p> : null) : null} */}
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
