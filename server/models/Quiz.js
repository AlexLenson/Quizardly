const { Schema, model } = require('mongoose');

const quizSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ],
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
