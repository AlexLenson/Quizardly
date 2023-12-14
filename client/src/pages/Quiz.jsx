// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_QUIZ } from "../utils/queries";
import { useState } from "react";
import { Margin } from "@mui/icons-material";
import Button from "@mui/material/Button";


const Quiz = () => {
  // Use `useParams()` to retrieve value of the route parameter `:quizId`
  const { quizId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { loading, data } = useQuery(QUERY_SINGLE_QUIZ, {
    // pass URL parameter
    variables: { quizId: quizId },
  });
  

  const quiz = data?.getQuiz || {};
  const questionArray = quiz?.questions || [];
   console.log(quiz);


  if (data && data.getQuiz) {

    if (questionArray.length > 0) {
      console.log(questionArray[currentQuestion].question);
      console.log(quiz.title)
      console.log(quiz);
    } else {
      console.log("No questions found in the quiz.");
    }
  } else if (loading) {
    console.log("Loading..."); // Indicates that data is being fetched
  } else {
    console.log("Error fetching quiz data."); // Handle error fetching data
  }

  // generate an array that randomizes the order of the answers based off the index of the current question
  const multipleChoice = (index) => {
    //take the correct answers and push it into the incorrect answers array to create the choices array
    const correct_answer = questionArray[index].correct_answer;
    const choices = questionArray[index].incorrect_answers;
    const newArray= [...choices,correct_answer]


      const shuffledArray = [...newArray];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      console.log(shuffledArray);
      return shuffledArray;
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
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container mt-5 p-2" style={{ 
            border: "2px solid #1a1a1a",
            top: '20%',
            'border-radius': 8,
            
            }}>
      {loading ? ( // Check if data is still loading
      <p>Loading...</p>
    ) :showScore ? (
        <div className="result-container" >
          <h2>Your Score: {score}</h2>
            <h3>This quiz was made by: <a href={`../profile/${quiz.createdBy._id}`}>{quiz.createdBy.username}</a></h3>
        </div>
      ) : (
        <div className="my-3" style={{
          fontFamily: 'Helvetica',
        }}>
          {quiz && quiz.title ? ( // Check if quiz and its title exist
          <h3 className="card-header bg-dark text-white p-5 m-0 " style={{fontSize: "2.5rem", 'border-radius': 8,}} >{quiz.title}</h3>
        ) : (
          <p>No quiz title available</p>
        )}
          <div className=" py-4">
            <blockquote
              className="p-4"
              style={{
                fontSize: "2.5rem",
                fontStyle: "italic",
                border: "2px solid #1a1a1a",
                lineHeight: 1.5,
                'border-radius': 8,
              }}
            >
              {quiz.questions[currentQuestion].question}
            </blockquote>
          </div>
          <div className="m-3 p-4" style={{ 
            border: "2px solid #1a1a1a",
            'border-radius': 8,
            }}>
            <ul>
              {multipleChoice(currentQuestion).map((answer, index) => (
                <li key={index} style={{
                  'margin':15,
                  'list-style': 'none'}}>
                  <button key={index} style={{
                    fontSize: "2rem",
                    'border-radius': 8,
                    'justify': 'center',
                    'width': 150,
                    'height': 60,
                    'border': '2px solid blue',
                    'padding': 10,
                    'margin': 10}} 
                    onClick={() => handleAnswerClick(answer, currentQuestion)}
                >{answer}
                </button></li>
                    
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
