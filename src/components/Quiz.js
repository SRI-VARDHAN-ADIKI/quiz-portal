
import React, { useState, useEffect } from 'react';
import Instructions from './Instructions';

function Quiz() {
  const defaultQuestions = [
    { id: 1, question: 'What does "JS" stand for in web development?', options: ['JavaScript', 'JavaStyle', 'JustScript', 'JQueryScript'], answer: 'JavaScript' },
    { id: 2, question: 'Which HTML tag is used to define a paragraph?', options: ['<div>', '<p>', '<span>', '<section>'], answer: '<p>' },
    { id: 3, question: 'In CSS, which property is used to change the text color?', options: ['font-size', 'color', 'background-color', 'text-align'], answer: 'color' },
    { id: 4, question: 'How do you declare a variable in JavaScript?', options: ['var', 'int', 'string', 'float'], answer: 'var' },
    { id: 5, question: 'Which HTML attribute specifies an alternate text for an image?', options: ['src', 'alt', 'title', 'href'], answer: 'alt' },
    { id: 6, question: 'In CSS, how do you select an element with the ID "header"?', options: ['.header', '#header', 'header', '*header'], answer: '#header' },
    { id: 7, question: 'What JavaScript method is used to add an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 'push()' },
    { id: 8, question: 'Which HTML tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], answer: '<a>' },
    { id: 9, question: 'In CSS, which property controls the space between elements?', options: ['padding', 'margin', 'border', 'spacing'], answer: 'margin' },
    { id: 10, question: 'What is the correct JavaScript syntax to print "Hello" to the console?', options: ['console.log("Hello")', 'print("Hello")', 'log("Hello")', 'console.print("Hello")'], answer: 'console.log("Hello")' },
  ];

  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || defaultQuestions
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(null);
  const [customTime, setCustomTime] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showScore && !showReview) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (quizStarted && timeLeft === 0 && !showScore && !showReview) {
      handleNext();
    }
  }, [timeLeft, showScore, quizStarted, showReview]);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleOptionChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(parseInt(customTime));
    } else {
      setShowReview(true);
    }
  };

  const handlePrevious = () => {
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
      setTimeLeft(parseInt(customTime));
    }
  };

  const handleSkip = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(parseInt(customTime));
    } else {
      setShowReview(true);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
    setTimeLeft(parseInt(customTime));
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowReview(false);
    setAnswers(Array(questions.length).fill(''));
    setTimeLeft(parseInt(customTime));
  };

  const handleStartQuiz = (selectedTime) => {
    setCustomTime(selectedTime);
    setTimeLeft(parseInt(selectedTime));
    setQuizStarted(true);
    setShowInstructions(false);
  };

  const handleSubmitQuiz = () => {
    const finalScore = answers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].answer ? 1 : 0);
    }, 0);
    setScore(finalScore);
    setShowReview(false);
    setShowScore(true);
  };

  const answeredCount = answers.filter((a) => a !== '').length;
  const skippedCount = answers.filter((a) => a === '').length;
  const remainingCount = questions.length - answeredCount;

  return (
    <div className="container">
      {showInstructions ? (
        <Instructions onStart={handleStartQuiz} />
      ) : (
        <div className="card">
          {showScore ? (
            <div style={{ textAlign: 'center' }}>
              <h2>Your Score: {score} / {questions.length}</h2>
              <p>Signed up on: {currentUser.signupDate || 'Not available'}</p>
              <p style={{ color: '#3498db', fontWeight: '600' }}>
                {score === questions.length ? 'Perfect Score! 🎉' : 'Great Effort!'}
              </p>
              <button onClick={handleRetake} className="button" style={{ marginTop: '20px' }}>
                Retake Quiz
              </button>
            </div>
          ) : showReview ? (
            <div style={{ textAlign: 'center' }}>
              <h2>Review Your Answers</h2>
              <ul className="review-list">
                {questions.map((q, index) => (
                  <li key={q.id}>
                    <span>{index + 1}. {q.question}</span>
                    <p>Your Answer: {answers[index] || 'Skipped'}</p>
                  </li>
                ))}
              </ul>
              <div className="button-group">
                <button onClick={() => setShowReview(false)} className="button secondary">
                  Back to Quiz
                </button>
                <button onClick={handleSubmitQuiz} className="button">
                  Submit Quiz
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2>Question {currentQuestion + 1} of {questions.length}</h2>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="question-tracker">
                {questions.map((_, index) => (
                  <span
                    key={questions[index].id}
                    className={`tracker-dot ${index === currentQuestion ? 'active' : ''} ${answers[index] ? 'answered' : ''}`}
                    onClick={() => handleJumpToQuestion(index)}
                  />
                ))}
              </div>
              <div className="question-stats">
                <p>Answered: {answeredCount} | Skipped: {skippedCount} | Remaining: {remainingCount}</p>
              </div>
              <p className="timer">Time Left: {timeLeft} seconds</p>
              <p className="question">{questions[currentQuestion].question}</p>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="option">
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="quizOption"
                      value={option}
                      checked={answers[currentQuestion] === option}
                      onChange={handleOptionChange}
                    />
                    <label htmlFor={`option${index}`}>{option}</label>
                  </div>
                ))}
              </div>
              <div className="button-group">
                <button
                  onClick={handlePrevious}
                  className="button secondary"
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button onClick={handleNext} className="button">
                  Next
                </button>
                <button onClick={handleSkip} className="button secondary">
                  Skip
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <footer className="footer">
        <p>© 2025 QuizPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Quiz;
