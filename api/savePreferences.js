const express = require("express");
const router = express.Router();
const db = require("../auth/db");
const { checkLogin, getUserId } = require("../auth/sessionMiddleware");

router.post("/", checkLogin, (req, res) => {
  const userId = getUserId(req);
  const favoriteGenre = (req.body.favoriteGenre || "").trim();

  if (!favoriteGenre) {
    return res.json({ success: false, message: "Favorite genre is required" });
  }

  const selectSql = "SELECT id FROM user_preferences WHERE user_id=?";
  db.query(selectSql, [userId], (err, results) => {
    if (err) {
      console.error("Error checking preferences:", err);
      return res.json({ success: false, message: "Failed to save preferences" });
    }

    if (results.length > 0) {
      const updateSql = "UPDATE user_preferences SET favorite_genre=? WHERE user_id=?";
      db.query(updateSql, [favoriteGenre, userId], (err) => {
        if (err) {
          console.error("Error updating preferences:", err);
          return res.json({ success: false, message: "Failed to update preferences" });
        }
        res.json({ success: true, message: "Preferences updated successfully" });
      });
    } else {
      const insertSql = "INSERT INTO user_preferences (user_id, favorite_genre) VALUES (?, ?)";
      db.query(insertSql, [userId, favoriteGenre], (err) => {
        if (err) {
          console.error("Error inserting preferences:", err);
          return res.json({ success: false, message: "Failed to save preferences" });
        }
        res.json({ success: true, message: "Preferences saved successfully" });
      });
    }
  });
});

module.exports = router;
