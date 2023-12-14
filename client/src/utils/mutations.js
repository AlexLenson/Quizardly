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
mutation CreateQuiz($title: String!, $category: String!, $description: String, $questionIds: [ID!]) {
  createQuiz(title: $title, category: $category, description: $description, questionIds: $questionIds) {
    quizzes {
      _id
      title
      description
      category
      questions {
        _id
        question
        correct_answer
        incorrect_answers
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