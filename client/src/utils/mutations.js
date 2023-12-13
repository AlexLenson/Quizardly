import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation LoginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    token
    user {
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $password: String!) {
  addUser(username: $username, password: $password) {
    user {
      _id
      username
      password
    }
    token
  }
}
`;



export const CREATE_QUIZ = gql`
mutation createQuiz($title: String!, $category: String!, $questions: [String!], $description: String) {
  createQuiz(title: $title, category: $category, questions: $questions, description: $description) {
    username
    
    quizzes {
      title
      description
      questions {
        question
      }
    }

  }
}
`;

export const CREATE_QUESTION = gql`
mutation CreateQuestion($category: String!, $type: String, $difficulty: String, $question: String!, $correctAnswer: String!, $incorrectAnswers: [String!]) {
  createQuestion(category: $category, type: $type, difficulty: $difficulty, question: $question, correct_answer: $correctAnswer, incorrect_answers: $incorrectAnswers) {
    _id
    category
    type
    difficulty
    question
    correct_answer
    incorrect_answers
  }
}
`;