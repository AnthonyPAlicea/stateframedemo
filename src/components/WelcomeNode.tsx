export function WelcomeNode() {
  return (
    <div
      style={{
        padding: '16px 22px',
        background: '#ffffff',
        border: '1px solid #d4d4d4',
        borderRadius: '12px',
        maxWidth: '500px',
        pointerEvents: 'none',
        userSelect: 'none',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '14px',
          color: '#1f2937',
          marginBottom: '5px',
          letterSpacing: '0.01em',
        }}
      >
        StateFrame Demo
      </div>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: '#6b7280',
          lineHeight: 1.55,
        }}
      >
        Three design approaches for an appointment booking flow at Fish Family
        Medicine. Try clicking through the prototypes, or click comment pins to load the exact state each reviewer was looking at.
      </p>
    </div>
  )
}
