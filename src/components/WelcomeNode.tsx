export function WelcomeNode() {
  return (
    <div
      style={{
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        border: '1px solid #d4d4d4',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div
        className="drag-handle"
        style={{
          height: 40,
          flexShrink: 0,
          background: 'var(--node-header-bg)',
          borderBottom: '1px solid var(--node-header-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          cursor: 'grab',
        }}
      >
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ opacity: 0.3 }}>
          <circle cx="2" cy="2" r="1.5" fill="#374151" />
          <circle cx="8" cy="2" r="1.5" fill="#374151" />
          <circle cx="2" cy="8" r="1.5" fill="#374151" />
          <circle cx="8" cy="8" r="1.5" fill="#374151" />
          <circle cx="2" cy="14" r="1.5" fill="#374151" />
          <circle cx="8" cy="14" r="1.5" fill="#374151" />
        </svg>
      </div>
      <div
        className="nodrag nopan"
        style={{ padding: '14px 16px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '13px',
            color: '#1f2937',
            marginBottom: '5px',
          }}
        >
          StateFrame Demo
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            color: '#6b7280',
            lineHeight: 1.55,
          }}
        >
          Three design approaches for an appointment booking flow. You can click through each prototype and click a comment to
          load the exact state the reviewer was looking at.{' '}
          <a
            href="https://github.com/anthonypalicea/stateframedemo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#2563eb' }}
          >
            View source on GitHub.
          </a>
        </p>
      </div>
    </div>
  )
}
