import React, { useEffect, useState } from "react";
import { API_BASE } from "../config.js";
import { LuTrendingUp, LuTrendingDown, LuBadgeIndianRupee } from "react-icons/lu";
import styles from "./Ticker.module.css";

export default function Ticker() {
  const [price, setPrice] = useState({ marketPrice: 5800, ourPrice: 5500, change: +1.2 });

  useEffect(() => {
    fetch(`${API_BASE}/api/prices`)
      .then((r) => r.json())
      .then((d) => d.data?.[0] && setPrice(d.data[0]))
      .catch(() => {});
  }, []);

  const isUp = parseFloat(price.change) >= 0;

  return (
    <div className={styles.ticker}>
      <span className={styles.label}>
        <span className={styles.dot} /> Live Price
      </span>
      <span className={styles.item}>
        Groundnut &nbsp;
        <span className={styles.muted}>Market: &#8377;{price.marketPrice}/q</span>
        &nbsp;|&nbsp;
        <span className={styles.ourPrice}>Our Price: &#8377;{price.ourPrice}/q</span>
        &nbsp;
        <span className={isUp ? styles.up : styles.down}>
          {isUp ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />} {Math.abs(parseFloat(price.change))}%
        </span>
      </span>
      <span className={styles.save}>
        <LuBadgeIndianRupee size={14} style={{ marginRight: 4 }} />
        You save &#8377;{price.marketPrice - price.ourPrice}/quintal!
      </span>
    </div>
  );
}
