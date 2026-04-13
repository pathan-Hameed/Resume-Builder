import { useEffect, useState } from "react";
import ResumeForm from "../resume/ResumeForm";
import ResumeList from "./ResumeList";
import { getMyResumes } from "../api/resumeApi";
import "../App.css";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);

  const loadResumes = async () => {
    const res = await getMyResumes();
    setResumes(res.data);
  };

  useEffect(() => {
    loadResumes();
  }, []);

  return (
    <div className="container">
      <button
        className="secondary"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>

      <h2>Dashboard</h2>

      <div className="card">
        <ResumeForm onSaved={loadResumes} />
      </div>

      <div className="card">
        <ResumeList resumes={resumes} onChanged={loadResumes} />
      </div>
    </div>
  );
}
