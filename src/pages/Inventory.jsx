import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../services/inventoryApi";
import { getIngredients } from "../services/ingredientsApi";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const EMPTY_ITEM = {
  ingredient: { id: "" },
  availableQuantity: "",
  reservedQuantity: "",
  purchasePrice: "",
  purchaseDate: "",
  expiryDate: "",
  supplierName: "",
  storageLocation: "",
  unit: "",
  status: "Fresh",
};

function Inventory() {
  const { darkMode } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [newItem, setNewItem] = useState(EMPTY_ITEM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventory();
    loadIngredients();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load inventory:", error);
      toast.error("Failed to load inventory data");
    } finally {
      setLoading(false);
    }
  };

  const loadIngredients = async () => {
    try {
      const data = await getIngredients();
      setIngredients(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load ingredients:", error);
    }
  };

  // Filtered + searched items
  const filteredItems = useMemo(() => {
    const q = search.toLowerCase().trim();
    return items.filter((item) => {
      const name = item.ingredient?.ingredientName?.toLowerCase() || "";
      const supplier = item.supplierName?.toLowerCase() || "";
      const storage = item.storageLocation?.toLowerCase() || "";
      const matchesSearch = !q || name.includes(q) || supplier.includes(q) || storage.includes(q);
      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewItem({
      ingredient: { id: item.ingredient?.id || "" },
      availableQuantity: item.availableQuantity,
      reservedQuantity: item.reservedQuantity,
      purchasePrice: item.purchasePrice,
      purchaseDate: item.purchaseDate,
      expiryDate: item.expiryDate,
      supplierName: item.supplierName,
      storageLocation: item.storageLocation,
      unit: item.unit,
      status: item.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inventory item?")) return;
    try {
      await deleteInventory(id);
      toast.success("Item deleted successfully");
      loadInventory();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  const handleSave = async () => {
    if (!newItem.ingredient.id) {
      toast.warning("Please select an ingredient");
      return;
    }
    if (!newItem.availableQuantity) {
      toast.warning("Please enter available quantity");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateInventory(editingId, newItem);
        toast.success("Inventory item updated successfully ✅");
      } else {
        await addInventory(newItem);
        toast.success("Inventory item added successfully ✅");
      }
      setShowModal(false);
      setEditingId(null);
      setNewItem(EMPTY_ITEM);
      await loadInventory();
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save inventory item");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setNewItem(EMPTY_ITEM);
  };

  const getStatusBadge = (item) => {
    const today = new Date();
    if (item.expiryDate) {
      const expDate = new Date(item.expiryDate);
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return { label: "Expired", cls: "bg-danger" };
      if (diffDays === 0) return { label: "Expires Today!", cls: "bg-danger" };
      if (diffDays <= 3) return { label: `${diffDays}d left`, cls: "bg-warning text-dark" };
      if (diffDays <= 7) return { label: `${diffDays}d left`, cls: "bg-info text-dark" };
    }
    const s = item.status || "Fresh";
    if (s === "Expired") return { label: "Expired", cls: "bg-danger" };
    if (s === "Expiring Soon") return { label: "Expiring Soon", cls: "bg-warning text-dark" };
    return { label: s, cls: "bg-success" };
  };

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
              boxShadow: "0 15px 35px rgba(0,0,0,0.18)",
            }}
          >
            <div>
              <h2 className="fw-bold text-white mb-1" style={{ letterSpacing: "2px" }}>
                📦 INVENTORY MANAGEMENT
              </h2>
              <p className="text-light mb-0" style={{ opacity: 0.8 }}>
                {items.length} items total &nbsp;|&nbsp;{" "}
                {items.filter((i) => {
                  if (!i.expiryDate) return false;
                  const d = Math.ceil((new Date(i.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                  return d <= 7;
                }).length}{" "}
                expiring soon
              </p>
            </div>
            <button
              className="btn btn-success btn-lg fw-bold"
              style={{ borderRadius: "14px", padding: "12px 30px" }}
              onClick={() => { setEditingId(null); setNewItem(EMPTY_ITEM); setShowModal(true); }}
            >
              + ADD ITEM
            </button>
          </div>

          {/* Search & Filter Row */}
          <div className="card border-0 shadow-sm mb-4" style={{ ...cardStyle }}>
            <div className="card-body p-3">
              <div className="row g-3 align-items-center">
                <div className="col-md-6">
                  <div className="input-group">
                    <span
                      className="input-group-text border-0"
                      style={{ background: darkMode ? "#0f172a" : "#f8fafc" }}
                    >
                      🔍
                    </span>
                    <input
                      className="form-control border-0"
                      placeholder="Search by ingredient, supplier, storage..."
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
                </div>
                <div className="col-md-3">
                  <select
                    className="form-select border-0"
                    style={{
                      height: "48px",
                      background: darkMode ? "#0f172a" : "#f8fafc",
                      color: darkMode ? "#f1f5f9" : "#0f172a",
                    }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Fresh">Fresh</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="Expiring Soon">Expiring Soon</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>
                <div className="col-md-3 text-end">
                  <small className="text-muted">
                    Showing {filteredItems.length} of {items.length} items
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card border-0 shadow" style={{ ...cardStyle }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead
                    style={{
                      background: "linear-gradient(90deg, #0f172a, #1e293b)",
                      color: "white",
                    }}
                  >
                    <tr>
                      <th className="ps-4">#</th>
                      <th>Ingredient</th>
                      <th>Available Qty</th>
                      <th>Reserved Qty</th>
                      <th>Unit</th>
                      <th>Purchase Price</th>
                      <th>Purchase Date</th>
                      <th>Expiry Date</th>
                      <th>Supplier</th>
                      <th>Storage</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="12" className="text-center p-5">
                          <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan="12" className="text-center p-5 text-muted">
                          <div style={{ fontSize: "40px" }}>📭</div>
                          <h5 className="mt-2">
                            {search || statusFilter !== "All"
                              ? "No items match your search/filter."
                              : "No Inventory Records Found"}
                          </h5>
                          {!search && statusFilter === "All" && (
                            <p className="mb-0">
                              Click <b>+ ADD ITEM</b> to create your first inventory item.
                            </p>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => {
                        const badge = getStatusBadge(item);
                        return (
                          <tr
                            key={item.id}
                            style={{ color: darkMode ? "#f1f5f9" : "#0f172a" }}
                          >
                            <td className="ps-4 text-muted">{index + 1}</td>
                            <td>
                              <span
                                className="badge bg-success"
                                style={{ fontSize: "13px", padding: "6px 12px" }}
                              >
                                {item.ingredient?.ingredientName || "—"}
                              </span>
                            </td>
                            <td className="fw-semibold">{item.availableQuantity}</td>
                            <td>{item.reservedQuantity}</td>
                            <td>{item.unit}</td>
                            <td>₹ {item.purchasePrice}</td>
                            <td>{item.purchaseDate || "—"}</td>
                            <td>
                              <span className="fw-semibold">{item.expiryDate || "—"}</span>
                            </td>
                            <td>{item.supplierName || "—"}</td>
                            <td>{item.storageLocation || "—"}</td>
                            <td>
                              <span className={`badge ${badge.cls}`} style={{ fontSize: "12px" }}>
                                {badge.label}
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                style={{ borderRadius: "8px" }}
                                onClick={() => handleEdit(item)}
                              >
                                ✏ Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                style={{ borderRadius: "8px" }}
                                onClick={() => handleDelete(item.id)}
                              >
                                🗑
                              </button>
                            </td>
                          </tr>
                        );
                      })
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
            <div
              className="modal-content border-0"
              style={{ borderRadius: "22px", overflow: "hidden", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}
            >
              {/* Header */}
              <div
                className="modal-header"
                style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", color: "white" }}
              >
                <h4 className="fw-bold mb-0">
                  {editingId ? "✏️ EDIT INVENTORY ITEM" : "📦 ADD INVENTORY ITEM"}
                </h4>
                <button className="btn-close btn-close-white" onClick={handleCloseModal} />
              </div>

              {/* Body */}
              <div
                className="modal-body"
                style={{ background: darkMode ? "#111827" : "#f8fafc" }}
              >
                <div className="row g-3">
                  {/* Ingredient */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Ingredient *</label>
                    <select
                      className="form-select"
                      value={newItem.ingredient.id}
                      onChange={(e) =>
                        setNewItem({ ...newItem, ingredient: { id: Number(e.target.value) } })
                      }
                    >
                      <option value="">Select Ingredient</option>
                      {ingredients.map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.ingredientName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Available Qty */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Available Quantity *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="availableQuantity"
                      value={newItem.availableQuantity}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Reserved Qty */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Reserved Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="reservedQuantity"
                      value={newItem.reservedQuantity}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Purchase Price */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Purchase Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="purchasePrice"
                      value={newItem.purchasePrice}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Unit */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Unit</label>
                    <input
                      className="form-control"
                      name="unit"
                      placeholder="kg / litre / piece"
                      value={newItem.unit}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Supplier */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Supplier Name</label>
                    <input
                      className="form-control"
                      name="supplierName"
                      value={newItem.supplierName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Purchase Date */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Purchase Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="purchaseDate"
                      value={newItem.purchaseDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Expiry Date */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expiryDate"
                      value={newItem.expiryDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Storage Location */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Storage Location</label>
                    <input
                      className="form-control"
                      name="storageLocation"
                      placeholder="Cold Storage / Freezer / Shelf"
                      value={newItem.storageLocation}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Status */}
                  <div className="col-md-6">
                    <label className="fw-semibold mb-1">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={newItem.status}
                      onChange={handleChange}
                    >
                      <option value="Fresh">Fresh</option>
                      <option value="AVAILABLE">Available</option>
                      <option value="Expiring Soon">Expiring Soon</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div
                className="modal-footer"
                style={{ background: darkMode ? "#0f172a" : "#f8fafc" }}
              >
                <button
                  className="btn btn-outline-secondary px-4 fw-bold"
                  onClick={handleCloseModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success px-5 fw-bold"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    "💾 Save Item"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .table tbody tr { transition: background 0.2s ease; }
        .table tbody tr:hover { background: ${darkMode ? "rgba(255,255,255,0.04)" : "#f0fdf4"}; }
        .form-control, .form-select {
          height: 50px;
          border-radius: 12px;
          transition: 0.25s;
          box-shadow: none !important;
        }
        .form-control:focus, .form-select:focus {
          border-color: #22c55e;
          box-shadow: 0 0 0 0.18rem rgba(34,197,94,0.2) !important;
        }
      `}</style>
    </div>
  );
}

export default Inventory;
