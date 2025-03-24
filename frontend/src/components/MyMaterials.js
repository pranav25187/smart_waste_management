import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/MyMaterials.css";

const MyMaterials = () => {
  const [myMaterials, setMyMaterials] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyMaterials = async () => {
      try {
        if (!token) {
          console.error("User is not authenticated. Please log in.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/ewaste/my", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(response.data)) {
          setMyMaterials(response.data);
        } else {
          console.error("Invalid data format received from the server:", response.data);
        }
      } catch (error) {
        console.error("Error fetching materials:", error.response?.data || error.message);
      }
    };

    fetchMyMaterials();
  }, [navigate, token]);

  return (
    <div className="my-materials">
      <Navbar />
      <div className="my-materials-content">
        <h2>My Materials</h2>
        <div className="materials-grid">
          {myMaterials.length === 0 ? (
            <p className="no-materials">No materials posted yet.</p>
          ) : (
            myMaterials.map((material) => (
              <div key={material.material_id} className="material-card">
                <img
                  src={`http://localhost:5000${material.image_path}`}
                  alt={material.material_type}
                  className="material-image"
                />
                <h3>{material.material_type}</h3>
                <p>Condition: {material.condition_status}</p>
                <p>Price: ₹{material.price}</p>
                <p>Location: {material.location}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMaterials;