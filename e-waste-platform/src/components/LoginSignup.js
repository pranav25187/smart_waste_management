import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Manufacturer");
  const [location, setLocation] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("user_id", response.data.user.user_id); // Save user_id for later use

      // Redirect to the Dashboard page
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
        location,
        mobile_no: mobileNo,
      });

      // Redirect to the Login page after successful signup
      navigate("/login");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile No"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Buyer">Buyer</option>
          </select>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginSignup;
