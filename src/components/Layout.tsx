import { NavLink, Outlet } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { steps } from '../data/mock'
import { useAnnotations } from '../context/annotations'
import Toggle from './Toggle'

export default function Layout() {
  const { show, setShow } = useAnnotations()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition ${
      isActive ? 'bg-accent-50 font-medium text-accent-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
    }`

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-4 px-6 lg:px-8">
          <span className="text-[17px] font-semibold tracking-tight text-accent-700">tacto</span>
          <span className="hidden text-xs text-slate-400 2xl:inline">Lieferantennetzwerk · Konzept</span>

          <nav className="ml-2 flex flex-1 items-center gap-1 overflow-x-auto" aria-label="Storyboard">
            {steps.map((s, i) => (
              <NavLink key={s.path} to={s.path} className={linkClass}>
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isActive ? 'bg-accent-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="hidden whitespace-nowrap xl:inline">{s.label}</span>
                  </>
                )}
              </NavLink>
            ))}
            <NavLink to="/concept" className={(p) => `${linkClass(p)} ml-2`}>
              <FileText className="h-4 w-4" /> Concept
            </NavLink>
          </nav>

          <div className="flex shrink-0 items-center gap-2 text-sm text-slate-600">
            <span className="hidden sm:inline">Show annotations</span>
            <Toggle checked={show} onChange={setShow} label="Show annotations" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Konzept-Mockup für ein Bewerbungsgespräch. Kein offizielles Tacto-Produkt.
      </footer>
    </div>
  )
}
