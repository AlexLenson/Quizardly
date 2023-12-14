import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from 'react-router-dom';
import QuestionForm from "../components/QuestionForm";
import QuestionList from "../components/QuestionList";

import { useState } from "react";
import { CREATE_QUIZ } from "../utils/mutations";
import Button from "@mui/material/Button";


const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [category, setCategory] = useState("General");
  const [questionsArray, setQuestionsArray] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);
  const [CreateQuiz, { error, data }] = useMutation(CREATE_QUIZ);
  const [quizMade, setQuizMade] = useState(false);
  const [latestQuiz, setlatestQuiz] = useState({});

  let quizID =[];

  const addQuestion = async(question) => {
    await setQuestionsArray([...questionsArray, question]);
    console.log(questionsArray);
  };

  const IdArray =  async(questionId) => {
   await setQuestionIds([...questionIds, questionId]);
    console.log(questionIds);
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

    console.log(questionIds);
    const { data } = await CreateQuiz({
      variables: {
        title: quizTitle,
        category: category,
        description: quizDesc,
        questionIds: questionIds,
      },
    });
    
    console.log(data.createQuiz.quizzes);
    quizID = data.createQuiz.quizzes;
    console.log(quizID)
    setlatestQuiz(quizID[quizID.length-1]);  
    console.log(latestQuiz._id);
    
    setQuizMade(true);

  };

 
  return (
   <>
   <div>  
     {quizMade ? ( <div> <h2>QUIZ CREATED</h2> 
     <br />
     <p>
    <Link to={`/quiz/${latestQuiz._id}`}>Click here take it!</Link>
    </p>
     </div>) : (
      <div>
      <h2>Create a Quiz</h2>
      <div className="col-12 col-lg-12 ">
        <input
          name="quizTitle"
          placeholder="Quiz Title"
          value={quizTitle}
          className=" w-100"
          style={{ lineHeight: "1.5", resize: "vertical", margin:10, }}
          onChange={handleChange}
        ></input>

        <textarea
          name="quizDesc"
          placeholder="Quiz Description"
          value={quizDesc}
          className=" w-100"
          style={{ lineHeight: "1.5", resize: "vertical", margin:10, }}
          onChange={handleChange}
        ></textarea>

        <Box className="col-12 col-lg-4" sx={{ minWidth: 120,  padding:1,}}>
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
              <MenuItem value="General">General Knowledge</MenuItem>
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
      {quizTitle && quizDesc ? (<QuestionForm addQuestion={addQuestion} quizCategory={category}  IdArray={IdArray}/>):( <></>)}
      </div>
      <div>
        <QuestionList questions={questionsArray} />
      </div>
      <div>
    {quizTitle && quizDesc ? (<Button variant="outlined" onClick={handleQuizButton}>Create quiz</Button>):(<Button variant="contained" disabled onClick={handleQuizButton}>Create quiz</Button> )}
      </div>
      </div>)}
    </div> </>
  );
};

export default CreateQuiz;
