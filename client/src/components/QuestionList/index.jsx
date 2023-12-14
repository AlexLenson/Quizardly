import React, { useState } from 'react';
import EditQuestionForm from '../EditQuestionForm/index';
import { useQuery } from "@apollo/client";

const QuestionList = ({ questions = [], questionIds = [] ,setQuestionsArray}) => {
  const [editingQuestion, setEditingQuestion] = useState(false);
  const [newObject, setNewObject] = useState({});


  const handleEditClick = () => {
    setEditingQuestion(true);
  };

  if (!questions.length) {
    return <h3>No Questions Created Yet</h3>;
  }

  let newQuestions = [...questions] 


console.log("original",newQuestions);

const replaceAtIndex = (index) =>{
console.log("before replace",newQuestions[index]);

newQuestions[index]= newObject;


console.log("replaced index",newQuestions[index]);
setQuestionsArray(newQuestions)
}

  console.log(newQuestions);

  return (
    <>
      <h3 className="p-5 display-inline-block" style={{ borderBottom: '1px dotted #1a1a1a' }}>
        Questions
      </h3>
      <div className="flex-row my-4">



        {questions.map((question, index) => (
          <div key={index} className="col-12 mb-3 pb-3">
            <div className="p-3 bg-dark text-light">
              {editingQuestion === true ? (
                <EditQuestionForm
                replaceAtIndex={replaceAtIndex}
                  questionId={questionIds[index]}
                  setNewObject={setNewObject}
                  index={index}
                  setEditingQuestion={setEditingQuestion}
                />
              ) : (
                <>
                  <h5 className="card-header">{question.question}</h5>
                  <p className="card-body">{question.correct_answer}</p>
                  <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                  <button className="delete-btn">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default QuestionList;
// <>
    //   <h3 className="p-5 display-inline-block" style={{ borderBottom: "1px dotted #1a1a1a" }}>
    //     Questions
    //   </h3>
    //   <div className="flex-row my-4">
    //     {questions &&
    //       questions.map((question, index) => (
    //         <div key={index} className="col-12 mb-3 pb-3">
    //           <div className="p-3 bg-dark text-light">
    //             <h5 className="card-header">{question.question}</h5>
    //             <p className="card-body">{question.correct_answer}</p>
    //           </div>
    //         </div>
    //       ))}
    //   </div>
    // </>

  //   <TableContainer component={Paper}  sx={{ minWidth: 650, margin:2}}>
  //   <Table sx={{ minWidth: 650, marginTop:2}} aria-label="simple table">
  //     <TableHead>
  //       <TableRow>
  //         <TableCell>Question</TableCell>
  //         <TableCell align="left">Answer</TableCell>
  //         <TableCell align="center">Choices</TableCell>
  //         <TableCell align="right"></TableCell>
  //         <TableCell align="right"></TableCell>
  //       </TableRow>
  //     </TableHead>
  //     <TableBody>
  //       {questions.map((question) => (
  //         <TableRow
  //           key={question.question}
  //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //         >
  //           <TableCell component="th" scope="row">
  //             {question.question}
  //           </TableCell>
  //           <TableCell align="left">{question.correct_answer}</TableCell>
  //           <TableCell align="center">{question.incorrect_answers[0]}</TableCell>
  //           <TableCell align="center">{question.incorrect_answers[1]}</TableCell>
  //           <TableCell align="right">{question.incorrect_answers[2]}</TableCell>
  //         </TableRow>
  //       ))}
  //     </TableBody>
  //   </Table>
  // </TableContainer>
  // {editState ? (<input></input>) : ()}