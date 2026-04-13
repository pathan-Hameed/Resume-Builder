import { useState } from "react";
import { createResume } from "../api/resumeApi";
import ResumePreview from "./ResumePreview";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
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
  };

  return (


    
    <div style={{ display: "flex", gap: 30 }}>
      {/* FORM */}


      

      <form onSubmit={submit} style={{ flex: 1 }}>
        <h3>Create Resume</h3>

        {Object.keys(form).map((key) => (
          <textarea
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            rows={3}
          />
        ))}

        <button>Save Resume</button>
      </form>

      {/* LIVE PREVIEW */}
      <div style={{ flex: 1 }}>
        <h3>Live Preview</h3>
        <ResumePreview data={form} />
      </div>
    </div>
  );
}
