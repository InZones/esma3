import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const songDetails = {
  1: { title: "Blinding Lights - The Weeknd", artist: "The Weeknd", genre: "Pop", year: "2020", description: "Blinding Lights is a track by The Weeknd that became an anthem with its 80s inspired synth beats and catchy chorus.", cover: "../assets/blind.png", listenUrl: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b?si=d425d971f93e48f5" },
  2: { title: "Shape of You - Ed Sheeran", artist: "Ed Sheeran", genre: "Pop", year: "2017", description: "Shape of You is one of Ed Sheeran's biggest hits, blending catchy pop melodies with a tropical vibe.", cover: "../assets/shape.png", listenUrl: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3?si=a796dfc7b73248ff" },
  3: { title: "Dynamite - BTS", artist: "BTS", genre: "K-pop", year: "2020", description: "Dynamite is a disco-inspired hit by BTS, marking their first song entirely in English and achieving worldwide success.", cover: "../assets/dynamite.jpg", listenUrl: "https://open.spotify.com/track/5QDLhrAOJJdNAmCTJ8xMyW?si=53a9ed18d2c04cdd" },
  4: { title: "HUMBLE. - Kendrick Lamar", artist: "Kendrick Lamar", genre: "Hip-hop", year: "2017", description: "HUMBLE. by Kendrick Lamar became a massive hit, with powerful lyrics and a hard-hitting beat, winning several Grammy Awards.", cover: "../assets/humble.jpg", listenUrl: "https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS?si=7301f9958bcc4a84" },
  5: { title: "Tamally Maak - Amr Diab", artist: "Amr Diab", genre: "Arabic Pop", year: "2000", description: "Tamally Maak is a romantic classic by Amr Diab, loved by audiences for its smooth melody and heartfelt lyrics.", cover: "../assets/tam.jpg", listenUrl: "https://open.spotify.com/track/6TYFcqqQVQPb3YsgfRhvqs?si=48f10fc98e6445ec" },
  6: { title: "Chandelier - Sia", artist: "Sia", genre: "Pop", year: "2014", description: "Chandelier by Sia became an iconic pop anthem with its soaring vocals and emotionally intense lyrics about addiction.", cover: "../assets/chandelier.jpg", listenUrl: "https://open.spotify.com/track/4VrWlk8IQxevMvERoX08iC?si=9f4436d6bcad4016" },
  7: { title: "Someone Like You - Adele", artist: "Adele", genre: "Pop", year: "2011", description: "Someone Like You is a powerful ballad by Adele, known for its emotional depth and heartfelt lyrics about love and loss.", cover: "../assets/someone.jpg", listenUrl: "https://open.spotify.com/track/3bNv3VuUOKgrf5hu3YcuRo?si=23b821b4ccc34b4c" },
  8: { title: "Al Bostah - Fairuz", artist: "Fairuz", genre: "Arabic Classics", year: "1979", description: "Al Bostah is one of Fairuz's top songs, in which she talks about a nostalgic trip she had.", cover: "../assets/fufu.jpg", listenUrl: "https://open.spotify.com/track/46R7cZ3s7Mhj85PgFW19j0?si=bb140bab34bd4222" },
  9: { title: "Shoubbak Habibi - Melhem Baraket", artist: "Melhem Baraket", genre: "Arabic Classics", year: "1951", description: "Shoubbak Habibi, a stellar song by Melhem Baraket talking about his love life", cover: "../assets/mumu.jpg", listenUrl: "https://open.spotify.com/track/3UxUrXb7owbD1JG1RLRV24?si=54582ec0abc84d52" },
  10: { title: "Show Me How - Men I Trust", artist: "Men I Trust", genre: "Pop", year: "2018", description: "Show me how, a song about loving people and loving yourself.", cover: "../assets/menitrust.jpg", listenUrl: "https://open.spotify.com/track/75IQVo8hqI1iwVZyvkN2VT?si=86002a4a4e5c4319" },
};

const SongDetails = () => {
  const location = useLocation();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const songId = params.get("song");
    setSong(songDetails[songId] || null);
  }, [location.search]);

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


      <section className="song-details-section">
        {!song ? (
          <h2>Song not found</h2>
        ) : (
          <>
            <h2>{song.title}</h2>
            <div className="song-info">
              <img src={song.cover} alt={song.title} />
              <div className="song-description">
                <p><strong>Artist:</strong> {song.artist}</p>
                <p><strong>Genre:</strong> {song.genre}</p>
                <p><strong>Released:</strong> {song.year}</p>
                <p>{song.description}</p>
                <a href={song.listenUrl} target="_blank" rel="noreferrer">Listen Now</a>
              </div>
            </div>
          </>
        )}
      </section>

      <footer>
        <p>© 2025 EsMa3. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default SongDetails;
