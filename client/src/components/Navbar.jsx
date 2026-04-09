import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/prices", label: "Prices" },
  { to: "/products", label: "Products" },
  { to: "/seeds", label: "Seeds" },
  { to: "/track-order", label: "Track Order" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoIcon}>🌾</div>
          <div>
            <div className={styles.logoName}>Framers Group</div>
            <div className={styles.logoTagline}>From Soil to Supply Chain</div>
          </div>
        </NavLink>

        <div className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
