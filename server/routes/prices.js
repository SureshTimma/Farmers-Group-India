import express from "express";
import { mockPrices } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: mockPrices });
});

router.get("/:id", (req, res) => {
  const price = mockPrices.find((p) => p.id === parseInt(req.params.id));
  if (!price) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: price });
});

export default router;
