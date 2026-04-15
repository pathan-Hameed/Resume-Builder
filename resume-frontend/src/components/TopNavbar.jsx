export default function TopNavbar({ onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-brand">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h2>Resume workspace</h2>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="btn-ghost"
          onClick={onLogout}
          aria-label="Log out"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
