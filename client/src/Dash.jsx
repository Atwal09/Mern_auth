import "./dash.css";

export default function Dash({ onLogout }) {
  return (
    <div className="simple-dash">
      <div className="dash-center">
        <h1 className="dash-title">Hi 👋</h1>

        <button className="logout-btn" onClick={onLogout}>
          Sign out
        </button>
      </div>
    </div>
  );
}
