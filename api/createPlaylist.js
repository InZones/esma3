const express = require("express");
const router = express.Router();
const db = require("../auth/db");
const { checkLogin, getUserId } = require("../auth/sessionMiddleware");


router.post("/", checkLogin, async (req, res) => {
  const userId = getUserId(req);
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.json({ success: false, message: "Playlist name is required" });
  }

  const sql = "INSERT INTO playlists (user_id, name) VALUES (?, ?)";
  
  db.query(sql, [userId, name.trim()], (err, result) => {
    if (err) {
      console.error("Error creating playlist:", err);
      return res.json({ success: false, message: "Error creating playlist" });
    }

    res.json({
      success: true,
      message: "Playlist created successfully",
      data: { playlist_id: result.insertId }
    });
  });
});

module.exports = router;
