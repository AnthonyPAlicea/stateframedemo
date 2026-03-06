import type { Comment } from '../lib/types'
import { CommentItem } from './CommentItem'
import commentsData from '../data/comments.json'

interface Props {
  prototypeId: string
  selectedCommentId: string | null
  onSelect: (comment: Comment) => void
  onDeselect: () => void
}

export function CommentSidebar({
  prototypeId,
  selectedCommentId,
  onSelect,
  onDeselect,
}: Props) {
  const comments = (commentsData as Comment[]).filter(
    (c) => c.prototype === prototypeId,
  )

  return (
    <div
      style={{
        width: 'var(--sidebar-width)',
        height: '100%',
        overflowY: 'auto',
        borderLeft: '2px solid #c8c8c8',
        background: 'var(--canvas-bg)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: '#c0c0c0 transparent',
      }}
    >
      <div
        style={{
          padding: '9px 12px 7px',
          borderBottom: '1px solid var(--node-border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '10px',
            fontWeight: 700,
            color: '#9ca3af',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Comments
        </span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isSelected={selectedCommentId === comment.id}
            onSelect={() => onSelect(comment)}
            onDeselect={onDeselect}
          />
        ))}
      </div>
    </div>
  )
}
