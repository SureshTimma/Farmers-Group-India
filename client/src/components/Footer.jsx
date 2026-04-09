import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>🌾 Framers Group of India</div>
          <p>A community of 250+ farmers working together for better prices, better lives.</p>
          <p className={styles.tagline}>From Soil to Supply Chain</p>
        </div>
        <div className={styles.col}>
          <h4>Quick Links</h4>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/prices">Market Prices</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/seeds">Seeds & Industries</NavLink>
          <NavLink to="/track-order">Track My Order</NavLink>
        </div>
        <div className={styles.col}>
          <h4>Contact Us</h4>
          <p>📞 1800-XXX-XXXX (Toll Free)</p>
          <p>📧 info@framersgroup.in</p>
          <p>📍 India</p>
        </div>
      </div>
      <div className={styles.bottom}>
        © 2024 Framers Group of India. All rights reserved. | Community of 250+ Farmers 🌾
      </div>
    </footer>
  );
}
