import { useQuery } from "@tanstack/react-query";
import QuizCard from "./QuizCard";

const Quiz = () => {
  const { isLoading, data: quizData } = useQuery({
    queryKey: ["quizData"],
    queryFn: () =>
      fetch(
        "https://s1-24-id608001-project-squigggggle.onrender.com/api/v1/quiz",
      ).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  return (
    <>
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
