import express from "express";
import { mockOrders } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: mockOrders });
});

router.get("/:orderId", (req, res) => {
  const order = mockOrders.find(
    (o) => o.orderId.toLowerCase() === req.params.orderId.toLowerCase()
  );
  if (!order)
    return res.status(404).json({ success: false, message: "Order not found. Please check your Order ID." });
  res.json({ success: true, data: order });
});

export default router;
