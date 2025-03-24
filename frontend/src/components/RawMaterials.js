import React, { useEffect, useState } from "react";
import axios from "axios";

const RawMaterials = () => {
  const [materials, setMaterials] = useState([]);

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

  return (
    <div className="raw-materials">
      <h2>Raw Materials</h2>
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

export default RawMaterials;