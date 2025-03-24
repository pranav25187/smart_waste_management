import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/BuyForm.css";

const BuyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const userId = localStorage.getItem("user_id");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`);
      const user = userResponse.data;
      await axios.post("http://localhost:5000/api/requests", {
        buyerName: user.name,
        buyerMobile: user.mobile_no,
        buyerEmail: user.email,
        quantity,
        materialId: id,
        address,
      });
      navigate("/confirm-order", {
        state: {
          material,
          quantity,
          address,
          user,
        },
      });
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  if (!material) return <div>Loading...</div>;

  return (
    <div className="buy-form">
      <Navbar />
      <h2>Buy {material.material_type}</h2>
      <form onSubmit={handleSubmit}>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
        <label>Delivery Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default BuyForm;