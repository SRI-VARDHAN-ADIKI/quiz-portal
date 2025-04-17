
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default to user
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((user) => user.email === email)) {
      alert('User already exists!');
      return;
    }
    const signupDate = new Date().toLocaleString();
    const newUser = { email, password, signupDate, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Sign-up successful! Please sign in.');
    navigate('/signin');
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Sign Up</h2>
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>Join the QuizPortal community!</p>
        <form onSubmit={handleSignUp}>
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
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="role-selection" style={{ marginBottom: '20px' }}>
            <p style={{ marginBottom: '10px', color: '#1e293b' }}>Select Role:</p>
            <div className="option">
              <input
                type="radio"
                id="userRole"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="userRole">User</label>
            </div>
            <div className="option">
              <input
                type="radio"
                id="adminRole"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="adminRole">Admin</label>
            </div>
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
