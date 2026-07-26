import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

import {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} from "../services/suppliersApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EMPTY_SUPPLIER = {
  supplierName: "",
  contactPerson: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
  status: "Active",
};

function Suppliers() {
  const { darkMode } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newSupplier, setNewSupplier] = useState(EMPTY_SUPPLIER);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await getSuppliers();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load suppliers:", error);
      toast.error("Failed to load suppliers");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier.id);
    setNewSupplier({
      supplierName: supplier.supplierName || "",
      contactPerson: supplier.contactPerson || "",
      phone: supplier.phone || "",
      email: supplier.email || "",
      address: supplier.address || "",
      city: supplier.city || "",
      state: supplier.state || "",
      country: supplier.country || "",
      postalCode: supplier.postalCode || "",
      status: supplier.status || "Active",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewSupplier(EMPTY_SUPPLIER);
  };

  const handleSave = async () => {
    if (!newSupplier.supplierName.trim()) {
      toast.warning("Supplier Name is required");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateSupplier(editingId, newSupplier);
        toast.success("Supplier updated successfully ✅");
      } else {
        await addSupplier(newSupplier);
        toast.success("Supplier added successfully ✅");
      }
      handleCloseModal();
      await loadSuppliers();
    } catch (error) {
      console.error("Save supplier error:", error);
      toast.error("Failed to save supplier");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier? This action cannot be undone.")) return;
    try {
      await deleteSupplier(id);
      toast.success("Supplier deleted successfully");
      loadSuppliers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete supplier");
    }
  };

  const filteredSuppliers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return suppliers;
    return suppliers.filter(
      (s) =>
        s.supplierName?.toLowerCase().includes(q) ||
        s.contactPerson?.toLowerCase().includes(q) ||
        s.phone?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.city?.toLowerCase().includes(q)
    );
  }, [suppliers, search]);

  const cardStyle = {
    background: darkMode ? "#1e293b" : "#ffffff",
    color: darkMode ? "#f1f5f9" : "#0f172a",
    borderRadius: "18px",
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
                🚚 SUPPLIER MANAGEMENT
              </h2>
              <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                {suppliers.length} registered suppliers
              </p>
            </div>
            <button
              className="btn btn-success btn-lg fw-bold"
              style={{ borderRadius: "14px", padding: "12px 30px" }}
              onClick={() => { setEditingId(null); setNewSupplier(EMPTY_SUPPLIER); setShowModal(true); }}
            >
              + ADD SUPPLIER
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
                    placeholder="Search by name, contact, phone, city..."
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
                  {filteredSuppliers.length} of {suppliers.length}
                </small>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card border-0 shadow" style={{ ...cardStyle }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead style={{ background: "linear-gradient(90deg,#0f172a,#1e293b)", color: "white" }}>
                    <tr>
                      <th className="ps-4">#</th>
                      <th>Supplier Name</th>
                      <th>Contact Person</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center p-5">
                          <div className="spinner-border text-success" />
                        </td>
                      </tr>
                    ) : filteredSuppliers.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center p-5 text-muted">
                          <div style={{ fontSize: "40px" }}>🚚</div>
                          <h5 className="mt-2">
                            {search ? "No suppliers match your search." : "No Suppliers Found"}
                          </h5>
                          {!search && <p className="mb-0">Click <b>+ ADD SUPPLIER</b> to get started.</p>}
                        </td>
                      </tr>
                    ) : (
                      filteredSuppliers.map((supplier, idx) => (
                        <tr key={supplier.id} style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}>
                          <td className="ps-4 text-muted">{idx + 1}</td>
                          <td className="fw-semibold">{supplier.supplierName}</td>
                          <td>{supplier.contactPerson || "—"}</td>
                          <td>{supplier.phone || "—"}</td>
                          <td>{supplier.email || "—"}</td>
                          <td>{supplier.city || "—"}</td>
                          <td>{supplier.state || "—"}</td>
                          <td>
                            <span
                              className={`badge ${supplier.status === "Active" ? "bg-success" : "bg-secondary"}`}
                            >
                              {supplier.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-2"
                              style={{ borderRadius: "8px" }}
                              onClick={() => handleEdit(supplier)}
                            >
                              ✏ Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              style={{ borderRadius: "8px" }}
                              onClick={() => handleDelete(supplier.id)}
                            >
                              🗑
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content border-0" style={{ borderRadius: "22px", overflow: "hidden" }}>
              <div
                className="modal-header"
                style={{ background: "linear-gradient(135deg,#0f172a,#1e293b)", color: "white" }}
              >
                <h4 className="fw-bold mb-0">
                  {editingId ? "✏️ EDIT SUPPLIER" : "🚚 ADD SUPPLIER"}
                </h4>
                <button className="btn-close btn-close-white" onClick={handleCloseModal} />
              </div>

              <div className="modal-body" style={{ background: darkMode ? "#111827" : "#f8fafc" }}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Supplier Name *</label>
                    <input className="form-control" name="supplierName" value={newSupplier.supplierName} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Contact Person</label>
                    <input className="form-control" name="contactPerson" value={newSupplier.contactPerson} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Phone Number</label>
                    <input className="form-control" name="phone" value={newSupplier.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Email</label>
                    <input type="email" className="form-control" name="email" value={newSupplier.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-12">
                    <label className="fw-semibold mb-1">Address</label>
                    <textarea rows="2" className="form-control" name="address" value={newSupplier.address} onChange={handleChange} style={{ height: "auto" }} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">City</label>
                    <input className="form-control" name="city" value={newSupplier.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">State</label>
                    <input className="form-control" name="state" value={newSupplier.state} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Country</label>
                    <input className="form-control" name="country" value={newSupplier.country} onChange={handleChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Postal Code</label>
                    <input className="form-control" name="postalCode" value={newSupplier.postalCode} onChange={handleChange} />
                  </div>
                  <div className="col-md-12">
                    <label className="fw-semibold mb-1">Status</label>
                    <select className="form-select" name="status" value={newSupplier.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer" style={{ background: darkMode ? "#0f172a" : "#f8fafc" }}>
                <button className="btn btn-outline-secondary px-4 fw-bold" onClick={handleCloseModal} disabled={saving}>
                  Cancel
                </button>
                <button className="btn btn-success px-5 fw-bold" onClick={handleSave} disabled={saving}>
                  {saving ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : "💾 Save Supplier"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .form-control, .form-select { height: 50px; border-radius: 12px; box-shadow: none !important; }
        .form-control:focus, .form-select:focus { border-color: #22c55e; box-shadow: 0 0 0 0.18rem rgba(34,197,94,0.2) !important; }
        .table tbody tr { transition: background 0.2s; }
        .table tbody tr:hover { background: ${darkMode ? "rgba(255,255,255,0.04)" : "#f0fdf4"}; }
      `}</style>
    </div>
  );
}

export default Suppliers;