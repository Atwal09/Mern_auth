import { useState, useEffect } from "react";
import "./dash.css";

const STATS = [
  { label: "Projects", value: 12, icon: "◈", color: "#6c63ff" },
  { label: "Tasks Done", value: 48, icon: "✦", color: "#3dd68c" },
  { label: "Messages", value: 7, icon: "◉", color: "#ff9f43" },
  { label: "Hours Logged", value: 164, icon: "◷", color: "#ff5b6e" },
];

const ACTIVITY = [
  { action: "Completed task", target: "Design review", time: "2m ago", dot: "#3dd68c" },
  { action: "Commented on", target: "API integration", time: "1h ago", dot: "#6c63ff" },
  { action: "Created project", target: "Mobile App v2", time: "3h ago", dot: "#ff9f43" },
  { action: "Uploaded file", target: "wireframes.fig", time: "Yesterday", dot: "#ff5b6e" },
  { action: "Joined team", target: "Design System", time: "2 days ago", dot: "#6c63ff" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function Counter({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 30);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [target]);
  return <span>{val}</span>;
}

export default function Dash({ user, onLogout }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div className={`dash-root ${visible ? "dash-in" : ""}`}>
      {/* Sidebar */}
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">⬡</span>
          <span className="sidebar-name">Nexus</span>
        </div>
        <nav className="sidebar-nav">
          {["Dashboard", "Projects", "Tasks", "Messages", "Settings"].map((item, i) => (
            <div key={item} className={`nav-item ${i === 0 ? "active" : ""}`} style={{ animationDelay: `${i * 0.06}s` }}>
              <span className="nav-dot" />
              {item}
            </div>
          ))}
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          ← Sign out
        </button>
      </aside>

      {/* Main */}
      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div className="dash-greeting">
            <p className="greeting-sub">{getGreeting()},</p>
            <h1 className="greeting-name">Hi, {user.name} 👋</h1>
          </div>
          <div className="dash-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Stats */}
        <section className="dash-stats">
          {STATS.map((s, i) => (
            <div className="stat-card" key={s.label} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
              <div className="stat-icon" style={{ color: s.color, boxShadow: `0 0 18px ${s.color}44` }}>
                {s.icon}
              </div>
              <div className="stat-info">
                <div className="stat-value" style={{ color: s.color }}>
                  <Counter target={s.value} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Activity */}
        <section className="dash-activity">
          <h2 className="section-title">Recent Activity</h2>
          <div className="activity-list">
            {ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i} style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
                <div className="activity-dot" style={{ background: a.dot, boxShadow: `0 0 8px ${a.dot}` }} />
                <div className="activity-body">
                  <span className="activity-action">{a.action}</span>
                  <span className="activity-target"> "{a.target}"</span>
                </div>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
