import express from "express";
import cors from "cors";

import authRoutes from "./api/routes/auth.js";
import contactRoutes from "./api/routes/contact.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);       
app.use("/api/contact", contactRoutes);


app.get("/api/get_playlists", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: "My Playlist", song_count: 5 }
    ]
  });
});

app.get("/api/get_favorites", (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: "Song A", artist: "Artist A", cover: "" }
    ]
  });
});

app.post("/api/create_playlist", (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ success: false, message: "Playlist name required" });

  res.json({ success: true, message: `Playlist "${name}" created` });
});

app.post("/api/save_preferences", (req, res) => {
  res.json({ success: true, message: "Preferences saved" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
