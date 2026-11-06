import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { DocStatus } from '../data/mock'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-accent-700 text-white hover:bg-accent-800 disabled:bg-slate-300',
    secondary: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400',
    ghost: 'text-slate-600 hover:bg-slate-100',
    danger: 'border border-slate-300 bg-white text-rose-700 hover:bg-rose-50',
  }
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function StatusBadge({ status, label }: { status: DocStatus; label: string }) {
  const styles: Record<DocStatus, string> = {
    valid: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    expiring: 'bg-amber-50 text-amber-800 ring-amber-200',
    expired: 'bg-rose-50 text-rose-700 ring-rose-200',
  }
  const dot: Record<DocStatus, string> = { valid: 'bg-emerald-500', expiring: 'bg-amber-500', expired: 'bg-rose-500' }
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[status]}`} />
      {label}
    </span>
  )
}

export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-0.5">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          className={`cursor-pointer rounded-md px-4 py-1.5 text-sm transition ${
            value === o.value ? 'bg-white font-medium text-accent-700 shadow-sm' : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Page({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <div className={`mx-auto px-8 py-10 ${narrow ? 'max-w-3xl' : 'max-w-[1200px]'}`}>{children}</div>
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{children}</p>
}

/** Small grey caption above a mock screen, explaining where we are in the story. */
export function SceneCaption({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-sm text-slate-500">
      <span className="rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">Schritt {step}</span>
      <span>{children}</span>
    </div>
  )
}
