import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("user_id");

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/dashboard">Smart Waste Management</Link>
      </div>
      {isLoggedIn && (
        <ul className="nav-links">
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/post-ewaste">Post E-Waste</Link></li>
          <li><Link to="/my-materials">My Materials</Link></li>
          <li><Link to="/messages">Communication</Link></li>
          <li><Link to="/transactions">Transaction Hub</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;