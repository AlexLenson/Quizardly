import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";

import { useState } from "react";
import { CREATE_QUIZ } from "../utils/mutations";
import Button from "@mui/material/Button";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [category, setCategory] = useState("");
  const [questionsArray, setQuestionsArray] = useState([]);
  const [CreateQuiz, { error, data }] = useMutation(CREATE_QUIZ);

  const addQuestion = (question) => {
    setQuestionsArray([...questionsArray, question]);
  };

  const handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    switch (name) {
      case "quizTitle":
        setQuizTitle(value);
        break;
      case "category":
        setCategory(value);
        break;
      default:
        setQuizDesc(value);
        break;
    }
  };

  const handleQuizButton = async () => {
    const { data } = await CreateQuiz({
      variables: {
        title: quizTitle,
        category: category,
        questions: [questionsArray],
        description: quizDesc,
      },
    });
    
    console.log(data);
  };

  console.log(questionsArray);
  return (
    <div>
      <h2>Create a Quiz</h2>
      <div className="col-9 col-lg-9 ">
        <input
          name="quizTitle"
          placeholder="Quiz Title"
          value={quizTitle}
          className=" w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleChange}
        ></input>

        <input
          name="quizDesc"
          placeholder="Quiz Description"
          value={quizDesc}
          className=" w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
          onChange={handleChange}
        ></input>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="dropDown-label">Category</InputLabel>
            <Select
              name="category"
              labelId="dropDown-label"
              id="dropDown"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value="General Knowledge">General Knowledge</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="TV/Movies">TV/Movies</MenuItem>
              <MenuItem value="Literature">Literature</MenuItem>
              <MenuItem value="Tech">Tech</MenuItem>
              <MenuItem value="Sciences">Sciences</MenuItem>
              <MenuItem value="Math">Math</MenuItem>
              <MenuItem value="Pop Cultur">Pop Culture</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Geography">Geography</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <QuestionForm addQuestion={addQuestion} quizCategory={category} />
      </div>
      <div>
        <QuestionList questions={questionsArray} />
      </div>
      <div>
        <Button onClick={handleQuizButton}>Create quiz</Button>
      </div>
    </div>
  );
};

export default CreateQuiz;
