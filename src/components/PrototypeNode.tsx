import { useRef, useState, useCallback } from 'react'
import { useReactFlow, type NodeProps } from '@xyflow/react'
import type { PrototypeNodeData, ViewportPreset, Comment } from '../lib/types'
import { VIEWPORT_SIZES } from '../lib/types'
import { sendStateSet } from '../lib/stateframe-bridge'
import { defaultStates } from '../data/defaultStates'
import { CommentSidebar } from './CommentSidebar'
import { ViewportSelector } from './ViewportSelector'

const SIDEBAR_WIDTH = 220
const HEADER_HEIGHT = 40

export function PrototypeNode({ id, data: rawData }: NodeProps) {
  const data = rawData as PrototypeNodeData
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null)
  const { setNodes } = useReactFlow()

  const totalWidth = data.width + SIDEBAR_WIDTH
  const totalHeight = data.height + HEADER_HEIGHT

  const handleSelectComment = useCallback(
    (comment: Comment) => {
      setSelectedCommentId(comment.id)
      if (iframeRef.current) {
        sendStateSet(iframeRef.current, comment.state, comment.scroll)
      }
    },
    [],
  )

  const handleDeselect = useCallback(() => {
    setSelectedCommentId(null)
    if (iframeRef.current) {
      sendStateSet(
        iframeRef.current,
        defaultStates[data.prototype] ?? {},
        { x: 0, y: 0 },
      )
    }
  }, [data.prototype])

  const handleResize = useCallback(
    (preset: ViewportPreset) => {
      const { width, height } = VIEWPORT_SIZES[preset]
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, width, height } } : n,
        ),
      )
    },
    [id, setNodes],
  )

  return (
    <div
      style={{
        width: totalWidth,
        height: totalHeight,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--node-bg)',
        border: '1px solid var(--node-border)',
        borderRadius: '10px',
        boxShadow: 'var(--node-shadow)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        className="drag-handle"
        style={{
          height: HEADER_HEIGHT,
          background: 'var(--node-header-bg)',
          borderBottom: '1px solid var(--node-header-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px 0 10px',
          cursor: 'grab',
          flexShrink: 0,
          gap: 8,
        }}
      >
        {/* Drag dots + label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
            <circle cx="2" cy="2" r="1.5" fill="#374151" />
            <circle cx="8" cy="2" r="1.5" fill="#374151" />
            <circle cx="2" cy="8" r="1.5" fill="#374151" />
            <circle cx="8" cy="8" r="1.5" fill="#374151" />
            <circle cx="2" cy="14" r="1.5" fill="#374151" />
            <circle cx="8" cy="14" r="1.5" fill="#374151" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              fontWeight: 700,
              color: '#374151',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {data.label}
          </span>
        </div>

        {/* Viewport presets */}
        <ViewportSelector
          currentWidth={data.width}
          onResize={handleResize}
        />
      </div>

      {/* Body: iframe + sidebar */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          src={`/prototypes/${data.prototype}/`}
          className="nodrag"
          sandbox="allow-scripts allow-same-origin allow-forms"
          style={{
            display: 'block',
            border: 'none',
            flexShrink: 0,
            width: data.width,
            height: data.height,
          }}
          title={data.label}
        />
        <CommentSidebar
          prototypeId={data.prototype}
          selectedCommentId={selectedCommentId}
          onSelect={handleSelectComment}
          onDeselect={handleDeselect}
        />
      </div>
    </div>
  )
}
