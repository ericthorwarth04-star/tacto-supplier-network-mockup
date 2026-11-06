import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  prev?: string
  next?: string
  nextLabel?: string
}

export default function StepNav({ prev, next, nextLabel = 'Weiter' }: Props) {
  return (
    <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
      {prev ? (
        <Link to={prev} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          to={next}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {nextLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
