export default function ResumePreview({ data }) {
  const hasContent = Object.values(data).some((v) => v.trim() !== "");

  if (!hasContent) {
    return (
      <div className="preview-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <p>Start typing to see a live preview</p>
      </div>
    );
  }

  return (
    <div className="preview-paper">
      {data.title && <h2 className="preview-title">{data.title}</h2>}
      {data.personalInfo && (
        <p className="preview-personal">{data.personalInfo}</p>
      )}
      {data.summary && (
        <div className="preview-section">
          <h4>Summary</h4>
          <p>{data.summary}</p>
        </div>
      )}
      {data.skills && (
        <div className="preview-section">
          <h4>Skills</h4>
          <p>{data.skills}</p>
        </div>
      )}
      {data.education && (
        <div className="preview-section">
          <h4>Education</h4>
          <p>{data.education}</p>
        </div>
      )}
      {data.experience && (
        <div className="preview-section">
          <h4>Experience</h4>
          <p>{data.experience}</p>
        </div>
      )}
      {data.projects && (
        <div className="preview-section">
          <h4>Projects</h4>
          <p>{data.projects}</p>
        </div>
      )}
    </div>
  );
}
