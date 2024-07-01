import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { questions } = location.state || {};
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const questionRefs = useRef([]);
    const scoreRef = useRef(null);

    if (!questions || questions.length === 0) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-100">No questions available</div>;
    }

    const handleOptionClick = (questionIndex, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionIndex]: selectedOption,
        });

        if (questionIndex < questions.length - 1) {
            setTimeout(() => {
                questionRefs.current[questionIndex + 1].scrollIntoView({ behavior: 'smooth' });
            }, 300); // Delay to enhance transition effect
        }
    };

    const calculateScore = () => {
        let correctAnswersCount = 0;

        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                correctAnswersCount++;
            }
        });

        setScore(correctAnswersCount);

        setTimeout(() => {
            scoreRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Delay to enhance transition effect
    };

    return (
        <div className="bg-gradient-to-br from-green-200 to-blue-200 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        ref={(el) => (questionRefs.current[index] = el)}
                        className="mb-8 transition-transform transform duration-500 ease-in-out"
                    >
                        <h3 className="text-xl font-semibold mb-4">{question.questionText}</h3>
                        <ul className="space-y-2">
                            {question.options.map((option, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => handleOptionClick(index, option)}
                                        className={`w-full text-left px-4 py-3 rounded-lg focus:outline-none transition-colors duration-200 ${userAnswers[index] === option
                                            ? 'bg-green-500 text-white'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <button
                    onClick={calculateScore}
                    className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                    Submit Quiz
                </button>
                {score !== null && (
                    <div ref={scoreRef} className="mt-8 text-lg font-semibold transition-transform transform duration-500 ease-in-out">
                        Your score: {score} / {questions.length}
                        <button
                            className="block mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                            onClick={() => navigate('/take')}
                        >
                            Take Another Quiz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
