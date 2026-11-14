import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils.js'
import { ChevronRight } from 'lucide-react'
import { NAV, PINNED } from '../../config/navigation.js'

/**
 * AppSidebar — collapsible navigation sidebar.
 *
 * Structure:
 *   ┌──────────────────────────┐
 *   │  Branding (h-16)         │
 *   ├──────────────────────────┤
 *   │  ● Overview  (pinned)    │  ← always first, above all sections
 *   ├──────────────────────────┤
 *   │  Monitor                 │
 *   │    Dashboard             │
 *   │    Posture               │
 *   │    Alerts                │
 *   │  Discover                │
 *   │    Inventory             │
 *   │    Identity & Trust      │
 *   │    Data & Knowledge      │
 *   │  Protect                 │
 *   │    Runtime               │
 *   │    Policies              │
 *   │    Lineage               │
 *   │  Validate                │
 *   │    Simulation            │
 *   │    Cases                 │
 *   │    Automation            │
 *   │  Platform                │
 *   │    Integrations          │
 *   │    Settings              │
 *   ├──────────────────────────┤
 *   │  User footer             │
 *   └──────────────────────────┘
 *
 * COLLAPSE: Uses conditional rendering (not CSS hide) for labels and
 * section headers. See inline comments for positioning rationale.
 */

// ── NavItem ───────────────────────────────────────────────────────────────────

function NavItem({ to, icon: Icon, label, end = false, collapsed, pinned = false }) {
  return (
    <div className="relative group/navitem">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          cn(
            'relative flex items-center w-full h-10 text-[13px] rounded-lg',
            'transition-colors duration-150 cursor-pointer select-none',
            collapsed ? 'justify-center' : 'gap-3 px-3',
            isActive
              ? pinned
                /* Pinned Overview item: slightly stronger active treatment */
                ? 'bg-white/[0.09] text-white font-bold'
                : 'bg-white/[0.09] text-white font-semibold'
              : 'text-white/55 hover:bg-white/[0.05] hover:text-white font-medium',
          )
        }
      >
        {({ isActive }) => (
          <>
            {/* Active accent pill — expanded mode only */}
            {isActive && !collapsed && (
              <span className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full',
                pinned ? 'h-6 bg-blue-400' : 'h-5 bg-blue-400',
              )} />
            )}

            <Icon
              size={16}
              strokeWidth={pinned ? 2 : 1.75}
              className={cn(
                'block shrink-0 transition-opacity duration-150',
                isActive ? 'opacity-100' : 'opacity-50 group-hover/navitem:opacity-90',
              )}
            />

            {!collapsed && (
              <span className="truncate leading-none">{label}</span>
            )}
          </>
        )}
      </NavLink>

      {/* Tooltip — collapsed mode only */}
      {collapsed && (
        <div className={cn(
          'pointer-events-none',
          'absolute left-full top-1/2 -translate-y-1/2 ml-2',
          'px-2.5 py-1.5 bg-level border border-white/10 text-white text-xs font-medium',
          'rounded-lg whitespace-nowrap shadow-lg',
          'opacity-0 group-hover/navitem:opacity-100',
          'transition-opacity duration-150',
          'z-50',
        )}>
          {label}
        </div>
      )}
    </div>
  )
}

// ── AppSidebar ────────────────────────────────────────────────────────────────

export function AppSidebar({ collapsed }) {
  return (
    <aside
      className={cn(
        'shrink-0 h-screen flex flex-col bg-[rgba(9,4,16,0.55)] backdrop-blur-2xl border-r border-white/[0.08]',
        'transition-[width] duration-200 ease-in-out',
        collapsed ? 'w-20' : 'w-64',
      )}
      style={{ willChange: 'width' }}
    >

      {/* ── Branding ─────────────────────────────────────────────────────── */}
      <div className={cn(
        'h-16 shrink-0 flex items-center border-b border-white/[0.08]',
        collapsed ? 'justify-center' : 'px-4 gap-3',
      )}>
        <div
          className="w-8 h-8 shrink-0 rounded-[10px] flex items-center justify-center font-display text-[15px] font-bold text-white shadow-glow"
          style={{ background: 'var(--accent-gradient)' }}
          aria-hidden="true"
        >
          A
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold text-white leading-none tracking-tight">AISPM</p>
            <p className="text-[11px] text-white/40 mt-[4px] leading-none">MVP v1</p>
          </div>
        )}
      </div>

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <nav className={cn(
        'flex-1 py-2',
        !collapsed && 'px-2 overflow-y-auto',
      )}>

        {/* ── Pinned Overview item — above all sections ─────────────────── */}
        <div className={cn(!collapsed ? 'px-0 mb-1' : 'mb-1')}>
          <NavItem collapsed={collapsed} pinned {...PINNED} />
        </div>

        {/* Separator between pinned item and sections */}
        {!collapsed
          ? <div className="border-t border-white/[0.08] mx-1 mb-2" />
          : <div className="border-t border-white/[0.08] mx-3 mb-2" />
        }

        {/* ── Sectioned navigation ──────────────────────────────────────── */}
        {NAV.map(({ section, items }, i) => (
          <div key={section} className={i > 0 ? 'mt-1' : ''}>

            {!collapsed ? (
              <p className="px-3 pt-2.5 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 leading-none">
                {section}
              </p>
            ) : (
              i > 0 && <div className="border-t border-white/[0.08] my-2 mx-3" />
            )}

            <div className="space-y-px">
              {items.map(item => (
                <NavItem key={item.to} collapsed={collapsed} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Footer — user account ─────────────────────────────────────────── */}
      <div className="border-t border-white/[0.08] shrink-0 py-3">
        <div className={cn(
          'flex items-center cursor-pointer rounded-lg',
          'hover:bg-white/[0.05] transition-colors duration-150 group/footer',
          collapsed ? 'justify-center h-10 mx-0' : 'gap-3 px-4 py-2.5 mx-2',
        )}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-[11px] font-bold text-white shrink-0">
            A
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate leading-snug">Admin</p>
                <p className="text-[11px] text-white/45 truncate leading-snug">admin@aispm.local</p>
              </div>
              <ChevronRight
                size={13}
                strokeWidth={1.75}
                className="text-white/30 group-hover/footer:text-white/70 transition-colors shrink-0"
              />
            </>
          )}
        </div>
      </div>

    </aside>
  )
}
