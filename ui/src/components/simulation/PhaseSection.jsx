/**
 * PhaseSection.jsx
 * ─────────────────
 * Renders one phase group in the Timeline (e.g., "Recon", "Exploitation").
 *
 * In single-prompt mode:   events is SimulationEvent[]
 * In Garak mode:           events is { [probe: string]: SimulationEvent[] }
 *
 * Props
 * ─────
 *   phase           string — phase label
 *   events          SimulationEvent[] | Record<string, SimulationEvent[]>
 *   isGarak         boolean
 *   selectedId      string | null — currently selected event id
 *   onSelect        (event) => void
 *   getRiskScore    (event) => number | null
 */

import { useState } from 'react'
import { TimelineNode } from './TimelineNode.jsx'

const PHASE_COLOR = {
  'Recon':        '#6247ff',
  'Injection':    '#8b5cf6',
  'Exploitation': '#ff5d3d',
  'Exfiltration': '#ff9e2c',
  'System':       '#6b7384',
  'Other':        '#9097a6',
}

function ProbeGroup({ probe, events, selectedId, onSelect, getRiskScore }) {
  const [open, setOpen] = useState(true)
  const blockedCount = events.filter(e => e.stage === 'blocked').length
  const allowedCount = events.filter(e => e.stage === 'allowed').length

  return (
    <div style={{ marginBottom: 6 }}>
      {/* Probe header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 8px',
          background: 'none',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontSize: 11,
          color: '#373c4b',
          fontWeight: 600,
        }}
      >
        <span>{open ? '▾' : '▸'}</span>
        <span style={{ color: '#8b5cf6' }}>probe:</span>
        <span>{probe}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 6, fontSize: 10, fontWeight: 400 }}>
          {blockedCount > 0 && <span style={{ color: '#ff5d3d' }}>{blockedCount} blocked</span>}
          {allowedCount > 0 && <span style={{ color: '#25bb49' }}>{allowedCount} allowed</span>}
        </span>
      </button>

      {open && (
        <div style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {events.map(ev => (
            <TimelineNode
              key={ev.id}
              event={ev}
              selected={selectedId === ev.id}
              onSelect={onSelect}
              riskScore={getRiskScore(ev)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function PhaseSection({ phase, events, isGarak, selectedId, onSelect, getRiskScore }) {
  const [open, setOpen] = useState(true)
  const color = PHASE_COLOR[phase] ?? '#9097a6'

  // Count events in this phase
  const eventCount = isGarak
    ? Object.values(events).reduce((sum, arr) => sum + arr.length, 0)
    : events.length

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Phase header */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '5px 0',
          background: 'none',
          border: 'none',
          borderBottom: `1px solid ${color}22`,
          cursor: 'pointer',
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 10, color }}>{'◆'}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {phase}
        </span>
        <span style={{ fontSize: 10, color: '#9097a6', marginLeft: 4 }}>
          ({eventCount})
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#9097a6' }}>
          {open ? '▾' : '▸'}
        </span>
      </button>

      {open && (
        isGarak ? (
          Object.entries(events).map(([probe, probeEvents]) => (
            <ProbeGroup
              key={probe}
              probe={probe}
              events={probeEvents}
              selectedId={selectedId}
              onSelect={onSelect}
              getRiskScore={getRiskScore}
            />
          ))
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {events.map(ev => (
              <TimelineNode
                key={ev.id}
                event={ev}
                selected={selectedId === ev.id}
                onSelect={onSelect}
                riskScore={getRiskScore(ev)}
              />
            ))}
          </div>
        )
      )}
    </div>
  )
}
