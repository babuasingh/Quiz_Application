import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Create from './components/Create';
import Take from './components/Take';
import Home from './components/Home';
import QuizQuestions from './components/QuizQuestions';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/take" element={<Take />} />
          <Route path="/quiz" element={<QuizQuestions />} />
        </Routes>
    </Router>
  );
}

export default App;
