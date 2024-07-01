import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-blue-200">
            <h1 className="text-4xl font-bold text-green-800 mb-8">Welcome to the Quiz App</h1>
            <Link to="/create">
                <button className="bg-green-500 text-white py-2 px-6 rounded-lg mb-4 shadow-lg transform transition-transform hover:scale-105 hover:bg-green-600 focus:outline-none">
                    Create a Quiz
                </button>
            </Link>
            <Link to="/take">
                <button className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none">
                    Take a Quiz
                </button>
            </Link>
        </div>
    );
};

export default Home;
