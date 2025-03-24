import React from "react";
import "../styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <form>
        <label>Your Name</label>
        <input type="text" placeholder="Enter your name"/>
        <label>Your Email</label>
        <input type="email" placeholder="Enter your email"/>
        <label>Your Phone</label>
        <input type="tel" placeholder="Enter your phone number"/>
        <label>Your Message</label>
        <textarea placeholder="Enter your message"></textarea>
        <button type="submit">Send Message</button>
      </form>
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Jalgaon, Maharashtra, 42501</p>
        <p>+911234567890</p>
        <p>contact@smartwastemanagement.com</p>
      </div>
    </div>
  );
};

export default ContactUs;
