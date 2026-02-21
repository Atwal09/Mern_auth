import axios from "axios";
import { useState } from "react";

const API = "https://api.workforme.space";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/login`, form);

      // ✅ login successful → just notify parent
      onLogin();
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-body">
      <div className="input-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={update("email")}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={update("password")}
          disabled={loading}
        />
      </div>

      {error && <div className="msg error">{error}</div>}

      <button
        className={`submit-btn ${loading ? "loading" : ""}`}
        onClick={submit}
        disabled={loading}
      >
        {loading ? <span className="spinner" /> : "Sign In"}
      </button>
    </div>
  );
}
