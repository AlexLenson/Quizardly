import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { CREATE_QUESTION } from "../../utils/mutations";

import Auth from "../../utils/auth"

const QuestionForm = (addQuestion, category) => {
  const [questionText, setQuestionText] = useState("");
  const [correctText, setCorrect] = useState("");
  const [incorrect1Text, setIncorrect1] = useState("");
  const [incorrect2Text, setIncorrect2] = useState("");
  const [incorrect3Text, setIncorrect3] = useState("");

  const [createQuestion, { error, data }] = useMutation(CREATE_QUESTION);


  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      addQuestion({
        question: questionText,
        correct_answer: correctText,
        incorrect_answers: [incorrect1Text, incorrect2Text, incorrect3Text],
        category: category
      });

      setQuestionText("");
      setCorrect("");
      setIncorrect1("");
      setIncorrect2("");
      setIncorrect3("");

    } catch (err) {
      console.error(err);
    }
  }


// Update quiz with question

const handleChange = (event) => {
  const { name, value } = event.target;

  switch (name) {
    case "questionText":
      setQuestionText(value);

      break;
    case "correct":
      setCorrect(value);

      break;
    case "incorrect1":
      setIncorrect1(value);

      break;

    case "incorrect2":
      setIncorrect2(value);

      break;
    default:
      setIncorrect3(value);
      break;
  }
};

return (
  <div>
    {!Auth.loggedIn() ? (
      <>
        <h4>Create A Question</h4>
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          {/* the actual question entry */}
          <div className="col-12 col-lg-12">
            <textarea
              name="questionText"
              placeholder="What do you want to ask?"
              value={questionText}
              className="form-input w-100"
              style={{ lineHeight: "1.5", resize: "vertical" }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>{/* Radial buttons to choose between True/False or Multiple Choice */}</div>

          <div className="col-12 col-lg-12">
            <h5>What are the answers?{"(Enter the correct answer first)"} </h5>
            <ul>
              {/* correct answer */}
              <li>
                <div className="col-12 col-lg-12">
                  <input
                    name="correct"
                    placeholder="Enter the RIGHT answer here!"
                    value={correctText}
                    className="form-input w-100"
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={handleChange}
                  ></input>
                </div>
              </li>
              {/* incorrect answer (display 1 or 3 entry boxes) */}
              <li>
                <div className="col-12 col-lg-12">
                  <input
                    name="incorrect1"
                    placeholder="Enter a WRONG answer here!"
                    value={incorrect1Text}
                    className="form-input w-100"
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={handleChange}
                  ></input>
                </div>
              </li>
              <li>
                <div className="col-12 col-lg-12">
                  <input
                    name="incorrect2"
                    placeholder="Enter a WRONG answer here!"
                    value={incorrect2Text}
                    className="form-input w-100"
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={handleChange}
                  ></input>
                </div>
              </li>
              <li>
                <div className="col-12 col-lg-12">
                  <input
                    name="incorrect3"
                    placeholder="Enter a WRONG answer here!"
                    value={incorrect3Text}
                    className="form-input w-100"
                    style={{ lineHeight: "1.5", resize: "vertical" }}
                    onChange={handleChange}
                  ></input>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-12 col-lg-3">
            <Button
              variant="outlined"
              type="submit"
            >
              Create Question
            </Button>

          </div>
        </form>
      </>
    ) : (
      <p>
        You need to be logged in to to Create a Quiz. Please <Link to="/login">login</Link> or{" "}
        <Link to="/signup">signup.</Link>
      </p>
    )}
  </div>
);
};


export default QuestionForm;
