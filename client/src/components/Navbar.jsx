import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { LuWheat, LuHouse, LuChartBar, LuShoppingCart, LuSprout, LuPackageSearch, LuMenu, LuX } from "react-icons/lu";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", label: "Home", icon: <LuHouse size={16} /> },
  { to: "/prices", label: "Prices", icon: <LuChartBar size={16} /> },
  { to: "/products", label: "Products", icon: <LuShoppingCart size={16} /> },
  { to: "/seeds", label: "Seeds", icon: <LuSprout size={16} /> },
  { to: "/track-order", label: "Track Order", icon: <LuPackageSearch size={16} /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <div className={styles.logoIcon}><LuWheat size={22} /></div>
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
              {l.icon} {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
        </button>
      </div>
    </nav>
  );
}
