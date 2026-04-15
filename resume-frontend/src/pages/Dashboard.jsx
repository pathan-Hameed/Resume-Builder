import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import ResumeForm from "../resume/ResumeForm";
import ResumeList from "./ResumeList";
import { getMyResumes } from "../api/resumeApi";
import "../App.css";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const res = await getMyResumes();
      setResumes(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleSaved = () => {
    loadResumes();
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-shell">
        <TopNavbar onLogout={handleLogout} />

        <main className="page-content">
          <section className="dashboard-hero">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h1>Build polished resumes in minutes</h1>
              <p className="section-copy">
                Manage your resume projects with a clean dashboard, fast saving,
                and PDF export.
              </p>
            </div>

            <button
              type="button"
              className="btn-primary hero-cta"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close resume form" : "Create new resume"}
            </button>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total resumes</span>
              <h2>{resumes.length}</h2>
            </div>
            <div className="stat-card">
              <span className="stat-label">Recent activity</span>
              <p>
                {resumes.length > 0
                  ? "Resumes updated recently"
                  : "Create your first resume today"}
              </p>
            </div>
            <div className="stat-card">
              <span className="stat-label">Quick start</span>
              <p>
                Add a resume, preview your content, then export a polished PDF.
              </p>
            </div>
          </section>

          {showForm && (
            <section className="panel slide-in">
              <ResumeForm onSaved={handleSaved} />
            </section>
          )}

          <section className="panel">
            {loading ? (
              <div className="skeleton-grid" aria-label="Loading resumes">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="skeleton-card" />
                ))}
              </div>
            ) : (
              <ResumeList resumes={resumes} onChanged={loadResumes} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
