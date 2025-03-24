import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [message, setMessage] = useState('');
  const [buyFormData, setBuyFormData] = useState({
    quantity: '',
    delivery_address: '',
    payment_method: 'Credit Card'
  });
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchMaterials();
  }, [navigate, token]);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ewaste', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching materials');
      setLoading(false);
    }
  };

  const handleBuyClick = (material) => {
    setSelectedMaterial(material);
    setShowBuyForm(true);
  };

  const handleContactClick = (material) => {
    setSelectedMaterial(material);
    setShowChatModal(true);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          sender_id: userId,
          receiver_id: selectedMaterial.posted_by,
          material_id: selectedMaterial.material_id,
          message: message
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessage('');
      setShowChatModal(false);
      // Navigate to communication page with the chat open
      navigate(`/communication?material_id=${selectedMaterial.material_id}&seller_id=${selectedMaterial.posted_by}`);
    } catch (error) {
      alert('Error sending message');
    }
  };

  const handleBuyFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        {
          material_id: selectedMaterial.material_id,
          buyer_id: userId,
          quantity: parseFloat(buyFormData.quantity),
          unit: selectedMaterial.unit,
          delivery_address: buyFormData.delivery_address,
          payment_method: buyFormData.payment_method,
          total_amount: parseFloat(buyFormData.quantity) * selectedMaterial.price
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowBuyForm(false);
      alert('Order placed successfully!');
      navigate('/transaction-hub');
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <h2>Available Materials</h2>
        <div className="materials-grid">
          {materials.map((material) => (
            <div key={material.material_id} className="material-card">
              <img
                src={`http://localhost:5000${material.image_path}`}
                alt={material.material_type}
                className="material-image"
              />
              <h3>{material.material_type}</h3>
              <p>Condition: {material.condition_status}</p>
              <p>Price: ₹{material.price}</p>
              <p>Location: {material.location}</p>
              <div className="material-actions">
                <button
                  className="buy-btn"
                  onClick={() => handleBuyClick(material)}
                >
                  Buy
                </button>
                <button
                  className="contact-btn"
                  onClick={() => handleContactClick(material)}
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Modal */}
        {showChatModal && selectedMaterial && (
          <div className="modal">
            <div className="modal-content chat-modal">
              <span className="close" onClick={() => setShowChatModal(false)}>
                &times;
              </span>
              <h2>Contact Seller</h2>
              <div className="chat-container">
                <div className="material-info">
                  <h3>{selectedMaterial.material_type}</h3>
                  <p>Price: ₹{selectedMaterial.price}</p>
                </div>
                <div className="message-input">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    rows="4"
                  />
                  <button onClick={handleSendMessage} className="send-btn">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buy Form Modal */}
        {showBuyForm && selectedMaterial && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowBuyForm(false)}>
                &times;
              </span>
              <h2>Place Order</h2>
              <form onSubmit={handleBuyFormSubmit}>
                <div className="form-group">
                  <label>Quantity ({selectedMaterial.unit})</label>
                  <input
                    type="number"
                    value={buyFormData.quantity}
                    onChange={(e) =>
                      setBuyFormData({ ...buyFormData, quantity: e.target.value })
                    }
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Total Amount</label>
                  <input
                    type="text"
                    value={`₹${
                      buyFormData.quantity
                        ? (parseFloat(buyFormData.quantity) * selectedMaterial.price).toFixed(2)
                        : '0.00'
                    }`}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea
                    value={buyFormData.delivery_address}
                    onChange={(e) =>
                      setBuyFormData({
                        ...buyFormData,
                        delivery_address: e.target.value
                      })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={buyFormData.payment_method}
                    onChange={(e) =>
                      setBuyFormData({
                        ...buyFormData,
                        payment_method: e.target.value
                      })
                    }
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                <button type="submit" className="submit-btn">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

