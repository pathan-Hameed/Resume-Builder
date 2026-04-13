import { useEffect, useState, useCallback } from "react";
import { getMyResumes, deleteResume, downloadPdf } from "../api/resumeApi";

export default function ResumeList() {
  const [resumes, setResumes] = useState([]);

  const load = useCallback(async () => {
    const res = await getMyResumes();
    setResumes(res.data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id) => {
    await deleteResume(id);
    load();
  };

  const pdf = async (id) => {
    const res = await downloadPdf(id);
    const url = window.URL.createObjectURL(res.data);
    window.open(url);
  };

  return (
    <div>
      <h3>My Resumes</h3>
      {resumes.map((r) => (
        <div key={r.id}>
          <b>{r.title}</b>
          <button onClick={() => pdf(r.id)}>PDF</button>
          <button onClick={() => remove(r.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
