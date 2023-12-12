const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    difficulty: {
        type: String,
        required: false
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
    ]
});

const Question = model('Question', questionSchema);

module.exports = Question;
