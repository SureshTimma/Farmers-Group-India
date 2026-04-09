import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pricesRouter from "./routes/prices.js";
import ordersRouter from "./routes/orders.js";
import productsRouter from "./routes/products.js";
import seedsRouter from "./routes/seeds.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Framers Group of India API is running 🌾" });
});

app.use("/api/prices", pricesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/seeds", seedsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
