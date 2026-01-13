const express = require("express");
const router = express.Router();
const db = require("../auth/db");
const { checkLogin, getUserId } = require("../auth/sessionMiddleware");

router.get("/", checkLogin, (req, res) => {
  const userId = getUserId(req);

  const sql = `
    SELECT s.id, s.title, s.artist, s.cover
    FROM favorite_songs fs
    JOIN songs s ON fs.song_id = s.id
    WHERE fs.user_id = ?
    ORDER BY fs.added_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching favorites:", err);
      return res.status(500).json({
        success: false,
        data: [],
        message: "Failed to fetch favorites"
      });
    }

    const favorites = results.map(row => ({
      id: row.id,
      title: row.title,
      artist: row.artist,
      cover: row.cover
    }));

    res.json({ success: true, data: favorites });
  });
});

module.exports = router;
