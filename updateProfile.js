const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");


router.post("/", async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: "Not logged in" });
    }

    const { username, password } = req.body;

    if (!username && !password) {
      return res.json({ success: false, message: "No data to update" });
    }

    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "esma3",
    });

    if (username) {
      await conn.execute("UPDATE user SET username=? WHERE id=?", [username, userId]);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await conn.execute("UPDATE user SET password=? WHERE id=?", [hashedPassword, userId]);
    }

    await conn.end();

    return res.json({ success: true, message: "Profile updated successfully" });

  } catch (err) {
    console.error("Update profile error:", err);
    return res.json({ success: false, message: "Server error" });
  }
});

module.exports = router;
