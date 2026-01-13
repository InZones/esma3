import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      setUsername(userData.username || "User");
      loadUserData();
    } catch (err) {
      console.error("Error parsing user data:", err);
      navigate("/login");
    }
  }, [navigate]);

  const loadUserData = async () => {
    setLoading(true);
    setError("");
    try {
      const [playlistsRes, favoritesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/get_playlists"),
        axios.get("http://localhost:5000/api/get_favorites"),
      ]);

      setPlaylists(Array.isArray(playlistsRes.data.data) ? playlistsRes.data.data : []);
      setFavorites(Array.isArray(favoritesRes.data.data) ? favoritesRes.data.data : []);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load data from backend.");
      setPlaylists([]);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async () => {
    const name = prompt("Enter playlist name:")?.trim();
    if (!name) return;

    try {
      const { data } = await axios.post("http://localhost:5000/api/create_playlist", { name });
      if (data.success) loadUserData();
      else alert(data.message || "Error creating playlist.");
    } catch (err) {
      console.error("Error creating playlist:", err);
      alert("Error creating playlist.");
    }
  };

  const savePreferences = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = { favoriteGenre: formData.get("favorite-genre") };

    try {
      const { data } = await axios.post("http://localhost:5000/api/save_preferences", payload);
      alert(data.success ? "Preferences saved!" : data.message || "Failed to save preferences.");
    } catch (err) {
      console.error("Error saving preferences:", err);
      alert("Error saving preferences.");
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
            <li><Link to="/dashboard" className="nav-item">Dashboard</Link></li>
          </ul>
        </nav>
      </header>

      <section className="dashboard-section">
        <h2>Welcome, {username}!</h2>

        {loading && <p>Loading your data...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="dashboard-grid">
            {/* Playlists */}
            <div className="dashboard-card">
              <h3>Your Playlists</h3>
              {playlists.length === 0 ? (
                <p>No playlists yet. Create one!</p>
              ) : (
                playlists.map((p) => (
                  <div key={p.id} className="playlist-item">
                    <h4>{p.name}</h4>
                    <p>{p.song_count} songs</p>
                  </div>
                ))
              )}
              <button onClick={createPlaylist} className="dashboard-btn">
                Create New Playlist
              </button>
            </div>

            {/* Favorites */}
            <div className="dashboard-card">
              <h3>Favorite Songs</h3>
              {favorites.length === 0 ? (
                <p>No favorite songs yet.</p>
              ) : (
                favorites.map((song) => (
                  <div key={song.id} className="song-item">
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                ))
              )}
            </div>

            {/* Preferences */}
            <div className="dashboard-card">
              <h3>Music Preferences</h3>
              <form onSubmit={savePreferences} className="preferences-form">
                <label>Favorite Genre:</label>
                <select name="favorite-genre" defaultValue="pop">
                  <option value="pop">Pop</option>
                  <option value="rock">Rock</option>
                  <option value="hip-hop">Hip-Hop</option>
                  <option value="jazz">Jazz</option>
                  <option value="classical">Classical</option>
                </select>
                <button className="dashboard-btn">Save Preferences</button>
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
