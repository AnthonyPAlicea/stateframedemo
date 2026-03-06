import { useEffect, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type NodeChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { PrototypeNode } from './components/PrototypeNode'
import { WelcomeNode } from './components/WelcomeNode'
import boardData from './data/board.json'

const nodeTypes = {
  prototype: PrototypeNode,
  welcome: WelcomeNode,
}

const STORAGE_KEY = 'stateframe-demo-layout'

function CanvasToolbar({ onReset }: { onReset: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        background: '#ffffff',
        border: '1px solid #d4d4d4',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        borderRadius: '9999px',
        padding: '8px 20px',
        zIndex: 10,
        pointerEvents: 'all',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '13px',
          color: '#1f2937',
          letterSpacing: '0.02em',
        }}
      >
        StateFrame
      </span>
      <div
        style={{
          width: '1px',
          height: '16px',
          background: '#d4d4d4',
        }}
      />
      <button
        onClick={onReset}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px',
          color: '#6b7280',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 0',
          transition: 'color 120ms',
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLButtonElement).style.color = '#1f2937')
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLButtonElement).style.color = '#6b7280')
        }
      >
        Reset Layout
      </button>
    </div>
  )
}

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
  const [edges] = useEdgesState([])
  const { toObject, fitView } = useReactFlow()

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const flow = JSON.parse(saved)
        setNodes(flow.nodes ?? boardData.nodes)
      } catch {
        setNodes(boardData.nodes)
      }
    } else {
      setNodes(boardData.nodes)
    }
    setTimeout(() => fitView({ padding: 0.06 }), 50)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      onNodesChange(changes)
      setTimeout(() => {
        const flow = toObject()
        localStorage.setItem(STORAGE_KEY, JSON.stringify(flow))
      }, 0)
    },
    [onNodesChange, toObject],
  )

  const resetLayout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setNodes(boardData.nodes)
    setTimeout(() => fitView({ padding: 0.06 }), 50)
  }, [setNodes, fitView])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        nodeTypes={nodeTypes}
        fitView={false}
        minZoom={0.15}
        maxZoom={2}
        deleteKeyCode={null}
        selectionKeyCode={null}
        zoomOnDoubleClick={false}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#b0b0b0"
          gap={24}
          size={1.5}
        />
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
      <CanvasToolbar onReset={resetLayout} />
    </div>
  )
}

export default function App() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  )
}
