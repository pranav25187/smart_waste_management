import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsReceived = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://localhost:5000/api/requests/manufacturer/${userId}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="requests-received">
      <h2>Requests Received</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.request_id}>
            <h3>Request ID: {request.request_id}</h3>
            <p>Buyer Name: {request.buyerName}</p>
            <p>Buyer Mobile: {request.buyerMobile}</p>
            <p>Buyer Email: {request.buyerEmail}</p>
            <p>Quantity: {request.quantity}</p>
            <p>Material ID: {request.materialId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestsReceived;