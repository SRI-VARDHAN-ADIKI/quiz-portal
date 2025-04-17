
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="navbar">
      <h2>QuizPortal</h2>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <span className="user-email">{currentUser.email}</span>
            {currentUser.role === 'admin' ? (
              <>
                <Link to="/admin">Admin Dashboard</Link>
                <Link to="/quiz">Take Quiz</Link>
              </>
            ) : (
              <Link to="/quiz">Quiz</Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
