export default function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="empty-state-panel" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {onAction && (
        <button type="button" className="btn-primary btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
