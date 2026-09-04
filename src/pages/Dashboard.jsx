import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const emptyForm = {
  name: "",
  age: "",
  gender: "",
  info: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const key = user?.email ? `children_${user.email}` : "children_default";
    const storedChildren = JSON.parse(localStorage.getItem(key) || "[]");
    setChildren(Array.isArray(storedChildren) ? storedChildren : []);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.age) {
      alert("Name and age are required.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const key = user?.email ? `children_${user.email}` : "children_default";

    const child = {
      id: editingId || Date.now().toString(),
      name: form.name.trim(),
      age: form.age,
      gender: form.gender,
      info: form.info.trim(),
    };

    const updatedChildren = editingId
      ? children.map((item) => (item.id === editingId ? { ...item, ...child } : item))
      : [...children, child];

    setChildren(updatedChildren);
    localStorage.setItem(key, JSON.stringify(updatedChildren));
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (child) => {
    setEditingId(child.id);
    setForm({
      name: child.name,
      age: child.age,
      gender: child.gender,
      info: child.info,
    });
  };

  const handleDelete = (id) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const key = user?.email ? `children_${user.email}` : "children_default";
    const updatedChildren = children.filter((child) => child.id !== id);

    setChildren(updatedChildren);
    localStorage.setItem(key, JSON.stringify(updatedChildren));

    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate("/", { replace: true });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            SafeChild<span>QR</span>
          </h1>
          <button type="button" className="dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-content">
          <form onSubmit={handleSubmit} className="dashboard-card dashboard-form-card">
            <h2>{editingId ? "Update Child" : "Add New Child"}</h2>

            <div className="dashboard-form">
              <label className="dashboard-field">
                Child Name
                <input
                  type="text"
                  name="name"
                  placeholder="Child name"
                  value={form.name}
                  onChange={handleChange}
                />
              </label>

              <label className="dashboard-field">
                Age
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={form.age}
                  onChange={handleChange}
                />
              </label>

              <label className="dashboard-field">
                Gender
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={form.gender}
                  onChange={handleChange}
                />
              </label>

              <label className="dashboard-field">
                Additional Info
                <textarea
                  name="info"
                  placeholder="Any simple info"
                  value={form.info}
                  onChange={handleChange}
                  rows="3"
                />
              </label>

              <div className="dashboard-actions">
                <button type="submit" className="dashboard-btn">
                  {editingId ? "Update Child" : "Add Child"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="dashboard-btn-secondary"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="dashboard-card dashboard-list-card">
            <div className="dashboard-list-header">
              <h2>Children List</h2>
              <span className="dashboard-count">{children.length} total</span>
            </div>

            {children.length === 0 ? (
              <div className="dashboard-empty">No children added yet.</div>
            ) : (
              <ul className="dashboard-list">
                {children.map((child) => (
                  <li key={child.id} className="dashboard-item">
                    <div className="dashboard-item-head">
                      <h3>{child.name}</h3>
                      <span className="dashboard-badge">{child.age} yrs</span>
                    </div>
                    <p>
                      <strong>Gender:</strong> {child.gender || "Not provided"}
                    </p>
                    <p>
                      <strong>Info:</strong> {child.info || "No extra details"}
                    </p>

                    <div className="dashboard-item-actions">
                      <button type="button" className="dashboard-btn-edit" onClick={() => handleEdit(child)}>
                        Edit
                      </button>
                      <button type="button" className="dashboard-btn-delete" onClick={() => handleDelete(child.id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;