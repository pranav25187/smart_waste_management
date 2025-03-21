import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages } from '../api';

const InAppMessaging = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    sender_id: '',
    receiver_id: '',
    message: '',
  });

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessages(formData.receiver_id);
      setMessages(response.data);
    };
    if (formData.receiver_id) {
      fetchMessages();
    }
  }, [formData.receiver_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      alert('Message sent successfully');
      setFormData({ ...formData, message: '' }); // Clear message input
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>In-App Messaging</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="sender_id" placeholder="Your ID" onChange={handleChange} required />
        <input type="text" name="receiver_id" placeholder="Receiver ID" onChange={handleChange} required />
        <textarea name="message" placeholder="Type your message" onChange={handleChange} required />
        <button type="submit">Send Message</button>
      </form>
      <h3>Messages</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default InAppMessaging;