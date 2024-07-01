const express = require('express')
const router = express.Router()
const Quiz = require('./QuizModel')


router.post('/', async (req, res, next) => {
    const { quizName, questions } = req.body;

    try {
        let quiz = await Quiz.findOne({ quizName });

        if (!quiz) {
            quiz = new Quiz({ quizName, questions });
        } else {
            const existingQuestions = quiz.questions;
            const newQuestions = questions.filter(newQuestion =>
                !existingQuestions.some(existingQuestion =>
                    existingQuestion.questionText === newQuestion.questionText
                )
            );
            quiz.questions = [...existingQuestions, ...newQuestions];
        }

        const result = await quiz.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', async (req, res, next) => {
    const result = await Quiz.find()
    res.send(result)
})


router.get('/:quizName', async (req, res, next) => {
    const questions = await Quiz.findOne({ "quizName": req.params.quizName })

    res.send(questions.questions)
})


module.exports = router