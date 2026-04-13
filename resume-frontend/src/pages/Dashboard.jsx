import { useEffect, useState } from "react";
import ResumeForm from "../resume/ResumeForm";
import ResumeList from "./ResumeList";
import { getMyResumes } from "../api/resumeApi";
import "../App.css";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadResumes = async () => {
    const res = await getMyResumes();
    setResumes(res.data);
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleSaved = () => {
    loadResumes();
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>Resume Builder</span>
          </div>
          <button
            className="btn-ghost"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <div>
            <h1>My Resumes</h1>
            <p className="text-muted">Create and manage your professional resumes</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
                Close
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New Resume
              </>
            )}
          </button>
        </div>

        {/* Resume Form (collapsible) */}
        {showForm && (
          <div className="card slide-in">
            <ResumeForm onSaved={handleSaved} />
          </div>
        )}

        {/* Resume List */}
        <div className="card">
          <ResumeList resumes={resumes} onChanged={loadResumes} />
        </div>
      </main>
    </div>
  );
}
