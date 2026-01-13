import express from "express";
import db from "../db.js";
const router = express.Router();

console.log("Connecting with:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim();
    const sanitizedSubject = subject.trim();
    const sanitizedMessage = message.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    await db.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage]
    );

    res.json({ success: true, message: "Message sent successfully" });

  } catch (err) {
    console.error("Contact insert failed:", err);
    res.json({ success: false, message: "Server error. Try again later." });
  }
});

export default router;
