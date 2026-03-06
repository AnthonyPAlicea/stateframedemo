let _defaultState = null
let _getState = null
let _setState = null

export function initBridge({ defaultState, getState, setState }) {
  _defaultState = defaultState
  _getState = getState
  _setState = setState

  window.addEventListener('message', (event) => {
    if (event.source !== window.parent) return
    const { type, payload } = event.data ?? {}

    if (type === 'STATE_GET') {
      event.source.postMessage(
        {
          type: 'STATE_GET_RESPONSE',
          payload: {
            state: _getState(),
            scroll: { x: window.scrollX, y: window.scrollY },
          },
        },
        '*',
      )
    }

    if (type === 'STATE_SET') {
      const incoming = payload?.state ?? {}
      const scroll = payload?.scroll ?? { x: 0, y: 0 }
      _setState({ ..._defaultState, ...incoming })
      requestAnimationFrame(() => {
        setTimeout(() => window.scrollTo(scroll.x, scroll.y), 50)
      })
    }

    if (type === 'SCHEMA_GET') {
      event.source.postMessage(
        {
          type: 'SCHEMA_GET_RESPONSE',
          payload: { hash: computeSchemaHash(_defaultState) },
        },
        '*',
      )
    }
  })
}

export function emitStateChange(state) {
  window.parent.postMessage({ type: 'STATE_CHANGED', payload: { state } }, '*')
}

function computeSchemaHash(obj, prefix = '') {
  const entries = []
  for (const [key, val] of Object.entries(obj ?? {})) {
    const path = prefix ? `${prefix}.${key}` : key
    const type = Array.isArray(val) ? 'array' : typeof val
    entries.push(`${path}:${type}`)
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      entries.push(...computeSchemaHash(val, path).split('|').filter(Boolean))
    }
  }
  return entries.sort().join('|')
}
