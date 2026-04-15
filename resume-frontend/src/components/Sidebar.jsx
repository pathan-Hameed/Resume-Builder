import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar-brand">
        <div className="brand-mark">RB</div>
        <div className="brand-content">
          <p className="brand-label">Resume Builder</p>
          <p className="brand-subtitle">Create polished resumes faster</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link active">
          <span className="sidebar-link-icon">📄</span>
          <span className="sidebar-link-text">Dashboard</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-title">Need help?</p>
        <p className="sidebar-footer-copy">
          Use the form to create and manage resumes in one place.
        </p>
      </div>
    </aside>
  );
}
