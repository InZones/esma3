import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }
    if (username.length < 3 || username.length > 20) {
      setMessage("Username must be between 3 and 20 characters.");
      setMessageType("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      setMessageType("error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password
      });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));

        setMessage("Registration successful! Redirecting to Dashboard...");
        setMessageType("success");

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Registration failed");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Registration Axios error:", err);
      setMessage("Server error. Please try again later.");
      setMessageType("error");
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
            <li><Link to="/login" className="nav-item">Login</Link></li>
            <li><Link to="/register" className="nav-item">Register</Link></li>
          </ul>
        </nav>
      </header>

      <section className="auth-section">
        <h2>Create Your Account</h2>
        <br />
        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} maxLength={20} />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} />
          </div>

          <button type="submit">Register</button>
        </form>
<br />
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </section>
    </main>
  );
};

export default Register;
