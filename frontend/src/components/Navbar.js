import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && userId) {
      fetchUnreadCount();
    }
  }, [token, userId]);

  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${userId}/unread`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/dashboard">E-Waste Marketplace</Link>
      </div>
      <div className="nav-links">
        <Link to="/dashboard">Home</Link>
        <Link to="/post-material">Post Material</Link>
        <Link to="/my-materials">My Materials</Link>
        <Link to="/communication" className="nav-link-with-badge">
          Communication
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </Link>
        <Link to="/transaction-hub">Transaction Hub</Link>
      </div>
      <div className="nav-user">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;