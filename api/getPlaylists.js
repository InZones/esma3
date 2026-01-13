const express = require("express");
const router = express.Router();
const db = require("../auth/db");
const { checkLogin, getUserId } = require("../auth/sessionMiddleware");

router.get("/", checkLogin, (req, res) => {
  const userId = getUserId(req);

  const sql = `
    SELECT p.id, p.name, COUNT(ps.song_id) AS song_count
    FROM playlists p
    LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
    WHERE p.user_id = ?
    GROUP BY p.id, p.name
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching playlists:", err);
      return res.status(500).json({
        success: false,
        data: [],
        message: "Failed to fetch playlists"
      });
    }

    const playlists = results.map(row => ({
      id: row.id,
      name: row.name,
      song_count: row.song_count
    }));

    res.json({ success: true, data: playlists });
  });
});

module.exports = router;
