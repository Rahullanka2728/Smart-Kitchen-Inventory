import React from "react";
import { useNavigate } from "react-router-dom";
import ExpiryNotifications from "./ExpiryNotifications";

function Navbar({ title = "Smart Kitchen Dashboard" }) {
  const navigate = useNavigate();

  const currentUser = (() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "{}");
      return u.firstName ? `${u.firstName} ${u.lastName || ""}`.trim() : "Manager";
    } catch {
      return "Manager";
    }
  })();

  return (
    <nav
      className="navbar navbar-dark px-4"
      style={{
        background: "linear-gradient(90deg, #111827, #1f2937)",
        height: "70px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h3
        className="m-0 fw-bold"
        style={{ color: "#22c55e", letterSpacing: "1px", cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        🍽 {title}
      </h3>

      <div className="d-flex align-items-center gap-3">
        {/* Expiry Notification Bell */}
        <ExpiryNotifications />

        {/* User Info */}
        <div
          className="d-flex align-items-center gap-2 text-white fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/settings")}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "14px",
            }}
          >
            {currentUser.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: "14px" }}>{currentUser} 👋</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
