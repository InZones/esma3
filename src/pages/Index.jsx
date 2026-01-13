import React from 'react';
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main>
      <header>
        <nav>
          <ul className='nav-list'>
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

      <section className="hero-section">
        <h2>Welcome to Esma3</h2>
        <p>Your destination for discovering the best music from artists worldwide!</p>
        <Link to="/explore" className="nav-item">Explore Now</Link>
      </section>

      <section>
        <h2 className="subtitle">Featured Songs</h2>
        <div className="featured-songs">
          <div className="song-item">
            <img src={`${process.env.PUBLIC_URL}/assets/someone.jpg`} alt="Adele" />
            <h3>Adele - Easy On Me</h3>
            <Link to="/song-details">View Details</Link>
          </div>
          <div className="song-item">
            <img src={`${process.env.PUBLIC_URL}/assets/humble.jpg`} alt="Kendrick Lamar" />
            <h3>Kendrick Lamar - HUMBLE.</h3>
            <Link to="/song-details">View Details</Link>
          </div>
          <div className="song-item">
            <img src={`${process.env.PUBLIC_URL}/assets/tam.jpg`} alt="Amr Diab" />
            <h3>Amr Diab - Tamally Maak</h3>
            <Link to="/song-details">View Details</Link>
          </div>
          <div className="song-item">
            <img src={`${process.env.PUBLIC_URL}/assets/chandelier.jpg`} alt="Sia" />
            <h3>Sia - Chandelier</h3>
            <Link to="/song-details">View Details</Link>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Esma3 | All Rights Reserved</p>
      </footer>
    </main>
  );
};

export default Index;
