import axios from "axios";
import { useState } from "react";

const API = "https://api.workforme.space";

export default function Register() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const submit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/register`, form);
      setSuccess("Account created! You can now sign in.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-body">
      <div className="input-group">
        <label>Full Name</label>
        <input
          placeholder="Jane Smith"
          onChange={update("name")}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={update("email")}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={update("password")}
          disabled={loading}
        />
      </div>

      {error && <div className="msg error">{error}</div>}
      {success && <div className="msg success">{success}</div>}

      <button
        className={`submit-btn ${loading ? "loading" : ""}`}
        onClick={submit}
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : "Create Account"}
      </button>
    </div>
  );
}