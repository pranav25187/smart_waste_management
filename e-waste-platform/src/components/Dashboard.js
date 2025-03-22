import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <nav>
        <ul className="dashboard-links">
          <li>
            <Link to="/post-ewaste" className="dashboard-link">
              Post E-Waste
            </Link>
          </li>
          <li>
            <Link to="/search-materials" className="dashboard-link">
              Search Materials
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="dashboard-link">
              Transaction Overview
            </Link>
          </li>
          <li>
            <Link to="/messages" className="dashboard-link">
              In-App Messaging
            </Link>
          </li>
          <li>
            <Link to="/about" className="dashboard-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/raw-materials" className="dashboard-link">
              Raw Materials
            </Link>
          </li>
          <li>
            <Link to="/my-materials" className="dashboard-link">
              My Materials
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;