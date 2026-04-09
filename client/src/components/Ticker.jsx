import React, { useEffect, useState } from "react";
import styles from "./Ticker.module.css";

export default function Ticker() {
  const [price, setPrice] = useState({ marketPrice: 5800, ourPrice: 5500, change: +1.2 });

  const API_BASE = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/api/prices`)
      .then((r) => r.json())
      .then((d) => d.data?.[0] && setPrice(d.data[0]))
      .catch(() => {});
  }, []);

  const isUp = price.change >= 0;

  return (
    <div className={styles.ticker}>
      <span className={styles.label}>
        <span className={styles.dot} /> Live Price
      </span>
      <span className={styles.item}>
        🥜 Groundnut &nbsp;
        <span className={styles.muted}>Market: ₹{price.marketPrice}/q</span>
        &nbsp;|&nbsp;
        <span className={styles.ourPrice}>Our Price: ₹{price.ourPrice}/q</span>
        &nbsp;
        <span className={isUp ? styles.up : styles.down}>
          {isUp ? "▲" : "▼"} {Math.abs(price.change)}%
        </span>
      </span>
      <span className={styles.save}>
        💰 You save ₹{price.marketPrice - price.ourPrice}/quintal when you buy from us!
      </span>
    </div>
  );
}
