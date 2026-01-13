import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Index from "./pages/Index";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Explore from "./pages/Explore";
import Search from "./pages/Search";

// Optional pages
let Login, Register, Profile, SongDetails;
try { Login = require("./pages/Login").default; } catch (err) { console.warn("Login page missing:", err); }
try { Register = require("./pages/Register").default; } catch (err) { console.warn("Register page missing:", err); }
try { Profile = require("./pages/Profile").default; } catch (err) { console.warn("Profile page missing:", err); }
try { SongDetails = require("./pages/Song-details").default; } catch (err) { console.warn("SongDetails page missing:", err); }

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.warn("Backend not reachable:", err));
  }, []);

  return (
    // Fix base path here
    <BrowserRouter basename="/yourproject">
      <div style={{ padding: "10px", background: "#eee" }}>
        <strong>Backend says:</strong> {message || "No message"}
      </div>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />

        {Login && <Route path="/login" element={<Login />} />}
        {Register && <Route path="/register" element={<Register />} />}
        {Profile && <Route path="/profile" element={<Profile />} />}
        {SongDetails && <Route path="/song-details" element={<SongDetails />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
