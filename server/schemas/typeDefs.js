const typeDefs = `
  type User {
    _id: ID
    username: String!
    password: String!
    score: Int
    quizzes: [Quiz]
  }

  type Quiz {
    _id: ID!
    title: String!
    description: String
    questions: [Question]!
    createdBy: User!
    category: String!
  }

  type Question {
    _id: ID
    category: String!
    type: String
    difficulty: String
    question: String!
    correct_answer: String!
    incorrect_answers: [String!]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUser(userId: ID!): User
    getQuizzes: [Quiz]
    getQuiz(quizId: ID!): Quiz
    getQuestions: [Question]
    getQuestion(questionId: ID!): Question
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
    createQuiz(title: String!, description: String, category: String!, questionIds: [ID!]): User
    updateQuiz(quizId: ID!, title: String!, description: String!, questionIds: [ID!]): Quiz
    deleteQuiz(quizId: ID!): Quiz
    createQuestion(category: String!, type: String, difficulty: String, question: String!, correct_answer: String!, incorrect_answers: [String!]): Question
    updateQuestion(questionId: ID!, category: String, type: String, difficulty: String, question: String, correct_answer: String, incorrect_answers: [String!]): Question
    deleteQuestion(questionId: ID!): Question
  }
`;

module.exports = typeDefs;
