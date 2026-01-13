import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        identifier,
        password
      });

      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify({ 
            username: data.user.username,
            email: data.user.email,
            id: data.user.id
          })
        );

        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Invalid credentials");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Login Axios error:", err);
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
        <h2>Login to Your Account</h2>
<br />
        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username or Email:</label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
<br />
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
