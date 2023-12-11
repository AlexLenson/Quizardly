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
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

module.exports = typeDefs;
