import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/ConfirmOrder.css";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { material, quantity, address, user } = location.state;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="confirm-order">
      <Navbar />
      <h2>Confirm Your Order</h2>
      <div className="order-details">
        <h3>{material.material_type}</h3>
        <p>Quantity: {quantity}</p>
        <p>Price per unit: ₹{material.price_range}</p>
        <p>Total: ₹{quantity * material.price_range}</p>
        <p>Delivery Address: {address}</p>
        <p>Buyer Name: {user.name}</p>
        <p>Buyer Email: {user.email}</p>
        <p>Buyer Mobile: {user.mobile_no}</p>
        <div className="payment-methods">
          <h4>Payment Methods:</h4>
          <label>
            <input type="radio" name="payment" value="credit-card" /> Credit Card
          </label>
          <label>
            <input type="radio" name="payment" value="upi" /> UPI
          </label>
          <label>
            <input type="radio" name="payment" value="bank-transfer" /> Bank Transfer
          </label>
        </div>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default ConfirmOrder;