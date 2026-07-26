import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getInventory } from "../services/inventoryApi";

function ExpiryNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dismissedNotifs") || "[]");
    } catch {
      return [];
    }
  });

  const checkExpiry = useCallback(async () => {
    try {
      const inventory = await getInventory();
      if (!Array.isArray(inventory)) return;

      const today = new Date();
      const alerts = [];

      inventory.forEach((item) => {
        const name = item.ingredient?.ingredientName || "Unknown Item";
        const id = item.id;

        if (!item.expiryDate) return;

        const expDate = new Date(item.expiryDate);
        const diffMs = expDate - today;
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          alerts.push({
            id: `exp-${id}`,
            itemId: id,
            name,
            expiryDate: item.expiryDate,
            daysLeft: diffDays,
            type: "expired",
            label: "EXPIRED",
            color: "#ef4444",
            bg: "#fef2f2",
            icon: "☠️",
          });
        } else if (diffDays === 0) {
          alerts.push({
            id: `exp-${id}`,
            itemId: id,
            name,
            expiryDate: item.expiryDate,
            daysLeft: 0,
            type: "today",
            label: "Expires TODAY",
            color: "#dc2626",
            bg: "#fff7ed",
            icon: "🚨",
          });
        } else if (diffDays <= 3) {
          alerts.push({
            id: `exp-${id}`,
            itemId: id,
            name,
            expiryDate: item.expiryDate,
            daysLeft: diffDays,
            type: "critical",
            label: `${diffDays} day${diffDays > 1 ? "s" : ""} left`,
            color: "#f97316",
            bg: "#fff7ed",
            icon: "⚠️",
          });
        } else if (diffDays <= 7) {
          alerts.push({
            id: `exp-${id}`,
            itemId: id,
            name,
            expiryDate: item.expiryDate,
            daysLeft: diffDays,
            type: "warning",
            label: `${diffDays} days left`,
            color: "#eab308",
            bg: "#fefce8",
            icon: "⏰",
          });
        }
      });

      // Sort: expired first, then by days left ascending
      alerts.sort((a, b) => a.daysLeft - b.daysLeft);
      setNotifications(alerts);
    } catch (err) {
      console.error("Notification check failed:", err);
    }
  }, []);

  useEffect(() => {
    checkExpiry();
    // Re-check every 5 minutes
    const interval = setInterval(checkExpiry, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkExpiry]);

  const activeNotifs = notifications.filter((n) => !dismissed.includes(n.id));
  const badgeCount = activeNotifs.length;

  const dismissOne = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    localStorage.setItem("dismissedNotifs", JSON.stringify(next));
  };

  const dismissAll = () => {
    const next = [...dismissed, ...activeNotifs.map((n) => n.id)];
    setDismissed(next);
    localStorage.setItem("dismissedNotifs", JSON.stringify(next));
    setShowPanel(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Bell Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "relative",
          padding: "6px 10px",
        }}
        title={`${badgeCount} expiry alert${badgeCount !== 1 ? "s" : ""}`}
      >
        <span style={{ fontSize: "24px" }}>🔔</span>
        {badgeCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: "#ef4444",
              color: "white",
              borderRadius: "50%",
              fontSize: "11px",
              fontWeight: "800",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse 2s infinite",
            }}
          >
            {badgeCount > 99 ? "99+" : badgeCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {showPanel && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
            }}
            onClick={() => setShowPanel(false)}
          />

          {/* Panel */}
          <div
            style={{
              position: "absolute",
              top: "48px",
              right: 0,
              width: "380px",
              maxHeight: "520px",
              overflowY: "auto",
              background: "#1e293b",
              borderRadius: "18px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.12)",
              zIndex: 1000,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                background: "linear-gradient(135deg,#0f172a,#1e293b)",
                borderRadius: "18px 18px 0 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h6 className="fw-bold text-white mb-0">🔔 Expiry Alerts</h6>
                <small style={{ color: "#94a3b8" }}>
                  {activeNotifs.length} item{activeNotifs.length !== 1 ? "s" : ""} need attention
                </small>
              </div>
              <div className="d-flex gap-2">
                <button
                  onClick={checkExpiry}
                  title="Refresh"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "none",
                    borderRadius: "8px",
                    padding: "4px 10px",
                    cursor: "pointer",
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  🔄
                </button>
                {activeNotifs.length > 0 && (
                  <button
                    onClick={dismissAll}
                    style={{
                      background: "rgba(239,68,68,0.15)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      borderRadius: "8px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      color: "#fca5a5",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div style={{ padding: "8px" }}>
              {activeNotifs.length === 0 ? (
                <div className="text-center py-5">
                  <div style={{ fontSize: "40px" }}>✅</div>
                  <p className="text-muted mt-2 mb-0" style={{ fontSize: "14px" }}>
                    All items are fresh! No expiry alerts.
                  </p>
                </div>
              ) : (
                activeNotifs.map((notif) => (
                  <div
                    key={notif.id}
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      borderRadius: "12px",
                      padding: "12px 14px",
                      marginBottom: "6px",
                      borderLeft: `3px solid ${notif.color}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span>{notif.icon}</span>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#f1f5f9",
                          }}
                        >
                          {notif.name}
                        </span>
                        <span
                          className="badge"
                          style={{
                            background: notif.color,
                            color: "white",
                            fontSize: "10px",
                            borderRadius: "6px",
                          }}
                        >
                          {notif.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                        Expiry: {notif.expiryDate}
                      </div>
                    </div>

                    <div className="d-flex flex-column gap-1 align-items-end">
                      <button
                        onClick={() => {
                          setShowPanel(false);
                          navigate("/inventory");
                        }}
                        style={{
                          background: "rgba(34,197,94,0.15)",
                          border: "1px solid rgba(34,197,94,0.3)",
                          borderRadius: "6px",
                          padding: "3px 8px",
                          cursor: "pointer",
                          color: "#22c55e",
                          fontSize: "11px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}
                      >
                        View →
                      </button>
                      <button
                        onClick={() => dismissOne(notif.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#64748b",
                          fontSize: "16px",
                          padding: "0 4px",
                          lineHeight: 1,
                        }}
                        title="Dismiss"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {activeNotifs.length > 0 && (
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}
              >
                <button
                  className="btn btn-sm btn-outline-warning w-100 fw-bold"
                  style={{ borderRadius: "10px" }}
                  onClick={() => {
                    setShowPanel(false);
                    navigate("/inventory");
                  }}
                >
                  📦 View All in Inventory
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default ExpiryNotifications;
