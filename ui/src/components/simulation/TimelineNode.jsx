/**
 * TimelineNode.jsx
 * ─────────────────
 * Single clickable simulation event row in the Timeline.
 *
 * Props
 * ─────
 *   event           SimulationEvent
 *   selected        boolean — true if this event is currently selected
 *   onSelect        (event) => void — called when node is clicked
 *   riskScore       number | null — 0–100 (passed from parent, derived via STAGE_RISK)
 */

const STAGE_STYLE = {
  blocked:     { bg: '#fff1ee', border: '#ff5d3d', dot: '#ff5d3d', label: 'BLOCKED'     },
  allowed:     { bg: '#f0fdf4', border: '#25bb49', dot: '#25bb49', label: 'ALLOWED'     },
  error:       { bg: '#fff6ea', border: '#ff9e2c', dot: '#ff9e2c', label: 'ERROR'       },
  probe_error: { bg: '#fff6ea', border: '#ff9e2c', dot: '#ff9e2c', label: 'PROBE ERROR' },
  started:     { bg: '#f2f1ff', border: '#6247ff', dot: '#6247ff', label: 'START'       },
  progress:    { bg: '#fafafa', border: '#d3d4dd', dot: '#9097a6', label: 'PROBE'       },
  completed:   { bg: '#f7f7f9', border: '#d3d4dd', dot: '#9097a6', label: 'DONE'        },
}
const DEFAULT_STYLE = { bg: '#f7f7f9', border: '#d3d4dd', dot: '#9097a6', label: '—' }

function riskColor(score) {
  if (score == null) return '#9097a6'
  if (score >= 80) return '#ff5d3d'
  if (score >= 50) return '#ff9e2c'
  return '#25bb49'
}

export function TimelineNode({ event, selected, onSelect, riskScore = null }) {
  const s = STAGE_STYLE[event.stage] ?? DEFAULT_STYLE
  const hasExplanation = !!event.details?.explanation

  return (
    <div
      onClick={() => onSelect(event)}
      title={hasExplanation ? (event.details.explanation.title || event.event_type) : event.event_type}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        padding: '8px 12px',
        cursor: 'pointer',
        background: s.bg,
        borderRadius: 6,
        borderLeft: `3px solid ${s.border}`,
        outline: selected ? '2px solid #6366f1' : 'none',
        outlineOffset: 1,
        transition: 'outline 0.1s, background 0.1s',
        userSelect: 'none',
      }}
    >
      {/* Stage dot */}
      <div style={{
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: s.dot,
        marginTop: 4,
        flexShrink: 0,
      }} />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: s.border, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {s.label}
          </span>
          {hasExplanation && (
            <span style={{ fontSize: 9, color: '#6366f1', fontWeight: 600 }}>🔍</span>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#373c4b', marginTop: 2, fontWeight: 500 }}>
          {event.event_type}
        </div>

        {event.details?.message && (
          <div style={{ fontSize: 11, color: '#6b7384', marginTop: 2 }}>
            {event.details.message}
          </div>
        )}

        {event.details?.categories?.length > 0 && (
          <div style={{ fontSize: 11, color: '#e8452a', marginTop: 2 }}>
            {event.details.categories.join(', ')}
          </div>
        )}

        {event.details?.probe_name && (
          <div style={{ fontSize: 10, color: '#8b5cf6', marginTop: 2 }}>
            probe: {event.details.probe_name}
          </div>
        )}
      </div>

      {/* Right side: risk score + time */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
        {riskScore != null && (
          <span style={{ fontSize: 11, fontWeight: 700, color: riskColor(riskScore) }}>
            {riskScore}
          </span>
        )}
        <span style={{ fontSize: 10, color: '#9097a6', whiteSpace: 'nowrap' }}>
          {event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : ''}
        </span>
      </div>
    </div>
  )
}
