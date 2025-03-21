import React, { useState } from 'react';
import { createEwaste } from '../api';

const EwastePostForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    item_name: '',
    type: '',
    quantity: '',
    condition: '',
    description: '',
    price: '',
    available_dates: '',
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    try {
      await createEwaste(formDataToSend);
      alert('E-Waste posted successfully');
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_id" placeholder="User  ID" onChange={handleChange} required />
      <input type="text" name="item_name" placeholder="Item Name" onChange={handleChange} required />
      <input type="text" name="type" placeholder="Type" onChange={handleChange} required />
      <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
      <input type="text" name="condition" placeholder="Condition" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
      <input type="text" name="available_dates" placeholder="Available Dates" onChange={handleChange} required />
      <input type="file" name="image" onChange={handleChange} required />
      <button type="submit">Post E-Waste</button>
    </form>
  );
};

export default EwastePostForm;