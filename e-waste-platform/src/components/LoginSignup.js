import React, { useState } from 'react';
import { login, signup } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    location: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await login(formData.email, formData.password);
        alert('Login successful');
        // Redirect to the dashboard
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        await signup(formData.email, formData.password, formData.role, formData.location);
        alert('Signup successful');
      }
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        {!isLogin && (
          <>
            <input type="text" name="role" placeholder="Role" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Signup' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginSignup;


