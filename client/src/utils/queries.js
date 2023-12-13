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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
