const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  quizName: { type: String, required: true },
  questions: [questionSchema]
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
