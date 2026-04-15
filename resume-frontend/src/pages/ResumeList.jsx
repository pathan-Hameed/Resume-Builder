import { deleteResume, downloadPdf } from "../api/resumeApi";
import ResumeCard from "../components/ResumeCard";
import EmptyState from "../components/EmptyState";

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
    <div className="resume-list-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Resumes</p>
          <h2>All resume projects</h2>
        </div>
        <span className="badge">{resumes.length}</span>
      </div>

      {resumes.length === 0 ? (
        <EmptyState
          title="No resumes yet"
          subtitle="Create a resume to get started with your first professional summary and project showcase."
        />
      ) : (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={remove}
              onDownload={pdf}
            />
          ))}
        </div>
      )}
    </div>
  );
}
