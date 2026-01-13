
import express from "express";
import { checkLogin, getUserId } from "../auth/session.js"; 
import db from "../db";

const router = express.Router();

router.delete("/", checkLogin, async (req, res) => {
  try {
    const userId = getUserId(req); 

    const [result] = await db.execute(
      "DELETE FROM search_history WHERE user_id = ?",
      [userId]
    );

    res.json({ success: true, message: "Search history cleared" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Failed to clear history" });
  }
});

export default router;
