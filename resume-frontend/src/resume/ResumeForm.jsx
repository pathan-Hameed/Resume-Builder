import { useState } from "react";
import { createResume } from "../api/resumeApi";
import ResumePreview from "./ResumePreview";

const FIELD_CONFIG = {
  title: {
    label: "Resume Title",
    placeholder: "e.g. Software Developer Resume",
    rows: 1,
  },
  summary: {
    label: "Professional Summary",
    placeholder: "A brief professional summary...",
    rows: 3,
  },
  personalInfo: {
    label: "Personal Info",
    placeholder: "Name, phone, email, location...",
    rows: 3,
  },
  skills: {
    label: "Skills",
    placeholder: "JavaScript, React, Java, Spring Boot...",
    rows: 3,
  },
  education: {
    label: "Education",
    placeholder: "Degree, institution, year...",
    rows: 3,
  },
  experience: {
    label: "Experience",
    placeholder: "Job title, company, duration, responsibilities...",
    rows: 4,
  },
  projects: {
    label: "Projects",
    placeholder: "Project name, description, tech stack...",
    rows: 4,
  },
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
      <form onSubmit={submit} className="resume-form-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">New resume</p>
            <h3>Create resume details</h3>
          </div>
          <p className="panel-copy">
            Organize your information clearly for a polished export-ready
            resume.
          </p>
        </div>

        <div className="form-grid">
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
        </div>

        <button
          type="submit"
          className="btn-primary btn-full"
          disabled={saving}
        >
          {saving ? (
            <span className="btn-loading">
              <span className="spinner" /> Saving...
            </span>
          ) : (
            "Save Resume"
          )}
        </button>
      </form>

      <aside className="resume-preview-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Preview</p>
            <h3>Live resume preview</h3>
          </div>
          <p className="panel-copy">
            Review the content as you type before exporting your finished
            resume.
          </p>
        </div>
        <ResumePreview data={form} />
      </aside>
    </div>
  );
}
