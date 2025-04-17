import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(user.role === 'admin' ? '/admin' : '/quiz');
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Sign In</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Welcome back to QuizPortal!</p>
        <form onSubmit={handleSignIn}>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
