import React, { useState, useEffect } from 'react';
import { createMaterialRequest, getMaterials } from '../api';

const MaterialRequestForm = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    material_id: '',
    request_quantity: '',
    preferred_date: '',
    additional_comments: '',
  });
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await getMaterials();
      setMaterials(response.data);
    };
    fetchMaterials();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMaterialRequest(formData);
      alert('Material request created successfully');
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="user_id" placeholder="User  ID" onChange={handleChange} required />
      <select name="material_id" onChange={handleChange} required>
        <option value="">Select Material</option>
        {materials.map((material) => (
          <option key={material.id} value={material.id}>{material.name}</option>
        ))}
      </select>
      <input type="number" name="request_quantity" placeholder="Request Quantity" onChange={handleChange} required />
      <input type="date" name="preferred_date" onChange={handleChange} required />
      <textarea name="additional_comments" placeholder="Additional Comments" onChange={handleChange} />
      <button type="submit">Request Material</button>
    </form>
  );
};

export default MaterialRequestForm;