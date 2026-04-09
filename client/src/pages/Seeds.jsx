import React, { useEffect, useState } from "react";
import { API_BASE } from "../config.js";
import { SEED_IMAGES } from "../images.js";
import { LuSprout, LuFactory, LuMapPin, LuChevronUp, LuChevronDown, LuCalendar, LuPackage } from "react-icons/lu";
import styles from "./Seeds.module.css";

export default function Seeds() {
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/seeds`)
      .then((r) => r.json())
      .then((d) => { setSeeds(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}><LuSprout size={26} style={{ marginRight: 8, verticalAlign: "middle" }} /> Seeds & Their Uses</h1>
          <p className={styles.sub}>Learn which seed is used in which industry &mdash; tap any seed to see more</p>
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
                  <div className={styles.iconWrap}>
                    {SEED_IMAGES[seed.name] ? (
                      <img src={SEED_IMAGES[seed.name]} alt={seed.name} className={styles.seedImg} />
                    ) : (
                      seed.emoji
                    )}
                  </div>
                  <div className={styles.cardInfo}>
                    <div className={styles.seedName}>{seed.name}</div>
                    <div className={styles.seedDesc}>{seed.description}</div>
                    <div className={styles.metaRow}>
                      <span className={styles.meta}><LuCalendar size={11} style={{ marginRight: 3 }} />{seed.season} crop</span>
                      <span className={styles.meta}><LuPackage size={11} style={{ marginRight: 3 }} />Yield: {seed.yieldPerAcre}</span>
                    </div>
                  </div>
                  <div className={styles.arrow}>{isOpen ? <LuChevronUp size={18} /> : <LuChevronDown size={18} />}</div>
                </div>

                {isOpen && (
                  <div className={styles.cardDetail}>
                    <div className={styles.industrySection}>
                      <h4 className={styles.detailTitle}><LuFactory size={14} style={{ marginRight: 6 }} />Used in These Industries</h4>
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
                      <h4 className={styles.detailTitle}><LuMapPin size={14} style={{ marginRight: 6 }} />Grown in These States</h4>
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
