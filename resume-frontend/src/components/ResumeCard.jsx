export default function ResumeCard({ resume, onDelete, onDownload }) {
  const summary = resume.summary?.trim();
  return (
    <article className="resume-card">
      <div className="resume-card-main">
        <div className="resume-card-icon">
          <span>R</span>
        </div>
        <div>
          <h3>{resume.title}</h3>
          <p>
            {summary
              ? `${summary.substring(0, 100)}${summary.length > 100 ? "..." : ""}`
              : "No summary provided yet."}
          </p>
        </div>
      </div>

      <div className="resume-card-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => onDownload(resume.id)}
          aria-label={`Download ${resume.title} as PDF`}
        >
          Download
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => onDelete(resume.id)}
          aria-label={`Delete ${resume.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
