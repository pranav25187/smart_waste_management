import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/EwastePostForm.css";

const EwastePostForm = () => {
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableDates, setAvailableDates] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const token = localStorage.getItem("token"); // Get token from local storage

    // ✅ Check if token exists
    if (!token) {
        setError("User is not authenticated. Please log in.");
        return;
    }

    // ✅ Validate token with the backend before submitting
    try {
        await axios.get("http://localhost:5000/api/auth/verify-token", {
            headers: { "Authorization": `Bearer ${token}` }
        });
    } catch (error) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Remove invalid token
        return;
    }

    // ✅ Validate required fields
    if (!itemName || !type || !quantity || !condition || !description || !price || !availableDates) {
        setError("All fields are required");
        return;
    }

    if (isNaN(quantity) || quantity <= 0) {
        setError("Quantity must be a positive number");
        return;
    }

    if (isNaN(price) || price <= 0) {
        setError("Price must be a positive number");
        return;
    }

    const formData = new FormData();
    formData.append("user_id", localStorage.getItem("user_id"));
    formData.append("item_name", itemName);
    formData.append("type", type);
    formData.append("quantity", `${quantity} ${unit}`);
    formData.append("condition", condition);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("available_dates", availableDates);
    
    if (image) {
        formData.append("image", image);
    }

    try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/api/ewaste", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}` // ✅ Attach token in headers
            },
        });

        if (response.status === 201) {
            alert("E-Waste posted successfully!");
            navigate("/dashboard");
        }
    } catch (error) {
        console.error("Error posting e-waste:", error?.response?.data || error.message);
        setError(error?.response?.data?.message || "Failed to post e-waste. Please try again.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="ewaste-post-form">
      <Navbar />
      <h2>Post E-Waste</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <div className="quantity-input">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="ton">ton</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (INR)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="date"
          value={availableDates}
          onChange={(e) => setAvailableDates(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EwastePostForm;
