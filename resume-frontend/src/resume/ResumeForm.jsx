import { useState } from "react";
import { createResume } from "../api/resumeApi";
import ResumePreview from "./ResumePreview";

const FIELD_CONFIG = {
  title: { label: "Resume Title", placeholder: "e.g. Software Developer Resume", rows: 1 },
  summary: { label: "Professional Summary", placeholder: "A brief professional summary...", rows: 3 },
  personalInfo: { label: "Personal Info", placeholder: "Name, phone, email, location...", rows: 3 },
  skills: { label: "Skills", placeholder: "JavaScript, React, Java, Spring Boot...", rows: 3 },
  education: { label: "Education", placeholder: "Degree, institution, year...", rows: 3 },
  experience: { label: "Experience", placeholder: "Job title, company, duration, responsibilities...", rows: 4 },
  projects: { label: "Projects", placeholder: "Project name, description, tech stack...", rows: 4 },
};

export default function ResumeForm({ onSaved }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    personalInfo: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createResume(form);
      setForm({
        title: "",
        summary: "",
        personalInfo: "",
        skills: "",
        education: "",
        experience: "",
        projects: "",
      });
      onSaved();
    } catch (err) {
      alert("Failed to save resume");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="resume-form-layout">
      {/* FORM */}
      <form onSubmit={submit} className="resume-form-panel">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Create Resume
        </h3>

        {Object.keys(form).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={`field-${key}`}>{FIELD_CONFIG[key].label}</label>
            <textarea
              id={`field-${key}`}
              name={key}
              placeholder={FIELD_CONFIG[key].placeholder}
              value={form[key]}
              onChange={handleChange}
              rows={FIELD_CONFIG[key].rows}
            />
          </div>
        ))}

        <button className="btn-primary" disabled={saving}>
          {saving ? (
            <span className="btn-loading">
              <span className="spinner" /> Saving...
            </span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                <polyline points="17 21 17 13 7 13 7 21"/>
                <polyline points="7 3 7 8 15 8"/>
              </svg>
              Save Resume
            </>
          )}
        </button>
      </form>

      {/* LIVE PREVIEW */}
      <div className="resume-preview-panel">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Live Preview
        </h3>
        <ResumePreview data={form} />
      </div>
    </div>
  );
}
