import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT order_id AS "orderId", customer_name AS "customerName", product, quantity, status,
       ordered_on AS "orderedOn", expected_date AS "expectedDate", current_location AS "currentLocation",
       steps, current_step AS "currentStep" FROM orders`
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT order_id AS "orderId", customer_name AS "customerName", product, quantity, status,
       ordered_on AS "orderedOn", expected_date AS "expectedDate", current_location AS "currentLocation",
       steps, current_step AS "currentStep" FROM orders WHERE LOWER(order_id) = LOWER($1)`,
      [req.params.orderId]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: "Order not found. Please check your Order ID." });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "Database error" });
  }
});

export default router;
