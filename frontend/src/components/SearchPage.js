import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/SearchPage.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/materials");
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredMaterials = materials.filter(
    (material) =>
      material.material_type.toLowerCase().includes(searchTerm) ||
      material.location.toLowerCase().includes(searchTerm) ||
      material.condition.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-page">
      <Navbar />
      <h2>Search Materials</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by material, location, or condition..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="materials-grid">
        {filteredMaterials.length === 0 ? (
          <p>No materials found</p>
        ) : (
          filteredMaterials.map((material) => (
            <div
              key={material.material_id}
              className="material-card"
              onClick={() => navigate(`/material/${material.material_id}`)}
            >
              <img src={`http://localhost:5000/${material.image_path}`} alt={material.material_type} />
              <h3>{material.material_type}</h3>
              <p>Condition: {material.condition}</p>
              <p>Price: ₹{material.price_range}</p>
              <p>Location: {material.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;