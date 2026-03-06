import type { ViewportPreset } from '../lib/types'
import { VIEWPORT_SIZES } from '../lib/types'

interface Props {
  currentWidth: number
  onResize: (preset: ViewportPreset) => void
}

const PRESETS: Array<{ key: ViewportPreset; label: string }> = [
  { key: 'mobile',  label: '375' },
  { key: 'tablet',  label: '768' },
  { key: 'desktop', label: '1280' },
]

export function ViewportSelector({ currentWidth, onResize }: Props) {
  return (
    <div className="nodrag" style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {PRESETS.map(({ key, label }) => {
        const isActive = currentWidth === VIEWPORT_SIZES[key].width
        return (
          <button
            key={key}
            onClick={(e) => { e.stopPropagation(); onResize(key) }}
            title={`${key} — ${VIEWPORT_SIZES[key].width}×${VIEWPORT_SIZES[key].height}`}
            style={{
              padding: '2px 7px',
              fontSize: '11px',
              fontFamily: 'var(--font-display)',
              fontWeight: isActive ? 600 : 400,
              background: isActive ? 'rgba(0,0,0,0.1)' : 'transparent',
              border: '1px solid',
              borderColor: isActive ? 'rgba(0,0,0,0.18)' : 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              color: isActive ? '#1f2937' : '#9ca3af',
              transition: 'all 100ms ease',
              lineHeight: '20px',
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
