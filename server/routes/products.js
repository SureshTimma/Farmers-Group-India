import express from "express";
import { mockProducts } from "../data/mockData.js";

const router = express.Router();

router.get("/", (req, res) => {
  const { category } = req.query;
  const filtered = category && category !== "all"
    ? mockProducts.filter((p) => p.category === category)
    : mockProducts;
  res.json({ success: true, data: filtered });
});

router.get("/:id", (req, res) => {
  const product = mockProducts.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  res.json({ success: true, data: product });
});

export default router;
