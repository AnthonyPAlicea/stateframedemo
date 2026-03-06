import { useState } from 'react'
import type { Comment } from '../lib/types'
import { AUTHOR_COLORS } from '../lib/types'

interface Props {
  comment: Comment
  isSelected: boolean
  onSelect: () => void
  onDeselect: () => void
}

export function CommentItem({ comment, isSelected, onSelect, onDeselect }: Props) {
  const [hovered, setHovered] = useState(false)
  const avatarColor = AUTHOR_COLORS[comment.author.avatar] ?? '#6b7280'

  return (
    <div
      onClick={isSelected ? undefined : onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 12px',
        background: isSelected
          ? 'var(--comment-selected-bg)'
          : hovered
          ? 'rgba(0,0,0,0.07)'
          : 'transparent',
        cursor: isSelected ? 'default' : 'pointer',
        transition: 'background 120ms ease, border-color 120ms ease',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
            letterSpacing: '0.02em',
          }}
        >
          {comment.author.avatar}
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#374151',
            lineHeight: 1.2,
            fontFamily: 'var(--font-display)',
          }}
        >
          {comment.author.name}
        </span>
      </div>

      {/* Comment text */}
      <p
        style={{
          fontSize: '12px',
          lineHeight: 1.55,
          color: isSelected ? 'var(--accent-text)' : '#374151',
          marginLeft: '33px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {comment.text}
      </p>

      {/* Deselect button */}
      {isSelected && (
        <button
          onClick={(e) => { e.stopPropagation(); onDeselect() }}
          style={{
            marginTop: '7px',
            marginLeft: '33px',
            fontSize: '11px',
            color: 'var(--accent-dark)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-body)',
            textDecoration: 'underline',
          }}
        >
          Deselect
        </button>
      )}
    </div>
  )
}
