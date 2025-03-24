import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [wasteMaterials, setWasteMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchWasteMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/ewaste");
        const otherManufacturersMaterials = response.data.filter(
          (item) => item.posted_by !== parseInt(userId)
        );
        setWasteMaterials(otherManufacturersMaterials);
      } catch (error) {
        console.error("Error fetching waste materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWasteMaterials();
  }, [navigate, token, userId]);

  return (
    <div className="dashboard-container">
      <Navbar />
      <h1>Waste Management Dashboard</h1>
      <section className="waste-section">
        <h2>Available Waste Materials</h2>
        {loading ? (
          <p>Loading...</p>
        ) : wasteMaterials.length > 0 ? (
          <div className="waste-grid">
            {wasteMaterials.map((material) => (
              <div key={material.id} className="waste-card">
                <img
                  src={`http://localhost:5000${material.image_path}`}
                  alt={material.item_name}
                  className="waste-image"
                />
                <div className="waste-info">
                  <h3>{material.item_name}</h3>
                  <p>Condition: {material.condition}</p>
                  <p>Price: ${material.price_range}</p>
                  <p>Location: {material.location}</p>
                  <div className="waste-actions">
                    <button onClick={() => navigate(`/buy/${material.id}`)} className="buy-btn">
                      Buy
                    </button>
                    <button onClick={() => navigate(`/message/${material.posted_by}`)} className="contact-btn">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-materials">No materials available.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

