// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_QUIZ } from "../utils/queries";
import { useState } from "react";

const Quiz = () => {
  // Use `useParams()` to retrieve value of the route parameter `:quizId`
  const { quizId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_QUIZ, {
    // pass URL parameter
    variables: { quizId: quizId },
  });

  const quiz = data?.quiz || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);



  // generate an array that randomizes the order of the answers based off the index of the current question
  const multipleChoice = (index) => {
    //take the correct answers and push it into the incorrect answers array to create the choices array
    const correct_answer = quiz.questions[index].correct_answer;
    const choices = quiz.questions[index].incorrect_answers.push(correct_answer);

    //shuffle array function
    const shuffleArray = async (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    //shuffle choices
    const shuffledAnswers = shuffleArray(choices);
    return shuffledAnswers;
  };

  //On choice click, check the selected answer agains the questions correct answer. Then go to the next question.
  const handleAnswerClick = (selectedAnswer, index) => {
    if (selectedAnswer == quiz.questions[index].correct_answer) {
      const scoreUp = score + 1;
      setScore(scoreUp);
    }
    NextQuestion();
  };

  const NextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="result-container">
          <h2>
            Your Score: {score} 
          </h2>
        </div>
      ) : (
        <div className="my-3">
          <h3 className="card-header bg-dark text-light p-2 m-0">{quiz.title}</h3>
          <div className="bg-light py-4">
            <blockquote
              className="p-4"
              style={{
                fontSize: "1.5rem",
                fontStyle: "italic",
                border: "2px dotted #1a1a1a",
                lineHeight: "1.5",
              }}
            >
              {quiz.questions.question}
            </blockquote>
          </div>
          <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
            <ul>
              {multipleChoice(currentQuestion).map((answer, index) => (
                <button key={index} onClick={()=> handleAnswerClick(answer, currentQuestion)}><li key={index}>{answer}</li></button>
              ))} 
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;