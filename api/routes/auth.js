import express from "express";
import bcrypt from "bcrypt";
import db from "../db.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.json({ success: false, message: "All fields required" });

    const [existing] = await db.query(
      "SELECT id FROM user WHERE username=? OR email=?",
      [username, email]
    );

    if (existing.length > 0)
      return res.json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashed]
    );

    res.json({ success: true, message: "Registration successful!", user: { id: result.insertId, username, email } });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password)
      return res.json({ success: false, message: "All fields required" });

    const [users] = await db.query(
      "SELECT * FROM user WHERE username=? OR email=?",
      [identifier, identifier]
    );

    if (users.length === 0)
      return res.json({ success: false, message: "Invalid credentials" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({ success: false, message: "Invalid credentials" });

    res.json({ success: true, message: "Login successful!", user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
});

export default router;
