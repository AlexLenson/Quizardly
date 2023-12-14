import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query GetUser($userId: ID!) {
  getUser(userId: $userId) {
    _id
    username
    password
    score
    quizzes {
      _id
      title
      description
      questions {
        _id
      }
      createdBy {
        _id
      }
      category
    }
  }
}
`;

export const QUERY_SINGLE_QUIZ = gql`
query GetQuiz($quizId: ID!) {
  getQuiz(quizId: $quizId) {
    _id
    title
    description
    questions {
      question
      correct_answer
      incorrect_answers
    }
    createdBy {
      _id
      username
    }
  }
}
`;
export const QUERY_SINGLE_QUESTION = gql`
query GetQuestion($questionId: ID!) {
  getQuestion(questionId: $questionId) {
    _id
    question
    correct_answer
    incorrect_answers
  }
}
`;

export const QUERY_ME = gql`
query Me {
    me {
      username
      _id
      quizzes {
        title
        _id
        category
        description
      }
    }
  }
`;

export const QUERY_USERS = gql`
query GetUsers {
  getUsers {
    _id
    username
    quizzes {
      _id
      title
      category
    }
  }
}`;


export const QUERY_QUIZZES = gql`
query GetQuizzes {
  getQuizzes {
    title
    _id
    category
    createdBy {
      _id
      username
    }
  }
}`;