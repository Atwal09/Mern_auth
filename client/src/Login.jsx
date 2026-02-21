import axios from "axios";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      // Pass user data (name + email) up to App
      const name = res.data.name || res.data.user?.name || form.email.split("@")[0];
      onLogin({ name, email: form.email });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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

      <button className={`submit-btn ${loading ? "loading" : ""}`} onClick={submit} disabled={loading}>
        {loading ? <span className="spinner" /> : "Sign In"}
      </button>
    </div>
  );
}
