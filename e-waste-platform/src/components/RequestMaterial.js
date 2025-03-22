import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const RequestMaterial = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [buyerName, setBuyerName] = useState("");
  const [buyerMobile, setBuyerMobile] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/requests", {
        buyerName,
        buyerMobile,
        buyerEmail,
        quantity,
        materialId,
      });
      alert("Request submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="request-material">
      <h2>Request Material</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Buyer Mobile"
          value={buyerMobile}
          onChange={(e) => setBuyerMobile(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Buyer Email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestMaterial;
