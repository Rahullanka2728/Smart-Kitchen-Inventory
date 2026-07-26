import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import { getInventory } from "../services/inventoryApi";
import { getMenuSpecials } from "../services/menuSpecialsApi";
import { getSuppliers } from "../services/suppliersApi";
import { getAllRecipes } from "../services/recipesApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [stats, setStats] = useState({
    inventory: 0,
    expiring: 0,
    recipes: 0,
    menuSpecials: 0,
    suppliers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [expiringItems, setExpiringItems] = useState([]);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    setLoading(true);
    const today = new Date();

    const results = await Promise.allSettled([
      getInventory(),
      getAllRecipes(),
      getMenuSpecials(),
      getSuppliers(),
    ]);

    const [invRes, recRes, specRes, supRes] = results;

    let inventoryCount = 0;
    let expiringCount = 0;
    const expiring = [];

    if (invRes.status === "fulfilled" && Array.isArray(invRes.value)) {
      inventoryCount = invRes.value.length;
      invRes.value.forEach((item) => {
        if (!item.expiryDate) return;
        const expDate = new Date(item.expiryDate);
        const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
          expiringCount++;
          expiring.push({ ...item, daysLeft: diffDays });
        }
      });
      expiring.sort((a, b) => a.daysLeft - b.daysLeft);
      setExpiringItems(expiring);
    }

    setStats({
      inventory: inventoryCount,
      expiring: expiringCount,
      recipes: recRes.status === "fulfilled" && Array.isArray(recRes.value) ? recRes.value.length : 0,
      menuSpecials: specRes.status === "fulfilled" && Array.isArray(specRes.value) ? specRes.value.length : 0,
      suppliers: supRes.status === "fulfilled" && Array.isArray(supRes.value) ? supRes.value.length : 0,
    });

    setLoading(false);
  };

  const cards = [
    {
      icon: "📦",
      label: "Inventory Items",
      value: stats.inventory,
      sub: "Total Ingredients & Items",
      color: "#22c55e",
      textClass: "text-success",
      path: "/inventory",
    },
    {
      icon: "⏰",
      label: "Expiring Soon",
      value: stats.expiring,
      sub: "Items Near Expiry (≤7 days)",
      color: "#f59e0b",
      textClass: "text-warning",
      path: "/inventory",
    },
    {
      icon: "🤖",
      label: "AI Recipes",
      value: stats.recipes,
      sub: "AI Generated Recipes",
      color: "#6366f1",
      textClass: "text-primary",
      path: "/recipegenerator",
    },
    {
      icon: "🍽",
      label: "Menu Specials",
      value: stats.menuSpecials,
      sub: "Active Menu Specials",
      color: "#06b6d4",
      textClass: "text-info",
      path: "/menuspecials",
    },
    {
      icon: "🚚",
      label: "Suppliers",
      value: stats.suppliers,
      sub: "Registered Suppliers",
      color: "#ec4899",
      textClass: "text-danger",
      path: "/suppliers",
    },
  ];

  return (
    <div
      className="container-fluid p-0"
      style={{ background: darkMode ? "#0f172a" : "#f5f7fb", minHeight: "100vh" }}
    >
      <Navbar />

      <div className="row g-0">
        <Sidebar />

        {/* Main Content */}
        <div
          className="col-md-10 p-4"
          style={{ background: darkMode ? "#0f172a" : "#f5f7fb", minHeight: "100vh" }}
        >
          {/* Header Banner */}
          <div
            className="d-flex justify-content-between align-items-center mb-4 p-4"
            style={{
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            }}
          >
            <div>
              <h2 className="fw-bold text-white mb-1" style={{ letterSpacing: "2px" }}>
                DASHBOARD OVERVIEW
              </h2>
              <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                Real-time overview of your smart kitchen — inventory, recipes, menu specials &amp; suppliers.
              </p>
            </div>
            <button
              className="btn btn-success btn-lg"
              style={{
                borderRadius: "14px",
                padding: "12px 28px",
                fontWeight: "700",
                boxShadow: "0 10px 30px rgba(34,197,94,0.35)",
              }}
              onClick={loadDashboardStats}
              disabled={loading}
            >
              {loading ? "⟳ Loading..." : "🔄 Refresh Data"}
            </button>
          </div>

          {/* Metric Cards */}
          <div className="row g-4 mb-4">
            {cards.map((card) => (
              <div key={card.label} className="col-lg col-md-6">
                <div
                  className="card border-0 shadow h-100 dashboard-card"
                  style={{
                    borderRadius: "20px",
                    cursor: "pointer",
                    background: darkMode ? "#1e293b" : "#ffffff",
                    color: darkMode ? "white" : "#0f172a",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    borderTop: `4px solid ${card.color}`,
                  }}
                  onClick={() => navigate(card.path)}
                >
                  <div className="card-body text-center p-4">
                    <div style={{ fontSize: "42px" }}>{card.icon}</div>
                    <h6 className="mt-3 fw-bold text-muted">{card.label}</h6>
                    <h1 className={`${card.textClass} fw-bold display-5 my-2`}>
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" style={{ color: card.color }} />
                      ) : (
                        card.value
                      )}
                    </h1>
                    <small className="text-muted">{card.sub}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expiring Items Table */}
          {expiringItems.length > 0 && (
            <div
              className="card border-0 shadow mb-4"
              style={{
                borderRadius: "20px",
                background: darkMode ? "#1e293b" : "#ffffff",
                borderLeft: "4px solid #f59e0b",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold mb-0" style={{ color: darkMode ? "#fff" : "#0f172a" }}>
                    ⚠️ Items Expiring Within 7 Days
                  </h5>
                  <button
                    className="btn btn-warning btn-sm fw-bold"
                    style={{ borderRadius: "10px" }}
                    onClick={() => navigate("/inventory")}
                  >
                    View All →
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead
                      style={{
                        background: "linear-gradient(90deg,#0f172a,#1e293b)",
                        color: "white",
                      }}
                    >
                      <tr>
                        <th style={{ borderRadius: "10px 0 0 0" }}>#</th>
                        <th>Ingredient</th>
                        <th>Qty</th>
                        <th>Unit</th>
                        <th>Expiry Date</th>
                        <th>Days Left</th>
                        <th style={{ borderRadius: "0 10px 0 0" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expiringItems.slice(0, 8).map((item, idx) => {
                        const dl = item.daysLeft;
                        const statusColor =
                          dl < 0 ? "danger" : dl === 0 ? "danger" : dl <= 3 ? "warning" : "info";
                        const statusLabel =
                          dl < 0 ? "Expired" : dl === 0 ? "Expires Today!" : `${dl} days`;
                        return (
                          <tr key={item.id} style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}>
                            <td>{idx + 1}</td>
                            <td>
                              <span className="badge bg-success px-2 py-1" style={{ fontSize: "13px" }}>
                                {item.ingredient?.ingredientName || "—"}
                              </span>
                            </td>
                            <td>{item.availableQuantity}</td>
                            <td>{item.unit}</td>
                            <td>{item.expiryDate}</td>
                            <td>
                              <span className={`badge bg-${statusColor}`}>{statusLabel}</span>
                            </td>
                            <td>
                              <span className={`badge bg-${statusColor}`}>{item.status || statusLabel}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.18) !important;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;