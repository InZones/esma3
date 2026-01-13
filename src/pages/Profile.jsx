import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); 

  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
   
    fetch("/check_session.php")
      .then(res => res.json())
      .then(data => {
        if (!data.loggedin) {
          window.location.href = "/login";
        }
      })
      .catch(() => {
        setBackendAvailable(false);
        setMessage("Session check unavailable. Backend missing.");
        setType("error");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!backendAvailable) {
      setMessage("Cannot update profile: backend not available.");
      setType("error");
      return;
    }

    const formData = new FormData();
    if (username) formData.append("username", username);
    if (password) formData.append("password", password);

    try {
      const res = await fetch("/auth/update_profile.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.success ? "Profile updated successfully!" : data.message);
      setType(data.success ? "success" : "error");

      if (data.success) {
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      setMessage("Backend not reachable. Update skipped.");
      setType("error");
    }
  };

  return (
    <main className="profile-container">
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

      <h2>Profile Settings</h2>

      {message && (
        <div className={`message ${type}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>New Username</label>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!backendAvailable}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!backendAvailable}
          />
        </div>

        <button type="submit" className="update-btn" disabled={!backendAvailable}>
          Update Profile
        </button>
      </form>

      {!backendAvailable && (
        <p style={{ color: "red", marginTop: "10px" }}>
          Backend not available. Profile updates are disabled.
        </p>
      )}

      <footer>
        <p>© 2025 EsMa3 | All Rights Reserved</p>
      </footer>
    </main>
  );
};

export default Profile;
