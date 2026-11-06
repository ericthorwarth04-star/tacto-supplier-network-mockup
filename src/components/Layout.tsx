import { NavLink, Outlet } from 'react-router-dom'
import { steps } from '../data/mock'
import { useAnnotations } from '../context/annotations'
import Toggle from './Toggle'

/** Presentation chrome: a slim black storyboard bar, styled like tacto.ai's announcement bar. */
export default function Layout() {
  const { show, setShow } = useAnnotations()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 whitespace-nowrap px-3 py-1 font-mono text-[11px] uppercase tracking-[0.05em] transition ${
      isActive ? 'text-white' : 'text-white/45 hover:text-white/80'
    }`

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 bg-black">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center gap-4 px-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-white/45">Storyboard</span>

          <nav className="flex flex-1 items-center overflow-x-auto" aria-label="Storyboard">
            {steps.map((s, i) => (
              <NavLink key={s.path} to={s.path} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border text-[10px] ${
                        isActive ? 'border-orange bg-orange text-white' : 'border-white/25 text-white/60'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="hidden xl:inline">{s.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <span className="mx-2 h-4 w-px bg-white/15" />
            <NavLink to="/concept" className={linkClass}>
              Concept
            </NavLink>
          </nav>

          <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-[0.05em] text-white/60">
            <span className="hidden sm:inline">Show annotations</span>
            <Toggle checked={show} onChange={setShow} label="Show annotations" size="sm" onDark />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-black/[0.06] py-5 text-center font-mono text-[10.5px] uppercase tracking-[0.04em] text-black/40">
        Konzept-Mockup für ein Bewerbungsgespräch. Kein offizielles Tacto-Produkt.
      </footer>
    </div>
  )
}
