import { deleteResume, downloadPdf } from "../api/resumeApi";

export default function ResumeList({ resumes, onChanged }) {

  const remove = async (id) => {
    await deleteResume(id);
    onChanged();
  };

  const pdf = async (id) => {
    const res = await downloadPdf(id);

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.pdf";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h3>My Resumes</h3>

      {resumes.length === 0 && <p>No resumes yet</p>}

      {resumes.map((r) => (
        <div key={r.id} className="resume-row">
          <b>{r.title}</b>

          <div className="resume-actions">
            <button onClick={() => pdf(r.id)}>PDF</button>
            <button className="danger" onClick={() => remove(r.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
