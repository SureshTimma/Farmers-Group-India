import React, { useEffect, useState } from "react";
import styles from "./Seeds.module.css";

export default function Seeds() {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/seeds`)
      .then((r) => r.json())
      .then((d) => { setSeeds(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>🌱 Seeds & Their Uses</h1>
          <p className={styles.sub}>Learn which seed is used in which industry — tap any seed to see more</p>
        </div>

        {loading && <div className="loading">Loading seeds...</div>}

        <div className={styles.list}>
          {seeds.map((seed) => {
            const isOpen = expanded === seed.id;
            return (
              <div
                key={seed.id}
                className={`${styles.card} ${isOpen ? styles.open : ""}`}
                onClick={() => setExpanded(isOpen ? null : seed.id)}
              >
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>{seed.emoji}</div>
                  <div className={styles.cardInfo}>
                    <div className={styles.seedName}>{seed.name}</div>
                    <div className={styles.seedDesc}>{seed.description}</div>
                    <div className={styles.metaRow}>
                      <span className={styles.meta}>📅 {seed.season} crop</span>
                      <span className={styles.meta}>📦 Yield: {seed.yieldPerAcre}</span>
                    </div>
                  </div>
                  <div className={styles.arrow}>{isOpen ? "▲" : "▼"}</div>
                </div>

                {isOpen && (
                  <div className={styles.cardDetail}>
                    <div className={styles.industrySection}>
                      <h4 className={styles.detailTitle}>🏭 Used in These Industries</h4>
                      <div className={styles.industryGrid}>
                        {seed.industries.map((ind) => (
                          <div key={ind.name} className={styles.industryChip}>
                            <span>{ind.icon}</span>
                            <span>{ind.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.statesSection}>
                      <h4 className={styles.detailTitle}>📍 Grown in These States</h4>
                      <div className={styles.statesList}>
                        {seed.states.map((s) => (
                          <span key={s} className={styles.stateTag}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
