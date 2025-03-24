import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Pusher from "pusher-js"; // Correct import
import "../styles/Messaging.css";

const Messaging = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("fd3880d41daa3cfa5579", {
      cluster: "ap2",
      forceTLS: true,
    });

    // Subscribe to the channel
    const channel = pusher.subscribe(`chat-${userId}`);
    channel.bind("new-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // Cleanup on unmount
    return () => {
      pusher.unsubscribe(`chat-${userId}`);
    };
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages", {
        sender_id: userId,
        receiver_id: id,
        message: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="messaging">
      <Navbar />
      <h2>Messages</h2>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender_id === userId ? "sent" : "received"}`}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messaging;