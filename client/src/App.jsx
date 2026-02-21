import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dash from "./Dash";
import "./auth.css";

export default function App() {
  const [tab, setTab] = useState("login");
  const [user, setUser] = useState(null); // { name, email }

  if (user) return <Dash user={user} onLogout={() => setUser(null)} />;

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">⬡</div>
          <h1 className="auth-title">Welcome</h1>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
          <div className={`tab-indicator ${tab === "register" ? "right" : ""}`} />
        </div>

        <div className="auth-panel-wrap">
          <div className={`auth-panel ${tab === "login" ? "visible" : "hidden"}`}>
            <Login onLogin={(userData) => setUser(userData)} />
          </div>
          <div className={`auth-panel ${tab === "register" ? "visible" : "hidden"}`}>
            <Register />
          </div>
        </div>

        <p className="auth-switch">
          {tab === "login" ? (
            <>No account? <span onClick={() => setTab("register")}>Create one</span></>
          ) : (
            <>Already registered? <span onClick={() => setTab("login")}>Sign in</span></>
          )}
        </p>
      </div>
    </div>
  );
}
