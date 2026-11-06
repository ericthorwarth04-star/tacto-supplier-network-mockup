import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  prev?: string
  next?: string
  nextLabel?: string
}

export default function StepNav({ prev, next, nextLabel = 'Weiter' }: Props) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-black/[0.08] pt-6">
      {prev ? (
        <Link to={prev} className="inline-flex items-center gap-2 px-1 py-2 font-mono text-[11px] uppercase tracking-[0.04em] text-black/55 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next}
          className="inline-flex items-center gap-2 rounded-[4px] border border-black/20 bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.04em] text-black hover:border-black/50"
        >
          {nextLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
