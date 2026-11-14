/**
 * AccentPillar — 6px vertical brand strip, leftmost flex child.
 * Participates in layout naturally (no fixed/absolute).
 */
export function AccentPillar() {
  return (
    <div
      className="w-1.5 shrink-0 h-full"
      style={{ background: 'linear-gradient(180deg, #7d86ff 0%, #4d30ff 45%, #2c20db 100%)' }}
      aria-hidden="true"
    />
  )
}
