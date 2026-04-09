import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, crop, emoji, market_price AS \"marketPrice\", our_price AS \"ourPrice\", unit, change, last_updated AS \"lastUpdated\" FROM prices"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, crop, emoji, market_price AS \"marketPrice\", our_price AS \"ourPrice\", unit, change, last_updated AS \"lastUpdated\" FROM prices WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

export default router;
