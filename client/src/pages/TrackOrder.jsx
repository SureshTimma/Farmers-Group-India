import React, { useState } from "react";
import { API_BASE } from "../config.js";
import { LuPackageSearch, LuSearch, LuClipboardList, LuPackage, LuTruck, LuHouse, LuMapPin, LuCalendar, LuCrosshair, LuUser, LuCheck } from "react-icons/lu";
import styles from "./TrackOrder.module.css";

const STEPS = ["Order Placed", "Packed & Ready", "On the Way", "Delivered"];
const STEP_ICONS = [<LuClipboardList size={16} />, <LuPackage size={16} />, <LuTruck size={16} />, <LuHouse size={16} />];

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!orderId.trim()) { setError("Please enter your Order ID"); return; }
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId.trim()}`);
      const data = await res.json();
      if (!data.success) { setError(data.message || "Order not found"); }
      else { setOrder(data.data); }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}><LuPackageSearch size={26} style={{ marginRight: 8, verticalAlign: "middle" }} /> Track Your Order</h1>
          <p className={styles.sub}>Enter your Order ID to see where your order is right now</p>
        </div>

        <div className={styles.searchBox}>
          <label className={styles.label}>Your Order ID</label>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g. FGI-2024-1053"
            />
            <button className={styles.trackBtn} onClick={handleTrack} disabled={loading}>
              {loading ? "Searching..." : <><LuSearch size={16} /> Track</>}
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <p className={styles.hint}>Try: FGI-2024-1053 or FGI-2024-1001</p>
        </div>

        {order && (
          <div className={styles.result}>
            <div className={styles.resultHead}>
              <div>
                <div className={styles.orderId}>Order ID: {order.orderId}</div>
                <div className={styles.productName}>{order.product} &mdash; {order.quantity}</div>
                <div className={styles.customer}><LuUser size={13} style={{ marginRight: 4 }} />{order.customerName}</div>
              </div>
              <div className={styles.statusBadge} data-status={order.status}>
                {order.status === "delivered" ? <><LuCheck size={14} /> Delivered</> :
                 order.status === "shipped" ? <><LuTruck size={14} /> On the Way</> :
                 order.status === "packed" ? <><LuPackage size={14} /> Packed</> : <><LuClipboardList size={14} /> Placed</>}
              </div>
            </div>

            <div className={styles.dates}>
              <span><LuCalendar size={13} style={{ marginRight: 4 }} />Ordered: {new Date(order.orderedOn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
              <span><LuCrosshair size={13} style={{ marginRight: 4 }} />Expected: {new Date(order.expectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>

            {/* PROGRESS STEPS */}
            <div className={styles.stepsWrap}>
              {STEPS.map((step, i) => {
                const isDone = i < order.currentStep;
                const isActive = i === order.currentStep;
                return (
                  <React.Fragment key={step}>
                    <div className={`${styles.step} ${isDone ? styles.done : ""} ${isActive ? styles.active : ""}`}>
                      <div className={styles.stepDot}>
                        {isDone ? <LuCheck size={14} /> : STEP_ICONS[i]}
                      </div>
                      <div className={styles.stepLabel}>{step}</div>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`${styles.connector} ${isDone ? styles.connDone : ""}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {order.status !== "delivered" && (
              <div className={styles.locationBox}>
                <LuMapPin size={14} style={{ marginRight: 6 }} /> Your order is currently at: <strong>{order.currentLocation}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
