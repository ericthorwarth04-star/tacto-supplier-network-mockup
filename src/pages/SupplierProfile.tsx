import { useState } from 'react'
import { CalendarClock, CheckCircle2, EyeOff, FileText, Inbox, Timer, Users } from 'lucide-react'
import { customers, documents, initialSharing, openRequest, stats, supplier, type CustomerId } from '../data/mock'
import { Button, Card, Page, SceneCaption, StatusBadge } from '../components/ui'
import StepNav from '../components/StepNav'
import Toggle from '../components/Toggle'
import Annotation from '../components/Annotation'

export default function SupplierProfile() {
  const [sharing, setSharing] = useState(initialSharing)
  const [released, setReleased] = useState(false)

  const kessler = customers.find((c) => c.id === openRequest.customerId)!

  const setCell = (docId: string, cid: CustomerId, v: boolean) =>
    setSharing((s) => ({ ...s, [docId]: { ...s[docId], [cid]: v } }))

  const releaseToKessler = () => {
    setCell('iso9001', 'kessler', true)
    setReleased(true)
  }

  const tiles = [
    { icon: Inbox, label: 'Anfragen dieses Jahr', value: String(stats.requestsThisYear), sub: 'über Tacto beantwortet' },
    { icon: Timer, label: 'Ø Bearbeitungszeit', value: `${stats.avgHandlingMinutes} Min`, sub: 'pro Anfrage' },
    { icon: Users, label: 'Kunden über Tacto', value: String(stats.customersViaTacto), sub: 'mit eigener Freigabe' },
    { icon: CalendarClock, label: 'Nächstes Ablaufdatum', value: stats.nextExpiry, sub: stats.nextExpiryDoc },
  ]

  return (
    <Page>
      <SceneCaption step={4}>Einige Wochen später: Das kostenlose Profil spart Sabine Krause bei jeder neuen Anfrage Arbeit.</SceneCaption>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-500">Lieferantenprofil</p>
          <h1 className="text-2xl font-semibold text-slate-900">{supplier.company}</h1>
          <p className="text-sm text-slate-500">
            {supplier.contact}, {supplier.role}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Kostenloses Profil</span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {tiles.map(({ icon: Icon, label, value, sub }, i) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{label}</span>
              {i === 1 ? <Annotation n={1} hurdle="asymmetry" align="right" note="The supplier sees its own benefit in numbers: 14 requests answered in about 4 minutes each instead of chasing PDFs in different portals." /> : <Icon className="h-4 w-4 text-slate-400" />}
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
            <div className="text-xs text-slate-400">{sub}</div>
          </Card>
        ))}
      </div>

      {/* Open request */}
      <Card className="mt-6 border-accent-200 bg-accent-50/50 p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent-700 ring-1 ring-accent-200">
            <Inbox className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent-700">Offene Anfrage</div>
            <div className="text-sm text-slate-800">
              <strong className="font-medium">{kessler.name}</strong> fragt {openRequest.document} an, Frist {openRequest.deadline}.
            </div>
            {!released ? (
              <div className="text-sm text-slate-600">ISO 9001 liegt in Ihrem Profil. Mit einem Klick freigeben.</div>
            ) : (
              <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" /> Freigegeben. {kessler.name} hat das Zertifikat erhalten. Dauer: 3 Sekunden.
              </div>
            )}
          </div>
          {!released ? (
            <Button onClick={releaseToKessler}>Mit einem Klick freigeben</Button>
          ) : (
            <Button variant="ghost" onClick={() => { setReleased(false); setCell('iso9001', 'kessler', false) }}>
              Rückgängig
            </Button>
          )}
          <Annotation n={2} hurdle="discretion" align="right" note="Kessler only sees that the certificate was released to them. It never learns that Hoffmann or Weiland asked for the same document." />
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-[1fr_1fr] gap-6">
        {/* Documents */}
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Meine Dokumente</h2>
            <span className="text-xs text-slate-400">{documents.length} Dokumente</span>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs text-slate-500">
              <tr>
                <th className="px-5 py-2 font-medium">Dokument</th>
                <th className="px-3 py-2 font-medium">Gültig bis</th>
                <th className="px-5 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-800">{d.name}</div>
                        <div className="text-xs text-slate-400">{d.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-slate-600">{d.validTo}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={d.status} label={d.statusLabel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
            Gespeichert werden nur Zertifikate und Erklärungen. Preise, Angebote und Kalkulationen sind nicht vorgesehen.
          </div>
        </Card>

        {/* Sharing matrix */}
        <Card className="overflow-visible">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Freigaben pro Kunde</h2>
            <Annotation n={3} hurdle="confidentiality" align="right" />
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-2 text-left font-medium">Dokument</th>
                {customers.map((c) => (
                  <th key={c.id} className="px-3 py-2 text-center font-medium">
                    {c.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="h-[61px] px-5 font-medium text-slate-800">{d.name}</td>
                  {customers.map((c) => (
                    <td key={c.id} className="px-3 text-center">
                      <div className="flex justify-center">
                        <Toggle
                          size="sm"
                          checked={sharing[d.id][c.id]}
                          onChange={(v) => setCell(d.id, c.id, v)}
                          label={`${d.name} für ${c.short} freigeben`}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center gap-2 border-t border-slate-100 bg-slate-50 px-5 py-3 text-xs text-slate-600">
            <EyeOff className="h-4 w-4 text-accent-600" />
            Jeder Kunde sieht nur seine eigenen Freigaben, nie die anderen Kunden.
          </div>
        </Card>
      </div>

      <StepNav prev="/3" next="/5" />
    </Page>
  )
}
