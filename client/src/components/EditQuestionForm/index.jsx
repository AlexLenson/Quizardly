import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@mui/material/Button";
import { CREATE_QUESTION, UPDATE_QUESTION } from "../../utils/mutations";

import Auth from "../../utils/auth";

const EditQuestionForm = ({replaceAtIndex ,questionId, setNewObject,index,setEditingQuestion }) => {
    const [questionText, setQuestionText] = useState("");
    const [correctText, setCorrect] = useState("");
    const [incorrect1Text, setIncorrect1] = useState("");
    const [incorrect2Text, setIncorrect2] = useState("");
    const [incorrect3Text, setIncorrect3] = useState("");

    const [UpdateQuestion, { error }] = useMutation(UPDATE_QUESTION);

    const handleFormSubmit = async (event) => {
        const formData = {
            question: questionText,
            correct_answer: correctText,
            incorrect_answers: [incorrect1Text, incorrect2Text, incorrect3Text],
        };

        setNewObject(formData);
        replaceAtIndex(index);

        event.preventDefault();

        try {
            const { data } = await UpdateQuestion({
                variables: {
                    questionId: questionId,
                    question: questionText,
                    correctAnswer: correctText,
                    incorrectAnswers: [incorrect1Text, incorrect2Text, incorrect3Text],
                },
            });


            setEditingQuestion(false)
            console.log(data.updateQuestion._id);
            setQuestionText("");
            setCorrect("");
            setIncorrect1("");
            setIncorrect2("");
            setIncorrect3("");
        } catch (err) {
            console.error(err);
        }
    };

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

    // Update a question

    const [updateQuestion] = useMutation(UPDATE_QUESTION);

    // Function to handle editing an existing question
    const handleEditQuestion = async () => {
        try {
            // Construct the updated question data
            const updatedQuestionData = {
                questionId: questionIdToUpdate,
                category: updatedCategory,
                // Other updated fields...
            };

            // Trigger the UPDATE_QUESTION mutation
            const { data } = await updateQuestion({
                variables: updatedQuestionData,
            });

            // Handle any additional logic after successfully updating the question
        } catch (error) {
            // Handle errors
            console.error(error);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <h4>Edit a Question</h4>
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
                            <Button variant="outlined" type="submit">
                                Edit Question
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

export default EditQuestionForm;
