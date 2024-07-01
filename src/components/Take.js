import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Take = () => {
  const navigate = useNavigate();
  const [quizNames, setQuizNames] = useState([]);

  useEffect(() => {
    const fetchQuizNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/quiz');
        if (!response.ok) {
          throw new Error('Failed to fetch quiz names');
        }
        const data = await response.json();
        setQuizNames(data.map(quiz => quiz.quizName));
      } catch (error) {
        console.error('Error fetching quiz names:', error);
      }
    };

    fetchQuizNames();
  }, []);

  const handleClick = async (quizname) => {
    const response = await fetch(`http://localhost:5000/quiz/${quizname}`);
    const questions = await response.json();
    console.log(questions);
    navigate('/quiz', { state: { questions } });
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Available Quizzes</h2>
        <ul className="divide-y divide-gray-300">
          {quizNames.map((quizName, index) => (
            <li key={index} className="py-4">
              <button
                className="block w-full text-left text-blue-600 font-semibold py-2 px-4 rounded transition-all duration-200 hover:bg-blue-100 hover:text-blue-800 focus:outline-none"
                onClick={() => handleClick(quizName)}
              >
                {quizName}
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Home Page
        </button>
      </div>
    </div>
  );
};

export default Take;
