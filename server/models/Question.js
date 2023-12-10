const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    incorrect_answers: [
        {
            type: String,
            required: true
        }
    ],
    quiz: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Quiz'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Question = model('Question', questionSchema);

module.exports = Question;
