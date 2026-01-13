import React from "react";
import { Link } from "react-router-dom";

const About = () => {
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

      <section className="about-section">
        <div className="about-card">
          <h2 className="subtitle">About Esma3</h2>
          <p>
            Welcome to Esma3, your personal music finder that connects you to
            your favorite songs and artists effortlessly. Our platform is
            designed to make music discovery easy, fun, and accessible for
            everyone.
          </p>
        </div>

        <div className="about-card">
          <h3 className="subtitle">What We Do</h3>
          <p>
            Esma3 allows you to search for any song or artist quickly. Whether
            you're looking for the latest hits or timeless classics, we've got you
            covered. Our database is powered by comprehensive music libraries,
            ensuring accurate and up-to-date results.
          </p>
        </div>

        <div className="about-card">
          <h3 className="subtitle">Features</h3>
          <ul>
            <li>🔍 Search for Songs and Artists: Use our intuitive search bar to find your favorite tracks in seconds.</li>
            <li>🎵 Explore Music: Discover new artists and albums with every search.</li>
            <li>📱 Responsive Design: Enjoy EsMa3 on any device, whether you're on your phone, tablet, or computer.</li>
            <li>🌐 Seamless Navigation: Quickly switch between pages with our user-friendly interface.</li>
          </ul>
        </div>

        <div className="about-card">
          <h3 className="subtitle">Our Mission</h3>
          <p>
            At Esma3, we aim to make music accessible to everyone, anytime,
            anywhere. We believe music has the power to inspire, uplift, and bring
            people together. That's why we're committed to providing a seamless
            music search experience for all music lovers.
          </p>
        </div>
      </section>

      <footer>
        <p>
          &copy; 2025 Esma3. All rights reserved. Built with ❤️ by a music
          enthusiast for music enthusiasts.
        </p>
      </footer>
    </main>
  );
};

export default About;
