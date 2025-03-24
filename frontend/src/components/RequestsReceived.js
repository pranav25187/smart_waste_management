import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/RequestsReceived.css";

const RequestsReceived = () => {
  const [requests, setRequests] = useState([]);
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/requests/manufacturer/${userId}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [userId]);

  const handleApproveRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: "Approved",
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.request_id === requestId ? { ...req, status: "Approved" } : req
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${requestId}`, {
        status: "Rejected",
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.request_id === requestId ? { ...req, status: "Rejected" } : req
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="requests-received">
      <Navbar />
      <h2>Requests Received</h2>
      {requests.length === 0 ? (
        <p>No requests received yet</p>
      ) : (
        <div className="requests-list">
          {requests.map((request) => (
            <div key={request.request_id} className="request-card">
              <h3>Request #{request.request_id}</h3>
              <p>Buyer Name: {request.buyer_name}</p>
              <p>Buyer Email: {request.buyer_email}</p>
              <p>Buyer Mobile: {request.buyer_mobile}</p>
              <p>Quantity: {request.quantity}</p>
              <p>Address: {request.address}</p>
              <p>Status: {request.status}</p>
              <div className="actions">
                {request.status === "Pending" && (
                  <>
                    <button
                      className="approve"
                      onClick={() => handleApproveRequest(request.request_id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject"
                      onClick={() => handleRejectRequest(request.request_id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestsReceived;