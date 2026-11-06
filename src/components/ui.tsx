import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { DocStatus } from '../data/mock'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function Label({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mono-label ${className}`}>{children}</div>
}

/** Bordered mono tag, like Tacto's "TECHNOLOGIEFÜHRER" chip. */
export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'orange' | 'sea' }) {
  const tones = {
    default: 'border-black/20 text-black/70',
    orange: 'border-orange/40 bg-orange-soft text-orange',
    sea: 'border-sea/40 bg-sea-soft text-[#13898b]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.04em] ${tones[tone]}`}>
      {children}
    </span>
  )
}

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-black text-white border border-black hover:bg-neutral-800 disabled:bg-stone disabled:border-stone disabled:text-black/40',
    secondary: 'bg-white text-black border border-black/20 hover:border-black/50 disabled:text-black/30',
    ghost: 'border border-transparent text-black/60 hover:text-black',
    danger: 'bg-white text-black border border-black/20 hover:border-orange hover:text-orange',
  }
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-[4px] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] transition disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export function StatusBadge({ status, label }: { status: DocStatus; label: string }) {
  const dot: Record<DocStatus, string> = { valid: 'bg-green', expiring: 'bg-yellow', expired: 'bg-orange' }
  const text: Record<DocStatus, string> = { valid: 'text-black/70', expiring: 'text-black/80', expired: 'text-orange' }
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.04em] ${text[status]}`}>
      <span className={`h-2 w-2 rounded-full ${dot[status]}`} />
      {label}
    </span>
  )
}

/** Square icon tile with a sea-coloured glyph, as in Tacto's product cards. */
export function IconTile({ icon: Icon, tone = 'sea' }: { icon: LucideIcon; tone?: 'sea' | 'orange' | 'ink' }) {
  const tones = { sea: 'text-sea', orange: 'text-orange', ink: 'text-black/70' }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-black/[0.06] bg-smoke">
      <Icon className={`h-4 w-4 ${tones[tone]}`} strokeWidth={1.75} />
    </span>
  )
}

export function AgentOrb({ size = 32 }: { size?: number }) {
  return <span className="agent-orb inline-block shrink-0" style={{ width: size, height: size }} />
}

/** Pill tab bar, active pill gets the orange spark treatment from tacto.ai. */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  dark = false,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  dark?: boolean
}) {
  return (
    <div className={`inline-flex rounded-full border p-1 ${dark ? 'border-white/15 bg-white/5' : 'border-black/10 bg-white'}`}>
      {options.map((o) => {
        const active = value === o.value
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] transition ${
              active
                ? dark
                  ? 'bg-white text-black'
                  : 'border border-orange/30 bg-gradient-to-r from-orange-soft to-white text-black'
                : dark
                  ? 'text-white/60 hover:text-white'
                  : 'border border-transparent text-black/55 hover:text-black'
            }`}
          >
            {active && <Spark className="h-2.5 w-2.5" />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** Generic four-point spark glyph (not the Tacto logo). */
export function Spark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={`text-orange ${className}`} aria-hidden>
      <path d="M5 0 L5.9 4.1 L10 5 L5.9 5.9 L5 10 L4.1 5.9 L0 5 L4.1 4.1 Z" fill="currentColor" />
    </svg>
  )
}

export function Page({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return <div className={`mx-auto px-8 py-10 ${narrow ? 'max-w-3xl' : 'max-w-[1200px]'}`}>{children}</div>
}

/** Small caption above a mock screen, explaining where we are in the story. */
export function SceneCaption({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-[13px] text-black/55">
      <Tag>Schritt {step}</Tag>
      <span>{children}</span>
    </div>
  )
}
