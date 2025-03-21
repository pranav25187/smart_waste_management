import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MaterialSearch = () => {
  const [filters, setFilters] = useState({
    materialType: "",
    location: "",
    availability: "",
    condition: "",
    priceRange: [0, 1000],
  });
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/materials");
        setMaterials(response.data);
      } catch (err) {
        console.error("Failed to fetch materials", err);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div>
      <h1>Search Materials</h1>
      <div>
        <select
          value={filters.materialType}
          onChange={(e) => setFilters({ ...filters, materialType: e.target.value })}
        >
          <option value="Copper">Copper</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Plastic">Plastic</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <button>Search</button>
      </div>
      <div>
        <h2>Search Results</h2>
        <ul>
          {materials.map((material) => (
            <li key={material.material_id}>
              {material.material_type} - {material.location} -{" "}
              <Link to="/request-material">Request</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaterialSearch;