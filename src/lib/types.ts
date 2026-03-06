export interface Comment {
  id: string
  prototype: string
  author: { name: string; avatar: string }
  text: string
  state: Record<string, unknown>
  scroll: { x: number; y: number }
}

export interface PrototypeNodeData extends Record<string, unknown> {
  label: string
  prototype: string
  width: number
  height: number
}

export type ViewportPreset = 'mobile' | 'tablet' | 'desktop'

export const VIEWPORT_SIZES: Record<ViewportPreset, { width: number; height: number }> = {
  mobile:  { width: 375,  height: 700  },
  tablet:  { width: 768,  height: 1024 },
  desktop: { width: 1280, height: 800  },
}

export const AUTHOR_COLORS: Record<string, string> = {
  SC: 'var(--avatar-sarah)',
  MJ: 'var(--avatar-marcus)',
  PP: 'var(--avatar-priya)',
}
