import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setLoggedIn(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!name || !email || !subject || !messageText) {
      setFeedback("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFeedback("Please enter a valid email address.");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: messageText.trim(),
    };

    try {
      const { data } = await axios.post("http://localhost:5000/api/contact", payload);

      if (data.success) {
        setFeedback("Message sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessageText("");
      } else {
        setFeedback(data.message || "Failed to send message.");
      }
    } catch (err) {
      console.error("Contact Axios error:", err);
      setFeedback("Server error. Try again later.");
    }
  };

  return (
    <main>
      <header>
        <nav>
          <ul className="nav-list">
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/explore" className="nav-item">Explore</Link></li>
            <li><Link to="/about" className="nav-item">About</Link></li>
            <li><Link to="/contact" className="nav-item">Contact</Link></li>
            <li><Link to="/search" className="nav-item">Search</Link></li>
            {!loggedIn && (
              <>
                <li><Link to="/login" className="nav-item">Login</Link></li>
                <li><Link to="/register" className="nav-item">Register</Link></li>
              </>
            )}
            {loggedIn && <li><Link to="/dashboard" className="nav-item">Dashboard</Link></li>}
          </ul>
        </nav>
      </header>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Please fill out the form below.</p>

        {feedback && (
          <div className={`message ${feedback.includes("success") ? "success" : "error"}`}>
            {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Subject:</label>
            <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea value={messageText} onChange={e => setMessageText(e.target.value)} rows="5" required></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <footer>
        <p>© 2025 EsMa3. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Contact;
