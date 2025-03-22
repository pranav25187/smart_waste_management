import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EwastePostForm = () => {
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableDates, setAvailableDates] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("item_name", itemName);
    formData.append("type", type);
    formData.append("quantity", quantity);
    formData.append("condition", condition);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("available_dates", availableDates);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Removed the unused 'response' variable
      await axios.post("http://localhost:5000/api/ewaste", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("E-Waste posted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting e-waste:", error);
    }
  };

  return (
    <div className="ewaste-post-form">
      <h2>Post E-Waste</h2>
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
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
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
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Available Dates"
          value={availableDates}
          onChange={(e) => setAvailableDates(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EwastePostForm;