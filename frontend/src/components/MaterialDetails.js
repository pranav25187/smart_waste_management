import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/MaterialDetails.css";

const MaterialDetails = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/materials/${id}`);
        setMaterial(response.data);
      } catch (error) {
        console.error("Error fetching material details:", error);
      }
    };
    fetchMaterial();
  }, [id]);

  if (!material) return <div>Loading...</div>;

  return (
    <div className="material-details">
      <Navbar />
      <h2>{material.material_type}</h2>
      <img src={`http://localhost:5000/${material.image_path}`} alt={material.material_type} />
      <p>Condition: {material.condition}</p>
      <p>Price: ₹{material.price_range}</p>
      <p>Location: {material.location}</p>
      <p>Description: {material.description}</p>
    </div>
  );
};

export default MaterialDetails;