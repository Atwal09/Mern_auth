import "./dash.css";

export default function Dash({ user, onLogout }) {
  return (
    <div className="dash-root simple-dash">
      <div className="dash-center">
        <h1 className="dash-title">
          Hi, {user.name} 👋
        </h1>

        <button className="logout-btn" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}