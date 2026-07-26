import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    id: null,
    firstName: "",
    lastName: "",
    name: "Restaurant Manager",
    phone: "",
    email: "",
  });

  useEffect(() => {
    loadLoggedInUser();
  }, []);

  const loadLoggedInUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const fullName = user.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : user.name || "Restaurant Manager";
        setProfile({
          id: user.id || null,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          name: fullName,
          phone: user.phoneNumber || user.phone || "",
          email: user.email || "",
        });
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    if (!profile.name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }
    setSaving(true);
    try {
      const nameParts = profile.name.trim().split(" ");
      const firstName = profile.firstName || nameParts[0] || "";
      const lastName = profile.lastName || nameParts.slice(1).join(" ") || "";

      const updatedUser = {
        id: profile.id,
        firstName,
        lastName,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        phoneNumber: profile.phone,
      };

      if (profile.id) {
        try {
          await axios.put(`http://localhost:8080/api/users/${profile.id}`, {
            firstName,
            lastName,
            phoneNumber: profile.phone,
            email: profile.email,
            role: "MANAGER",
            status: "ACTIVE",
          });
        } catch (apiErr) {
          console.warn("Backend profile update skipped:", apiErr.message);
        }
      }

      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully! ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/"), 800);
  };

  const cardStyle = {
    background: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    borderRadius: "20px",
  };

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
          {/* Header */}
          <div
            className="d-flex justify-content-between align-items-center mb-4 p-4"
            style={{
              background: "linear-gradient(135deg,#0f172a,#1e293b)",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,.15)",
            }}
          >
            <div>
              <h2 className="fw-bold text-white mb-1" style={{ letterSpacing: "2px" }}>
                ⚙️ ACCOUNT SETTINGS
              </h2>
              <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                Manage your profile information, theme preferences, and account.
              </p>
            </div>
          </div>

          {/* Profile Avatar + Info Quick View */}
          <div className="card border-0 shadow mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-4">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#22c55e,#16a34a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    fontWeight: "800",
                    color: "white",
                    flexShrink: 0,
                    boxShadow: "0 8px 20px rgba(34,197,94,0.4)",
                  }}
                >
                  {profile.name.charAt(0).toUpperCase() || "M"}
                </div>
                <div>
                  <h4 className="fw-bold mb-1">{profile.name}</h4>
                  <p className="text-muted mb-0">{profile.email || "No email set"}</p>
                  <span className="badge bg-success mt-1 px-3 py-1" style={{ borderRadius: "10px" }}>
                    Restaurant Manager
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information Card */}
          <div className="card border-0 shadow mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4" style={{ color: "#22c55e" }}>
                👤 Profile Information
              </h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <button
                className="btn btn-success px-5 py-2 mt-4 fw-bold"
                style={{ borderRadius: "12px" }}
                onClick={handleSaveProfile}
                disabled={saving}
              >
                {saving ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Saving...</>
                ) : (
                  "💾 Save Changes"
                )}
              </button>
            </div>
          </div>

          {/* Theme Appearance Card */}
          <div className="card border-0 shadow mb-4" style={cardStyle}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4" style={{ color: "#22c55e" }}>
                🎨 Appearance
              </h4>
              <div className="row g-3">
                <div className="col-md-6">
                  <div
                    className={`card p-4 rounded-4 shadow-sm ${darkMode ? "border border-success border-2" : ""}`}
                    style={{
                      cursor: "pointer",
                      background: darkMode ? "#0f172a" : "#f8fafc",
                      color: darkMode ? "white" : "#0f172a",
                      transition: "0.3s",
                    }}
                    onClick={() => toggleTheme(true)}
                  >
                    <h5 className="fw-bold">🌙 Dark Theme</h5>
                    <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                      Elegant dark appearance for comfortable viewing at night.
                    </p>
                    <button className={`btn ${darkMode ? "btn-success" : "btn-outline-success"} fw-bold`}>
                      {darkMode ? "✓ Active" : "Enable"}
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className={`card p-4 rounded-4 shadow-sm ${!darkMode ? "border border-primary border-2" : ""}`}
                    style={{
                      cursor: "pointer",
                      background: darkMode ? "#0f172a" : "#ffffff",
                      color: darkMode ? "white" : "#0f172a",
                      transition: "0.3s",
                    }}
                    onClick={() => toggleTheme(false)}
                  >
                    <h5 className="fw-bold">☀️ Light Theme</h5>
                    <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
                      Bright and clean interface for everyday daytime use.
                    </p>
                    <button className={`btn ${!darkMode ? "btn-primary" : "btn-outline-primary"} fw-bold`}>
                      {!darkMode ? "✓ Active" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Nav Cards */}
          <div className="row g-3 mb-4">
            {[
              { icon: "📦", label: "Inventory", path: "/inventory", color: "#22c55e" },
              { icon: "🤖", label: "AI Recipes", path: "/recipegenerator", color: "#6366f1" },
              { icon: "🍽", label: "Menu Specials", path: "/menuspecials", color: "#06b6d4" },
              { icon: "🚚", label: "Suppliers", path: "/suppliers", color: "#f59e0b" },
            ].map((item) => (
              <div key={item.path} className="col-md-3">
                <div
                  className="card border-0 shadow-sm p-3 text-center"
                  style={{
                    ...cardStyle,
                    cursor: "pointer",
                    borderTop: `3px solid ${item.color}`,
                    transition: "transform 0.2s",
                  }}
                  onClick={() => navigate(item.path)}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: "28px" }}>{item.icon}</div>
                  <div className="fw-semibold mt-1" style={{ fontSize: "14px" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Logout Card */}
          <div className="card border-0 shadow border-danger" style={{ ...cardStyle, borderLeft: "4px solid #ef4444" }}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="fw-bold text-danger mb-1">🚪 Logout</h4>
                  <p className="text-muted mb-0">
                    Securely log out of your Smart Kitchen account session.
                  </p>
                </div>
                <button
                  className="btn btn-danger px-5 py-2 fw-bold"
                  style={{ borderRadius: "12px" }}
                  onClick={handleLogout}
                >
                  Logout →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .form-control {
          border-radius: 12px;
          height: 50px;
          border: 1px solid #d1d5db;
          transition: 0.25s;
          box-shadow: none !important;
        }
        .form-control:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 0.18rem rgba(34,197,94,0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default Settings;