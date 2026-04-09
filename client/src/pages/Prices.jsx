import React, { useEffect, useState } from "react";
import { API_BASE } from "../config.js";
import styles from "./Prices.module.css";

export default function Prices() {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/prices`)
      .then((r) => r.json())
      .then((d) => { setPrice(d.data?.[0]); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const savings = price ? price.marketPrice - price.ourPrice : 0;
  const savingPct = price ? ((savings / price.marketPrice) * 100).toFixed(1) : 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>📊 Live Groundnut Prices</h1>
          <p className={styles.sub}>We always keep our price lower than the market. You save money every time!</p>
        </div>

        {loading && <div className="loading">Loading prices...</div>}

        {!loading && price && (
          <>
            {/* SAVINGS BANNER */}
            <div className={styles.saveBanner}>
              <span className={styles.saveBannerIcon}>💰</span>
              <span>
                Buy from us and save <strong>₹{savings}/quintal</strong> compared to market price!
                That's <strong>{savingPct}% cheaper</strong> than the market.
              </span>
            </div>

            {/* PRICE CARDS */}
            <div className={styles.priceGrid}>
              <div className={`${styles.priceCard} ${styles.marketCard}`}>
                <div className={styles.cardTag}>Market Price</div>
                <div className={styles.cardIcon}>🏪</div>
                <div className={styles.cardCrop}>Groundnut</div>
                <div className={styles.cardPrice}>₹{price.marketPrice.toLocaleString()}</div>
                <div className={styles.cardUnit}>per quintal</div>
                <div className={styles.cardNote}>This is what others charge</div>
              </div>

              <div className={`${styles.priceCard} ${styles.ourCard}`}>
                <div className={styles.cardTag}>Our Price</div>
                <div className={styles.cardIcon}>🥜</div>
                <div className={styles.cardCrop}>Groundnut</div>
                <div className={styles.cardPrice}>₹{price.ourPrice.toLocaleString()}</div>
                <div className={styles.cardUnit}>per quintal</div>
                <div className={styles.cardNote}>✅ You save ₹{savings}/quintal!</div>
              </div>
            </div>

            {/* HOW TO READ */}
            <div className={styles.infoBox}>
              <h3>📖 What does this mean?</h3>
              <p>
                <strong>Market Price</strong> is the price groundnuts are selling at in the open market today.<br />
                <strong>Our Price</strong> is what we charge you — always less than the market.<br />
                <strong>1 Quintal = 100 kg.</strong> So if you buy 100 kg from us, you save ₹{savings} compared to the market!
              </p>
            </div>

            {/* CHANGE INDICATOR */}
            <div className={styles.changeRow}>
              <span className={styles.liveLabel}><span className="live-dot" style={{width:8,height:8,background:'#22c55e',borderRadius:'50%',display:'inline-block',marginRight:6}} />Price last updated today</span>
              <span className={price.change >= 0 ? styles.up : styles.down}>
                {price.change >= 0 ? "▲" : "▼"} Market moved {Math.abs(price.change)}% today
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
