import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_QUESTION } from "../../utils/mutations";

import Auth from "../../utils/auth";
import auth from "../../utils/auth";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [correctText, setCorrect] = useState("");
  const [incorrect1Text, setIncorrect1] = useState("");
  const [incorrect2Text, setIncorrect2] = useState("");
  const [incorrect3Text, setIncorrect3] = useState("");

  const [createQuestion, { error }] = useMutation(ADD_QUESTION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createQuestion({
        variables: {
          c,
          commentText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username
          commentAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });
      setQuestionText("");
      setCorrect("");
      setIncorrect1("");
      setIncorrect2("");
      setIncorrect3("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "questionText" && value.length <= 280) {
      setQuestionText(value);
    
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
                placeholder="What do you want to"
                value={questionText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>{/* Radial buttons to choose between True/False or Multiple Choice */}</div>

            <div className="col-12 col-lg-12">
              <ul>
                {/* correct answer */}
                <li>
                  <div className="col-12 col-lg-12">
                    <input
                      name="correct"
                      placeholder="Add the Right Answer here"
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
                      placeholder="Add a wrong answer here"
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
                      placeholder="Add a wrong answer here"
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
                      placeholder="Add a wrong answer here"
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
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create
              </button>
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
