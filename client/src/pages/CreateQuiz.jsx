import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import QuestionForm from "../components/QuestionForm";

import { useState } from "react";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [catagory, setCatagory] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
   
    switch (name) {
        case "questionText":
    
  
          break;
        case "correct":
        
  
          break;
        case "incorrect1":
          
  
          break;
  
        case "incorrect2":
        
  
          break;
        default:
        
          break;}
  };

  return (
    <div>
        <h2>Create a Quiz</h2>
      <div className="col-9 col-lg-9 ">
        <input
          name="title"
          placeholder="Quiz Title"
          value={quizTitle}
          className=" w-100"
          style={{ lineHeight: "1.5", resize: "vertical" }}
        ></input>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="dropDown-label">Category</InputLabel>
            <Select
              labelId="dropDown-label"
              id="dropDown"
              value={catagory}
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
      <QuestionForm />
    </div>
  );
};

export default CreateQuiz;
