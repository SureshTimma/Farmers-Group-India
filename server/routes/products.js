import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let query = `SELECT id, name, category, emoji, price, unit, description, in_stock AS "inStock" FROM products`;
    const params = [];

    if (category && category !== "all") {
      query += " WHERE category = $1";
      params.push(category);
    }

    const result = await pool.query(query, params);
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, category, emoji, price, unit, description, in_stock AS "inStock" FROM products WHERE id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: "Product not found" });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

export default router;
