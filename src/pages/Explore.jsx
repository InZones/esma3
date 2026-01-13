import React from "react";
import { Link } from "react-router-dom";

const songs = [
  { id: 1, title: "Blinding Lights", artist: "The Weeknd", genre: "Pop", year: 2020, cover: `${process.env.PUBLIC_URL}/assets/blind.png` },
  { id: 2, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", year: 2017, cover: `${process.env.PUBLIC_URL}/assets/shape.png` },
  { id: 3, title: "Dynamite", artist: "BTS", genre: "K-pop", year: 2020, cover: `${process.env.PUBLIC_URL}/assets/dynamite.jpg` },
  { id: 4, title: "HUMBLE.", artist: "Kendrick Lamar", genre: "Hip-hop", year: 2017, cover: `${process.env.PUBLIC_URL}/assets/humble.jpg` },
  { id: 5, title: "Tamally Maak", artist: "Amr Diab", genre: "Arabic Pop", year: 2000, cover: `${process.env.PUBLIC_URL}/assets/tam.jpg` },
  { id: 6, title: "Chandelier", artist: "Sia", genre: "Pop", year: 2014, cover: `${process.env.PUBLIC_URL}/assets/chandelier.jpg` },
  { id: 7, title: "Someone Like You", artist: "Adele", genre: "Pop", year: 2011, cover: `${process.env.PUBLIC_URL}/assets/someone.jpg` },
  { id: 8, title: "Al Bostah", artist: "Fairuz", genre: "Arabic Classic", year: 1979, cover: `${process.env.PUBLIC_URL}/assets/fufu.jpg` },
  { id: 9, title: "Shoubbak Habibi", artist: "Melhem Baraket", genre: "Arabic Classic", year: 1951, cover: `${process.env.PUBLIC_URL}/assets/mumu.jpg` },
  { id: 10, title: "Show Me How", artist: "Men I Trust", genre: "Pop", year: 2018, cover: `${process.env.PUBLIC_URL}/assets/menitrust.jpg` },
];

const Explore = () => {
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

      <section className="explore-section">
        <h2>Explore International Music</h2>
        <p>Discover a wide variety of music from around the world. Click on any song to learn more about it and the artist.</p>

        <div className="song-list">
          {songs.map((song) => (
            <div key={song.id} className="song-item">
              <img src={song.cover} alt={song.title} />
              <h3>
                <Link to={`/song-details?song=${song.id}`}>{song.title} - {song.artist}</Link>
              </h3>
              <p>Genre: {song.genre} | Year: {song.year}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 EsMa3. All Rights Reserved.</p>
      </footer>
    </main>
  );
};

export default Explore;
