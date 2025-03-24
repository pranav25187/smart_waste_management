import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "../styles/EwastePostForm.css";

const EwastePostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    material_type: "",
    quantity: "",
    unit: "kg",
    condition_status: "",
    description: "",
    price: "",
    location: "",
    available_dates: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to post materials");
      setLoading(false);
      return;
    }

    // Validate all required fields
    const requiredFields = [
      "material_type",
      "quantity",
      "unit",
      "condition_status",
      "price",
      "location",
      "available_dates"
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    // Validate numeric fields
    if (isNaN(formData.quantity) || formData.quantity <= 0) {
      setError("Quantity must be a positive number");
      setLoading(false);
      return;
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      setError("Price must be a positive number");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      if (image) {
        submitData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/ewaste",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        navigate("/my-materials");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to post material");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ewaste-post-form">
      <Navbar />
      <div className="form-container">
        <h2>Post E-Waste</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="material_type">Material Type</label>
            <input
              type="text"
              id="material_type"
              name="material_type"
              value={formData.material_type}
              onChange={handleChange}
              placeholder="e.g., Plastic, Metal, Electronics"
              required
            />
          </div>

          <div className="form-group quantity-group">
            <div className="quantity-input">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="unit-select">
              <label htmlFor="unit">Unit</label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="condition_status">Condition</label>
            <input
              type="text"
              id="condition_status"
              name="condition_status"
              value={formData.condition_status}
              onChange={handleChange}
              placeholder="e.g., Good, Fair, Excellent"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the material and its characteristics"
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the material location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="available_dates">Available Date</label>
            <input
              type="date"
              id="available_dates"
              name="available_dates"
              value={formData.available_dates}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post Material"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EwastePostForm;
