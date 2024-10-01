import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const location = useLocation();
  const skills = location.state?.skills || [];

  // Fetch quiz data from the Flask backend
  const fetchQuizData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/generate-quiz', {
        skills: "Node.js, Express.js,React.js",
      });
  
      let quizText = response.data.quiz;
      quizText = quizText.replace(/```/g, ''); // Removes any unnecessary backticks
      const parsedQuizData = JSON.parse(quizText); // Parsing the JSON string
  
      setQuizData(parsedQuizData); // Store parsed quiz data in state
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  

  useEffect(() => {
    if (skills.length > 0) {
      fetchQuizData();
    }
  }, [skills]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption('');
      } else {
        setShowScore(true);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-lg">Your Score: {score} out of {quizData.length}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setScore(0);
                setCurrentQuestionIndex(0);
                setShowScore(false);
              }}
            >
              Retake Quiz
            </button>
          </div>
        ) : quizData.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1} / {quizData.length}
            </h2>
            <h3 className="text-lg mb-6">{quizData[currentQuestionIndex].question}</h3>
            <div className="space-y-4">
              {quizData[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full px-4 py-2 text-left border rounded ${
                    selectedOption === option ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={handleNextQuestion}
              disabled={!selectedOption}
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
