import React, { useState } from "react";
import { Link } from "react-router-dom";
import { exploreSongs } from "../data/songsData";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = exploreSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(value.toLowerCase()) ||
        song.artist.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
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

      <section className="search-section">
        <div className="search-container">
          <h2>Search Songs</h2>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search for songs or artists..."
              value={query}
              onChange={handleInputChange}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>

        <div className="results-container">
          {query && searchResults.length === 0 && (
            <p className="no-results">No songs found</p>
          )}

          {searchResults.map((song) => (
            <div key={song.id} className="result-item">
              <img
                src={`${process.env.PUBLIC_URL}${song.cover}`}
                alt={song.title}
                className="song-cover"
              />
              <div className="song-info">
                <h3>{song.artist} - {song.title}</h3>
                {song.spotifyUrl && (
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    Listen on Spotify
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

   
    </main>
  );
};

export default Search;
