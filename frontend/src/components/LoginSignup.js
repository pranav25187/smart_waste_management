import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("user_id", response.data.user.user_id);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { state: { message: "Login successful!" } });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        location,
        mobile_no: mobileNo,
      });
      setSuccessMessage("Signup successful! Please login.");
      setError(""); // Clear any previous errors
      setIsLogin(true); // Switch to login form after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Email already exists");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset instructions sent to your email!");
    setForgotPassword(false);
  };

  return (
    <div className="page-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Mobile No" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </>
        )}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      {isLogin && (
        <p>
          <button onClick={() => setForgotPassword(true)}>Forgot Password?</button>
        </p>
      )}
      {forgotPassword && (
        <div className="forgot-password">
          <input type="email" placeholder="Enter your email" />
          <button onClick={handleForgotPassword}>Reset Password</button>
        </div>
      )}
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</button>
      </p>
    </div>
  );
};

export default LoginSignup;