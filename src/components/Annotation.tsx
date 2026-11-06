import { useState } from 'react'
import { X } from 'lucide-react'
import { hurdles, type HurdleKey } from '../data/mock'
import { useAnnotations } from '../context/annotations'

interface Props {
  n: number
  hurdle: HurdleKey
  note?: string
  align?: 'left' | 'right'
  placement?: 'top' | 'bottom'
  className?: string
}

/** Numbered presentation marker. Only rendered when "Show annotations" is on. */
export default function Annotation({ n, hurdle, note, align = 'left', placement = 'bottom', className = '' }: Props) {
  const { show } = useAnnotations()
  const [pinned, setPinned] = useState(false)
  const [hover, setHover] = useState(false)
  if (!show) return null
  const h = hurdles[hurdle]
  const open = pinned || hover

  return (
    <span
      className={`relative inline-flex align-middle ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-amber-950 shadow-md ring-2 ring-white transition hover:scale-110"
        aria-label={`Annotation ${n}: ${h.title}`}
      >
        {n}
      </button>
      {open && (
        <span
          className={`absolute z-50 ${placement === 'top' ? 'bottom-8' : 'top-8'} block w-72 rounded-lg border border-amber-200 bg-amber-50 p-3 text-left text-[13px] font-normal normal-case leading-snug tracking-normal text-amber-950 shadow-xl ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <span className="mb-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">Hurdle: {h.title}</span>
            {pinned && <X className="h-3.5 w-3.5 cursor-pointer text-amber-700" onClick={() => setPinned(false)} />}
          </span>
          <span className="block">{note ?? h.text}</span>
        </span>
      )}
    </span>
  )
}
