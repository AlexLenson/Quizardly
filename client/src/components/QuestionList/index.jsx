import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const QuestionList = ({ questions = [] }) => {
  if (!questions.length) {
    return <h3>No Questions Created Yet</h3>;
  }
  
  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginTop:2}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell align="left">Answer</TableCell>
            <TableCell align="center">Choices</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((question) => (
            <TableRow
              key={question.question}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {question.question}
              </TableCell>
              <TableCell align="left">{question.correct_answer}</TableCell>
              <TableCell align="center">{question.incorrect_answers[0]}</TableCell>
              <TableCell align="center">{question.incorrect_answers[1]}</TableCell>
              <TableCell align="right">{question.incorrect_answers[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
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