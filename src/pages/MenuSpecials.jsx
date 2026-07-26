import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

import {
  getMenuSpecials,
  addMenuSpecial,
  updateMenuSpecial,
  deleteMenuSpecial,
} from "../services/menuSpecialsApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EMPTY_SPECIAL = {
  specialName: "",
  description: "",
  price: "",
  category: "",
  startDate: "",
  endDate: "",
  status: "Active",
};

function MenuSpecials() {
  const { darkMode } = useTheme();

  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [newSpecial, setNewSpecial] = useState(EMPTY_SPECIAL);

  useEffect(() => {
    fetchSpecials();
  }, []);

  const fetchSpecials = async () => {
    try {
      setLoading(true);
      const data = await getMenuSpecials();
      setSpecials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching menu specials:", err);
      toast.error("Failed to load menu specials");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewSpecial({ ...newSpecial, [e.target.name]: e.target.value });
  };

  const handleEdit = (special) => {
    setEditingId(special.id);
    setNewSpecial({
      specialName: special.specialName || "",
      description: special.description || "",
      price: special.price || "",
      category: special.category || "",
      startDate: special.startDate || "",
      endDate: special.endDate || "",
      status: special.status || "Active",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewSpecial(EMPTY_SPECIAL);
  };

  const handleSave = async () => {
    if (!newSpecial.specialName.trim()) {
      toast.warning("Special Name is required");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateMenuSpecial(editingId, newSpecial);
        toast.success("Menu Special updated ✅");
      } else {
        await addMenuSpecial(newSpecial);
        toast.success("Menu Special added ✅");
      }
      handleCloseModal();
      await fetchSpecials();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save menu special");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu special?")) return;
    try {
      await deleteMenuSpecial(id);
      toast.success("Menu special deleted");
      fetchSpecials();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete menu special");
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return specials;
    return specials.filter(
      (s) =>
        s.specialName?.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.category?.toLowerCase().includes(q)
    );
  }, [specials, search]);

  const cardStyle = {
    background: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    borderRadius: "18px",
  };

  const categoryColors = {
    Appetizer: "#f59e0b",
    "Main Course": "#22c55e",
    Dessert: "#ec4899",
    Beverage: "#6366f1",
    Special: "#06b6d4",
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
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            }}
          >
            <div>
              <h2 className="fw-bold text-white mb-1" style={{ letterSpacing: "2px" }}>
                🍽 MENU SPECIALS
              </h2>
              <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                {specials.filter((s) => s.status === "Active").length} active specials
              </p>
            </div>
            <button
              className="btn btn-success btn-lg fw-bold"
              style={{ borderRadius: "14px", padding: "12px 30px" }}
              onClick={() => { setEditingId(null); setNewSpecial(EMPTY_SPECIAL); setShowModal(true); }}
            >
              + ADD SPECIAL
            </button>
          </div>

          {/* Search */}
          <div className="card border-0 shadow-sm mb-4" style={{ ...cardStyle }}>
            <div className="card-body p-3">
              <div className="d-flex gap-3 align-items-center">
                <div className="input-group" style={{ flex: 1 }}>
                  <span
                    className="input-group-text border-0"
                    style={{ background: darkMode ? "#0f172a" : "#f8fafc" }}
                  >
                    🔍
                  </span>
                  <input
                    className="form-control border-0"
                    placeholder="Search specials..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      height: "48px",
                      background: darkMode ? "#0f172a" : "#f8fafc",
                      color: darkMode ? "#f1f5f9" : "#0f172a",
                    }}
                  />
                  {search && (
                    <button
                      className="input-group-text border-0"
                      style={{ background: darkMode ? "#0f172a" : "#f8fafc", cursor: "pointer" }}
                      onClick={() => setSearch("")}
                    >
                      ×
                    </button>
                  )}
                </div>
                <small className="text-muted text-nowrap">
                  {filtered.length} of {specials.length}
                </small>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-5 p-4"
              style={{ ...cardStyle, border: "1px dashed #64748b" }}
            >
              <div style={{ fontSize: "52px" }}>🍽</div>
              <h5 className="fw-bold mt-2">
                {search ? "No specials match your search." : "No Menu Specials Found"}
              </h5>
              {!search && <p className="text-muted">Click <b>+ ADD SPECIAL</b> to create your first menu special!</p>}
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((item) => {
                const catColor = categoryColors[item.category] || "#6366f1";
                return (
                  <div key={item.id} className="col-lg-4 col-md-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        ...cardStyle,
                        borderTop: `4px solid ${catColor}`,
                        transition: "transform 0.25s, box-shadow 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <span
                            className="badge"
                            style={{ background: catColor, color: "white", borderRadius: "8px", fontSize: "11px" }}
                          >
                            {item.category || "Special"}
                          </span>
                          <span
                            className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}
                            style={{ borderRadius: "8px", fontSize: "11px" }}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h5 className="fw-bold mt-2 mb-1" style={{ color: darkMode ? "#fff" : "#0f172a" }}>
                          {item.specialName}
                        </h5>

                        <p className="text-muted small mb-3" style={{ minHeight: "40px" }}>
                          {item.description || "No description provided."}
                        </p>

                        {item.startDate && (
                          <div className="small text-muted mb-2">
                            📅 {item.startDate} {item.endDate && `→ ${item.endDate}`}
                          </div>
                        )}

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <h4 className="fw-bold mb-0" style={{ color: catColor }}>
                            {item.price ? `₹ ${item.price}` : "Price TBD"}
                          </h4>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-primary"
                              style={{ borderRadius: "8px" }}
                              onClick={() => handleEdit(item)}
                            >
                              ✏
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              style={{ borderRadius: "8px" }}
                              onClick={() => handleDelete(item.id)}
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && handleCloseModal()}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0" style={{ borderRadius: "22px", overflow: "hidden" }}>
              <div
                className="modal-header"
                style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", color: "white" }}
              >
                <h4 className="fw-bold mb-0">
                  {editingId ? "✏️ EDIT MENU SPECIAL" : "🍽 ADD MENU SPECIAL"}
                </h4>
                <button className="btn-close btn-close-white" onClick={handleCloseModal} />
              </div>

              <div className="modal-body" style={{ background: darkMode ? "#111827" : "#f8fafc" }}>
                <div className="row g-3">
                  <div className="col-md-8">
                    <label className="fw-semibold mb-1">Special Name *</label>
                    <input className="form-control" name="specialName" value={newSpecial.specialName} onChange={handleChange} placeholder="e.g. Chef's Butter Chicken" />
                  </div>
                  <div className="col-md-4">
                    <label className="fw-semibold mb-1">Price (₹)</label>
                    <input type="number" className="form-control" name="price" value={newSpecial.price} onChange={handleChange} placeholder="e.g. 299" />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Category</label>
                    <select className="form-select" name="category" value={newSpecial.category} onChange={handleChange}>
                      <option value="">Select Category</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Special">Special</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Status</label>
                    <select className="form-select" name="status" value={newSpecial.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label className="fw-semibold mb-1">Description</label>
                    <textarea rows="3" className="form-control" name="description" value={newSpecial.description} onChange={handleChange} placeholder="Describe this special..." style={{ height: "auto" }} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={newSpecial.startDate} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">End Date</label>
                    <input type="date" className="form-control" name="endDate" value={newSpecial.endDate} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ background: darkMode ? "#0f172a" : "#f8fafc" }}>
                <button className="btn btn-outline-secondary px-4 fw-bold" onClick={handleCloseModal} disabled={saving}>Cancel</button>
                <button className="btn btn-success px-5 fw-bold" onClick={handleSave} disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : "💾 Save Special"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .form-control, .form-select { height: 50px; border-radius: 12px; box-shadow: none !important; }
        .form-control:focus, .form-select:focus { border-color: #22c55e; box-shadow: 0 0 0 0.18rem rgba(34,197,94,0.2) !important; }
        textarea.form-control { height: auto !important; }
      `}</style>
    </div>
  );
}

export default MenuSpecials;
