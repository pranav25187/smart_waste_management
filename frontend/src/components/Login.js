import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user.id);
      setSuccess('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', {
        email: forgotPasswordEmail
      });
      setSuccess('Password reset instructions have been sent to your email');
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        {!showForgotPassword ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button">
                Login
              </button>
            </form>
            <div className="auth-links">
              <button
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
              <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label htmlFor="forgotPasswordEmail">Email</label>
              <input
                type="email"
                id="forgotPasswordEmail"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Send Reset Instructions
            </button>
            <button
              type="button"
              className="back-to-login"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login; 