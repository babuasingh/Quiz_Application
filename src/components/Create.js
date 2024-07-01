import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQuiz = () => {
  const Navigate = useNavigate()
  const [submit,Setsubmit] = useState(false)
  const [quizName, setQuizName] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleQuizNameChange = (e) => setQuizName(e.target.value);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = { quizName, questions };

    try {
      const response = await fetch('http://localhost:5000/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (response.ok) {
        toast.success('Quiz saved successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to save quiz', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    Setsubmit(true)
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add a New Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Quiz Name</label>
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">Question {questionIndex + 1}</label>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-2"
                required
              />
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder={`Option ${optionIndex + 1}`}
                    required
                  />
                ))}
              </div>
              <input
                type="text"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(questionIndex, 'correctAnswer', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mt-2"
                placeholder="Correct Answer"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Another Question
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Save Quiz
          </button>
          {
            submit===true ?
            <button
            onClick={()=>Navigate('/take')}
            className="w-full  mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-green-800 focus:outline-none"
          >Take Quiz</button>:''
          }
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddQuiz;
