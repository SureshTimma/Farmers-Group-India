import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const stats = [
  { value: "250+", label: "Farmer Community" },
  { value: "14+", label: "States Served" },
  { value: "10k+", label: "Tons Exported" },
  { value: "100%", label: "Quality Assured" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.trustBadge}>🌱 Trusted Since 2021</div>
          <h1 className={styles.heroTitle}>
            Premium{" "}
            <span className={styles.amber}>Groundnuts</span>
            <br />
            From Farm to
            <br />
            Globe
          </h1>
          <p className={styles.heroDesc}>
            Journey with us from a local seed supplier to a global groundnut
            export leader. A community of 250+ farmers delivering quality,
            sustainability, and excellence at every stage.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate("/products")}>
              Explore Our Products →
            </button>
            <button className={styles.btnOutline} onClick={() => navigate("/prices")}>
              🌐 See Live Prices
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroImgWrap}>
            <img
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=700&q=80"
              alt="Fresh groundnuts"
              className={styles.heroImg}
            />
            <div className={styles.promiseCard}>
              <div className={styles.promiseTitle}>Our Promise</div>
              <p className={styles.promiseText}>
                Delivering nature's finest groundnuts with uncompromising
                quality and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.statsBar}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.statNum}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* WHY US */}
      <section className={styles.whySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Framers Group?</h2>
          <p className={styles.sectionSub}>We are a community — not just a company</p>
        </div>
        <div className={styles.whyGrid}>
          {[
            { icon: "🤝", title: "250+ Farmer Community", desc: "Real farmers, real prices. No middlemen cutting your profits." },
            { icon: "💰", title: "Best Market Prices", desc: "We show you the market price and our price — you always save money." },
            { icon: "📦", title: "Live Order Tracking", desc: "Know where your order is at every step, from packing to delivery." },
            { icon: "🌱", title: "Quality Seeds", desc: "All seeds tested and certified. High yield guaranteed." },
            { icon: "🚚", title: "Fast Delivery", desc: "Delivered directly to your farm in 3–5 days across India." },
            { icon: "📞", title: "Simple Support", desc: "Call us anytime. We speak your language and understand your needs." },
          ].map((w) => (
            <div key={w.title} className={styles.whyCard}>
              <div className={styles.whyIcon}>{w.icon}</div>
              <h3 className={styles.whyTitle}>{w.title}</h3>
              <p className={styles.whyDesc}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className={styles.quickLinks}>
        {[
          { icon: "📊", label: "See Groundnut\nMarket Price", path: "/prices", color: "#eaf3de" },
          { icon: "📦", label: "Track My\nOrder", path: "/track-order", color: "#fff8e1" },
          { icon: "🛒", label: "Browse\nProducts", path: "/products", color: "#e8f4fd" },
          { icon: "🌱", label: "Seeds &\nIndustries", path: "/seeds", color: "#fce8e8" },
        ].map((q) => (
          <button
            key={q.path}
            className={styles.quickBtn}
            style={{ background: q.color }}
            onClick={() => navigate(q.path)}
          >
            <span className={styles.quickIcon}>{q.icon}</span>
            <span className={styles.quickLabel}>{q.label}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
