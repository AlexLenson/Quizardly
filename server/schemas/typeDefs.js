const typeDefs = `
  type User {
    _id: ID
    name: String!
    password: String!
    score: Int
    quiz: [Quiz]
    question: [Question]
  }

  type Quiz {
    _id: ID
    user: User
    name: String
  }

  type Question {
    _id: ID
    category: String!
    type: String
    difficulty: String
    question: String!
    correct_answer: String!
    incorrect_answers: String!
    quiz: [Quiz]
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUserByID(userID: ID!): User
    getQuizzes: [Quiz]
    getQuizByID(quizID: ID!): Quiz
    getQuestions: [Question]
    getQuestionByID(questionID: ID!): Question
    me: User
  }

  type Mutation {
    addUser(name: String!, password: String!): Auth
    loginUser(name: String!, password: String!): Auth
    createQuiz(userID: ID!, name: String!): Quiz
    updateQuiz(quizID: ID!, name: String!): Quiz
    deleteQuiz(quizID: ID!): Quiz
    createQuestion(category: String!, type: String, difficulty: String, question: String!, correct_answer: String!, incorrect_answers: [String!]): Question
    updateQuestion(questionId: ID!, category: String, type: String, difficulty: String, question: String, correct_answer: String, incorrect_answers: [String!]): Question
    deleteQuestion(questionId: ID!): Question
  }
`;

module.exports = typeDefs;
