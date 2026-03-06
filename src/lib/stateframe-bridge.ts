export function sendStateSet(
  iframe: HTMLIFrameElement,
  state: Record<string, unknown>,
  scroll: { x: number; y: number },
): void {
  iframe.contentWindow?.postMessage(
    { type: 'STATE_SET', payload: { state, scroll } },
    '*',
  )
}

export function sendStateGet(
  iframe: HTMLIFrameElement,
): Promise<{ state: Record<string, unknown>; scroll: { x: number; y: number } }> {
  return new Promise((resolve) => {
    const handler = (event: MessageEvent) => {
      if (
        event.source === iframe.contentWindow &&
        event.data?.type === 'STATE_GET_RESPONSE'
      ) {
        window.removeEventListener('message', handler)
        resolve(event.data.payload)
      }
    }
    window.addEventListener('message', handler)
    iframe.contentWindow?.postMessage({ type: 'STATE_GET' }, '*')
    setTimeout(() => window.removeEventListener('message', handler), 3000)
  })
}
