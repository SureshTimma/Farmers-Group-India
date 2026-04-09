import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Ticker from "./components/Ticker.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Prices from "./pages/Prices.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Products from "./pages/Products.jsx";
import Seeds from "./pages/Seeds.jsx";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Ticker />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/products" element={<Products />} />
          <Route path="/seeds" element={<Seeds />} />
        </Routes>
      </main>
      <Footer />
      <a
        href="https://wa.me/919999999999?text=Hi%2C%20I%20am%20interested%20in%20your%20products"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed", bottom: 24, right: 24, width: 56, height: 56,
          background: "#25D366", borderRadius: "50%", display: "flex",
          alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          zIndex: 1000, fontSize: 28, textDecoration: "none", transition: "transform 0.2s",
        }}
        title="Chat with us on WhatsApp"
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        💬
      </a>
    </div>
  );
}
