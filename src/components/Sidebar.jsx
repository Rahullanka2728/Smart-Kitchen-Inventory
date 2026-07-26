import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: "🏠" },
  { path: "/inventory", label: "Inventory", icon: "📦" },
  { path: "/recipegenerator", label: "AI Recipes", icon: "🤖" },
  { path: "/menuspecials", label: "Menu Specials", icon: "🍽" },
  { path: "/suppliers", label: "Suppliers", icon: "🚚" },
  { path: "/settings", label: "Settings", icon: "⚙️" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="col-md-2 text-white"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #111827, #1f2937)",
        boxShadow: "4px 0 15px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="p-4">
        <h4 className="mb-4" style={{ color: "#22c55e", fontWeight: "700", letterSpacing: "1px" }}>
          MENU
        </h4>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className="d-flex align-items-center gap-2 mb-3 px-3 py-2 sidebar-item"
              style={{
                borderRadius: "12px",
                cursor: "pointer",
                background: isActive ? "rgba(34,197,94,0.18)" : "transparent",
                color: isActive ? "#22c55e" : "#e2e8f0",
                fontWeight: isActive ? "700" : "400",
                transition: "all 0.2s ease",
                borderLeft: isActive ? "3px solid #22c55e" : "3px solid transparent",
              }}
              onClick={() => navigate(item.path)}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        .sidebar-item:hover {
          background: rgba(255,255,255,0.07) !important;
          color: #22c55e !important;
        }
      `}</style>
    </div>
  );
}

export default Sidebar;
