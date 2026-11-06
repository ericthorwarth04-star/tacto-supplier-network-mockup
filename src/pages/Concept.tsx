import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, HelpCircle, ShieldCheck, Target } from 'lucide-react'
import { hurdles } from '../data/mock'
import { Card, Page } from '../components/ui'

const mechanics = [
  {
    title: 'Mandatory task, no login',
    text: 'A Tacto customer requests a document (ISO 9001, REACH, CBAM, LkSG) via a Tacto agent. The supplier gets a personal link and uploads in minutes. AI reads the validity dates.',
    step: '/1',
  },
  {
    title: 'Opt-in profile after the task',
    text: 'Only after submitting, a calm card offers a free supplier profile: upload once, release per customer, reminder before expiry.',
    step: '/3',
  },
  {
    title: 'One-click reuse',
    text: 'When another Tacto customer asks for the same document, the supplier releases it with one click. Access is controlled per customer and per document.',
    step: '/4',
  },
  {
    title: 'First offer: request from your own suppliers',
    text: 'With several Tacto customers and incoming CBAM requests, the supplier is offered to request CBAM data from its own suppliers, free and documents-only.',
    step: '/5',
  },
  {
    title: 'Second offer: Tacto in 10 minutes',
    text: 'After real usage (5+ customers or sent sub-requests): a 10-minute video and an optional short call. The supplier is now a qualified, warm lead.',
    step: '/5',
  },
]

const risks = [
  'Cross-customer use of data requires consent in both customer and supplier terms (T&Cs).',
  'A customer may reject Tacto being visible to its suppliers.',
  'Portal fatigue: suppliers already maintain many customer portals.',
  'Distributors and contract manufacturers are not target customers and need to be filtered out.',
]

const questions = [
  'Is Tacto recognisable in the request mail for suppliers today, and does the customer decide on the sender?',
  'Does document reuse currently work across customers?',
  'Who owns uploaded documents: the customer, the supplier, or Tacto?',
]

export default function Concept() {
  return (
    <Page narrow>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Concept summary</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">From supplier request to growth channel</h1>
      <p className="mt-3 text-slate-600">
        Turning the suppliers of Tacto's customers into a growth channel without damaging the customer–supplier relationship.
      </p>

      <section className="mt-10">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Target className="h-5 w-5 text-accent-600" /> Problem
        </h2>
        <p className="text-slate-700">
          Tacto's agents already reach a large number of suppliers when customers request compliance documents. Today the interaction ends
          after the upload. The supplier experiences Tacto only as buyer pressure, and there is no reason to come back. At the same
          time, many suppliers are manufacturers themselves, with their own supplier base and the same documentation burden (CBAM,
          LkSG). The challenge: use this reach without making customers feel their suppliers are being sold to, and without exposing
          anything confidential.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Mechanics in 5 steps</h2>
        <ol className="space-y-3">
          {mechanics.map((m, i) => (
            <li key={m.title}>
              <Card className="flex gap-4 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-700 text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{m.title}</div>
                  <div className="mt-0.5 text-sm text-slate-600">{m.text}</div>
                </div>
                <Link to={m.step} className="self-center text-xs text-accent-700 hover:underline">
                  Screen {m.step.slice(1)}
                </Link>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <ShieldCheck className="h-5 w-5 text-accent-600" /> Hurdles addressed
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(hurdles).map((h) => (
            <Card key={h.title} className="p-4">
              <div className="text-sm font-semibold text-slate-900">{h.title}</div>
              <div className="mt-1 text-sm text-slate-600">{h.text}</div>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Guiding principles: prices, negotiations and should-costs never appear. No customer sees the supplier's other customers.
          Value first, sales second: no offer right after the first mandatory task.
        </p>
      </section>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <AlertTriangle className="h-5 w-5 text-amber-600" /> Risks
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {risks.map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {r}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <HelpCircle className="h-5 w-5 text-accent-600" /> Open questions for Tacto
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {questions.map((q) => (
              <li key={q} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {q}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-6">
        <Link to="/1" className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:underline">
          Start the walkthrough <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Page>
  )
}
