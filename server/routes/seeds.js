import express from "express";
import { mockSeeds } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true, data: mockSeeds });
});

router.get("/:id", (req, res) => {
  const seed = mockSeeds.find((s) => s.id === parseInt(req.params.id));
  if (!seed) return res.status(404).json({ success: false, message: "Seed not found" });
  res.json({ success: true, data: seed });
});

export default router;
