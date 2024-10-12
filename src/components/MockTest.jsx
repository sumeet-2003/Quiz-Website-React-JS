import React, { useState, useEffect } from 'react';
import Timer from './Timer';  // Timer component for countdown

const MockTest = () => {
  const [questions, setQuestions] = useState([]);  // Holds all the questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Tracks current question
  const [selectedAnswers, setSelectedAnswers] = useState({});  // Stores selected answers
  const [testName, setTestName] = useState('');  // Name of the test
  const [showResults, setShowResults] = useState(false);  // Flag to toggle between test and results
  const [score, setScore] = useState(0);  // Calculated score

  // Fetch questions from the local JSON file
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setTestName(data.testName);
      });
  }, []);

  // Store the selected answer for the current question
  const handleAnswerSelection = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  // Calculate and display the score
  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);  // Toggle to show the result section
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {/* Show Results after submission */}
      {showResults ? (
        <div>
          <h1>Your Score: {score} / {questions.length}</h1>
          <button onClick={() => window.location.reload()}>Restart Test</button>  {/* Refreshes the page to restart */}
        </div>
      ) : (
        <div>
          <h1>{testName}</h1>

          {/* Show current question and options */}
          {currentQuestion ? (
            <div>
              <p className='quest'>Question {currentQuestionIndex + 1}: {currentQuestion.question}</p>
              <ul>
                {currentQuestion.options.map((option, index) => (
                  <li key={index}>
                    <button onClick={() => handleAnswerSelection(currentQuestion.id, option)}>
                      {option}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Next or Submit button */}
              {currentQuestionIndex < questions.length - 1 ? (
                <button style={{border: "2px solid cyan", marginLeft:"7rem"}} onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                  Next
                </button>
              ) : (
                <button style={{border: "2px solid cyan",marginLeft:"5rem"}} onClick={handleSubmit}>Submit Test</button>
              )}
            </div>
          ) : (
            <p>Loading questions...</p>
          )}

          {/* Timer component */}
          <Timer />
        </div>
      )}
    </div>
  );
};

export default MockTest;
