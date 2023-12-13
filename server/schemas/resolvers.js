const { User, Quiz, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find();
    },
    getUser: async (parent, { userId }) => {
      return User.findById(userId).populate('quizzes');
    },
    getQuizzes: async () => {
      return Quiz.find().populate('createdBy');
    },
    getQuiz: async (parent, { quizId }) => {
      return Quiz.findById(quizId).populate('questions').populate('createdBy');
    },
    getQuestions: async () => {
      return Question.find();
    },
    getQuestion: async (parent, { questionId }) => {
      return Question.findById(questionId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    loginUser: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    createQuiz: async (parent, { title, description, questions, category }, context) => {
      try {
        
        const questionIdArray = [];

        questions.forEach(question => {
         const newQuestion = Question.create({question})
         questionIdArray.push(newQuestion._id);
        });

        const quiz = await Quiz.create({
          title,
          description,
          questionIds: questionIdArray,
          category,
          createdBy: context.user._id
        });
        const savedQuiz = await quiz.save();

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { quizzes: savedQuiz._id } },
          { new: true }
        );
        
        await user.populate({
          path: "quizzes",
          model: "Quiz",
          populate: {
            path: "questions",
            model: "Question"
          },
        });

        return user;

      } catch (error) {
        throw new Error('Could not create quiz');
      }
    },
    updateQuiz: async (parent, { quizId, title, description, questionIds }, context) => {
      try {
        // console.log(quizId, title, description, questionIds);
        const updatedQuiz = await Quiz.findOneAndUpdate(
          { _id: quizId },
          {
            $set: {
              title,
              description,
              questions: questionIds
            }
          },
          { new: true }
        );
        console.log('updated quiz', updatedQuiz);
        if (!updatedQuiz) {
          throw new Error('Quiz not found')
        };

        return updatedQuiz;
      } catch (error) {
        console.log(error);
        throw new Error('Could not update quiz');
      }
    },
    deleteQuiz: async (parent, { quizId }, context) => {
      try {

        const quiz = await Quiz.findOneAndDelete(
          { _id: quizId }
        );
        await User.findOneAndUpdate(
          { quizzes: quizId },
          { $pull: { quizzes: quizId } },
          { new: true }
        );
        return quiz;
      } catch (error) {
        throw new Error('Could not delete quiz');
      }
    },
    createQuestion: async (parent, { category, type, difficulty, question, correct_answer, incorrect_answers }, context) => {
      try {

        const newQuestion = await Question.create({
          category: category,
          type: type,
          difficulty: difficulty,
          question: question,
          correct_answer: correct_answer,
          incorrect_answers: incorrect_answers
        });

        return newQuestion;
      } catch (error) {
        throw new Error('Could not create question');
      }
    },
    updateQuestion: async (parent, { questionId, category, type, difficulty, question, correct_answer, incorrect_answers }, context) => {
      try {

        const updatedQuestion = await Question.findOneAndUpdate(
          { _id: questionId },
          { $set: {
            category: category,
            type: type,
            difficulty: difficulty,
            question: question,
            correct_answer: correct_answer,
            incorrect_answers: incorrect_answers
          }},
          { new: true }
        );
        return updatedQuestion;
      } catch (error) {
        throw new Error('Could not update question');
      }
    },
    deleteQuestion: async (parent, { questionId }, context) => {
      try {

        const question = await Question.findOneAndDelete(
          { _id: questionId }
        );
        await User.findOneAndUpdate(
          { questions: questionId },
          { $pull: { questions: questionId } },
          { new: true }
        );

        return question;
      } catch (error) {
        throw new Error('Could not delete  question');
      }
    },
  },

};

module.exports = resolvers;
