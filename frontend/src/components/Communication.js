import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Pusher from 'pusher-js';
import Navbar from './Navbar';
import '../styles/Communication.css';

const Communication = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const materialId = searchParams.get('material_id');
    const sellerId = searchParams.get('seller_id');

    if (materialId && sellerId) {
      setSelectedChat({ material_id: materialId, seller_id: sellerId });
      fetchMessages(materialId, sellerId);
    }

    const cleanup = initializePusher();
    return () => cleanup();
  }, [navigate, token, searchParams]);

  const initializePusher = () => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER
    });

    const channel = pusher.subscribe(`chat-${userId}`);
    channel.bind('new-message', (data) => {
      setMessages(prev => [...prev, data]);
      scrollToBottom();
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };

  const fetchMessages = async (materialId, sellerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/messages/chat/${materialId}/${sellerId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMessages(response.data);
      setLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          sender_id: userId,
          receiver_id: selectedChat.seller_id,
          material_id: selectedChat.material_id,
          message: newMessage
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setNewMessage('');
      // The new message will be added through the Pusher subscription
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="communication">
      <Navbar />
      <div className="communication-container">
        <div className="chat-window">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <h3>Chat</h3>
              </div>
              <div className="messages-container">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender_id === userId ? 'sent' : 'received'
                    }`}
                  >
                    <div className="message-content">
                      <p>{message.message}</p>
                      <span className="message-time">
                        {new Date(message.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={sendMessage} className="message-input">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a conversation or start a new one from the dashboard</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communication; 