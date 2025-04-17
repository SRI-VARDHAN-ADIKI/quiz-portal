
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  // Redirect non-admins
  useEffect(() => {
    if (currentUser.role !== 'admin') {
      alert('Access denied: Admins only.');
      navigate('/quiz');
    }
  }, [currentUser, navigate]);

  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem('questions')) || []
  );
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [newQuestion, setNewQuestion] = useState({
    id: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question || newQuestion.options.includes('') || !newQuestion.answer) {
      alert('Please fill all fields.');
      return;
    }
    const id = questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([...questions, { ...newQuestion, id }]);
    setNewQuestion({ id: '', question: '', options: ['', '', '', ''], answer: '' });
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion({ ...question });
  };

  const handleUpdateQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.question || newQuestion.options.includes('') || !newQuestion.answer) {
      alert('Please fill all fields.');
      return;
    }
    setQuestions(
      questions.map((q) => (q.id === editingQuestion.id ? { ...newQuestion } : q))
    );
    setEditingQuestion(null);
    setNewQuestion({ id: '', question: '', options: ['', '', '', ''], answer: '' });
  };

  const handleDeleteQuestion = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>
        <h3>Manage Questions</h3>
        <form onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Question"
              value={newQuestion.question}
              onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
              required
            />
          </div>
          {newQuestion.options.map((option, index) => (
            <div className="input-group" key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...newQuestion.options];
                  newOptions[index] = e.target.value;
                  setNewQuestion({ ...newQuestion, options: newOptions });
                }}
                required
              />
            </div>
          ))}
          <div className="input-group">
            <input
              type="text"
              placeholder="Correct Answer"
              value={newQuestion.answer}
              onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="button">
            {editingQuestion ? 'Update Question' : 'Add Question'}
          </button>
          {editingQuestion && (
            <button
              type="button"
              className="button secondary"
              onClick={() =>
                setNewQuestion({ id: '', question: '', options: ['', '', '', ''], answer: '' })
              }
            >
              Cancel
            </button>
          )}
        </form>

        <h3>Question List</h3>
        {questions.length ? (
          <ul className="question-list">
            {questions.map((q) => (
              <li key={q.id}>
                <span>{q.question}</span>
                <div>
                  <button
                    className="button small"
                    onClick={() => handleEditQuestion(q)}
                  >
                    Edit
                  </button>
                  <button
                    className="button small secondary"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}

        <h3>User List</h3>
        {users.length ? (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.email}>
                <span>Email: {user.email}</span>
                <span>Role: {user.role}</span>
                <span>Signed up: {user.signupDate}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users registered.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
