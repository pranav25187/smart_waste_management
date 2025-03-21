import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/post-ewaste">Post E-Waste</Link>
          </li>
          <li>
            <Link to="/search-materials">Search Materials</Link>
          </li>
          <li>
            <Link to="/transactions">Transaction Overview</Link>
          </li>
          <li>
            <Link to="/messages">In-App Messaging</Link>
          </li>
          <li>
            <Link to="/resources">Webinars and Resources</Link>
          </li>
          <li>
            <Link to="/my-materials">My Materials</Link> {/* Link to MyMaterials */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;