import React, { useState } from "react";
import axios from "axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [materials, setMaterials] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/materials/search", {
        params: { searchTerm },
      });
      setMaterials(response.data);
    } catch (error) {
      console.error("Error searching materials:", error);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Materials</h2>
      <input
        type="text"
        placeholder="Search materials..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {materials.map((material) => (
          <li key={material.material_id}>
            <h3>{material.material_type}</h3>
            <p>Condition: {material.condition}</p>
            <p>Price Range: {material.price_range}</p>
            <p>Location: {material.location}</p>
            <p>Available: {material.availability ? "Yes" : "No"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;