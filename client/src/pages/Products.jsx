import React, { useEffect, useState } from "react";
import { API_BASE } from "../config.js";
import { PRODUCT_IMAGES } from "../images.js";
import { LuShoppingCart, LuSprout, LuFlaskConical, LuWrench, LuPlus } from "react-icons/lu";
import styles from "./Products.module.css";

const CATEGORIES = [
  { key: "all", label: "All Products" },
  { key: "seed", label: "Seeds", icon: <LuSprout size={14} /> },
  { key: "fertilizer", label: "Fertilizers", icon: <LuFlaskConical size={14} /> },
  { key: "tool", label: "Tools", icon: <LuWrench size={14} /> },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((d) => { setProducts(d.data || []); setFiltered(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleFilter = (cat) => {
    setCategory(cat);
    setFiltered(cat === "all" ? products : products.filter((p) => p.category === cat));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, p) => s + p.qty, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.title}><LuShoppingCart size={26} style={{ marginRight: 8, verticalAlign: "middle" }} /> Our Products</h1>
            <p className={styles.sub}>Quality seeds, fertilizers & tools &mdash; direct from our 250+ farmer community</p>
          </div>
          {cartCount > 0 && (
            <div className={styles.cartBadge}><LuShoppingCart size={15} style={{ marginRight: 6 }} /> Cart: {cartCount} item{cartCount > 1 ? "s" : ""}</div>
          )}
        </div>

        <div className={styles.filters}>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`${styles.filterBtn} ${category === c.key ? styles.active : ""}`}
              onClick={() => handleFilter(c.key)}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {loading && <div className="loading">Loading products...</div>}

        <div className={styles.grid}>
          {filtered.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.cardImg}>
                {PRODUCT_IMAGES[p.name] ? (
                  <img src={PRODUCT_IMAGES[p.name]} alt={p.name} className={styles.cardImage} />
                ) : (
                  <span>{p.emoji}</span>
                )}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.catTag}>{p.category}</div>
                <div className={styles.productName}>{p.name}</div>
                <div className={styles.productDesc}>{p.description}</div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>&#8377;{p.price}/{p.unit}</span>
                  <span className={p.inStock ? styles.inStock : styles.outStock}>
                    {p.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <button
                  className={styles.addBtn}
                  onClick={() => addToCart(p)}
                  disabled={!p.inStock}
                >
                  <LuPlus size={14} style={{ marginRight: 4 }} /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}>No products found in this category.</div>
        )}
      </div>
    </div>
  );
}
