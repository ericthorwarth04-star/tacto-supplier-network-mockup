import type { ReactNode } from 'react'
import { supplier } from '../data/mock'

interface Props {
  /** "request" = anonymous link view (no login), "portal" = supplier profile with tabs */
  mode: 'request' | 'portal'
  activeTab?: string
  context?: ReactNode
  children: ReactNode
}

const tabs = ['Übersicht', 'Dokumente', 'Freigaben', 'Für Sie']

/** Product frame in the style of Tacto's app: floating white top bar on a whitesmoke canvas. */
export default function TactoShell({ mode, activeTab, context, children }: Props) {
  return (
    <div className="relative">
      <div className="glow-orange pointer-events-none absolute inset-x-0 top-0 h-64" />
      <div className="relative mx-auto max-w-[1200px] px-8 pt-6">
        <div className="card flex h-14 items-center gap-6 px-5">
          <span className="text-[22px] font-normal tracking-[-0.03em]">tacto</span>
          <span className="h-5 w-px bg-black/10" />
          <span className="mono-label !text-black/70">{mode === 'request' ? 'Lieferantenanfrage' : 'Lieferantenportal'}</span>

          {mode === 'portal' && (
            <nav className="ml-4 flex items-center gap-6">
              {tabs.map((t) => (
                <span
                  key={t}
                  className={`font-mono text-[11px] uppercase tracking-[0.04em] ${
                    t === activeTab ? 'text-black' : 'text-black/40'
                  }`}
                >
                  {t}
                  {t === activeTab && <span className="mt-1 block h-px bg-orange" />}
                </span>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-3">
            {context}
            {mode === 'portal' && (
              <>
                <div className="text-right">
                  <div className="text-[13px] leading-tight">{supplier.contact}</div>
                  <div className="mono-label">{supplier.company}</div>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black font-mono text-[11px] text-white">
                  {supplier.initials}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
