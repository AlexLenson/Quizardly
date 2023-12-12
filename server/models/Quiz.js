const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], // Reference to an array of questions
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the quiz
    category: { type: String, required: true }
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
