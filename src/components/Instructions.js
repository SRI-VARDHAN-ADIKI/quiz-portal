
import React, { useState } from 'react';

function Instructions({ onStart }) {
  const [customTime, setCustomTime] = useState('');

  const handleStart = () => {
    if (customTime && parseInt(customTime) > 0) {
      onStart(customTime);
    } else {
      alert('Please enter a valid time in seconds (greater than 0).');
    }
  };

  return (
    <div className="card">
      <h2>Quiz Instructions</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Welcome to the Web Basics Quiz! Please read the instructions below:
      </p>
      <ul className="instructions-list">
        <li>You’ll have a set time per question, which you can choose below.</li>
        <li>Answer by selecting an option, or skip if unsure.</li>
        <li>You can navigate between questions before submitting.</li>
        <li>Review your answers at the end before final submission.</li>
      </ul>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ marginBottom: '10px' }}>
          Set the time per question (in seconds):
        </p>
        <input
          type="number"
          value={customTime}
          onChange={(e) => setCustomTime(e.target.value)}
          placeholder="e.g., 30"
          className="input-group"
          style={{ display: 'inline-block', width: '100px', marginBottom: '20px' }}
          min="1"
        />
        <br />
        <button onClick={handleStart} className="button">
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Instructions;
