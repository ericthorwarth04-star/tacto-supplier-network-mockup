import { useState } from 'react'
import { Check, EyeOff, FileText } from 'lucide-react'
import { customers, documents, initialSharing, openRequest, stats, supplier, type CustomerId } from '../data/mock'
import { AgentOrb, Button, Card, IconTile, Label, Page, SceneCaption, StatusBadge, Tag } from '../components/ui'
import StepNav from '../components/StepNav'
import Toggle from '../components/Toggle'
import Annotation from '../components/Annotation'
import TactoShell from '../components/TactoShell'

export default function SupplierProfile() {
  const [sharing, setSharing] = useState(initialSharing)
  const [released, setReleased] = useState(false)

  const kessler = customers.find((c) => c.id === openRequest.customerId)!

  const setCell = (docId: string, cid: CustomerId, v: boolean) =>
    setSharing((s) => ({ ...s, [docId]: { ...s[docId], [cid]: v } }))

  const tiles = [
    { label: 'Anfragen dieses Jahr', value: String(stats.requestsThisYear), sub: 'über Tacto beantwortet' },
    { label: 'Ø Bearbeitungszeit', value: `${stats.avgHandlingMinutes} Min`, sub: 'pro Anfrage' },
    { label: 'Kunden über Tacto', value: String(stats.customersViaTacto), sub: 'mit eigener Freigabe' },
    { label: 'Nächstes Ablaufdatum', value: stats.nextExpiry, sub: stats.nextExpiryDoc },
  ]

  return (
    <TactoShell mode="portal" activeTab="Übersicht">
      <Page>
        <SceneCaption step={4}>Einige Wochen später: Das kostenlose Profil spart Sabine Krause bei jeder neuen Anfrage Arbeit.</SceneCaption>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <Label>Lieferantenprofil</Label>
            <h1 className="mt-2 text-[34px] font-light leading-tight tracking-[-0.02em]">
              {supplier.company}
              <span className="block text-black/35">6 Dokumente, 3 Kunden, alles an einem Ort.</span>
            </h1>
          </div>
          <Tag>Kostenloses Profil</Tag>
        </div>

        <Card className="grid grid-cols-4 divide-x divide-black/[0.06]">
          {tiles.map(({ label, value, sub }, i) => (
            <div key={label} className="px-6 py-5">
              <div className="flex items-center justify-between">
                <Label>{label}</Label>
                {i === 1 && (
                  <Annotation
                    n={1}
                    hurdle="asymmetry"
                    align="right"
                    note="The supplier sees its own benefit in numbers: 14 requests answered in about 4 minutes each instead of chasing PDFs in different portals."
                  />
                )}
              </div>
              <div className="mt-3 text-[30px] font-light leading-none tracking-[-0.02em]">{value}</div>
              <div className="mt-1.5 text-[12px] text-black/45">{sub}</div>
            </div>
          ))}
        </Card>

        {/* Open request, styled like a Tacto agent event */}
        <Card className="mt-5">
          <div className="flex items-center gap-4 px-6 py-4">
            <AgentOrb size={34} />
            <div className="flex-1">
              <Label>Offene Anfrage · Eingang {openRequest.receivedAt}</Label>
              <div className="mt-0.5 text-[15px]">
                {kessler.name} fragt {openRequest.document} an, Frist {openRequest.deadline}.
              </div>
              {!released ? (
                <div className="text-[13px] text-black/50">ISO 9001 liegt in Ihrem Profil. Mit einem Klick freigeben.</div>
              ) : (
                <div className="flex items-center gap-1.5 text-[13px] text-[#13898b]">
                  <Check className="h-3.5 w-3.5" /> Freigegeben. {kessler.name} hat das Zertifikat erhalten. Dauer: 3 Sekunden.
                </div>
              )}
            </div>
            {!released ? (
              <Button
                onClick={() => {
                  setCell('iso9001', 'kessler', true)
                  setReleased(true)
                }}
              >
                Mit einem Klick freigeben
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => {
                  setReleased(false)
                  setCell('iso9001', 'kessler', false)
                }}
              >
                Rückgängig
              </Button>
            )}
            <Annotation
              n={2}
              hurdle="discretion"
              align="right"
              note="Kessler only sees that the certificate was released to them. It never learns that Hoffmann or Weiland asked for the same document."
            />
          </div>
        </Card>

        <div className="mt-5 grid grid-cols-2 gap-5">
          {/* Documents */}
          <Card>
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
              <div>
                <Label>Dokumente</Label>
                <div className="text-[16px]">Meine Dokumente</div>
              </div>
              <span className="mono-label">{documents.length} gespeichert</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="mono-label px-6 py-2.5 font-normal">Dokument</th>
                  <th className="mono-label px-3 py-2.5 font-normal">Gültig bis</th>
                  <th className="mono-label px-6 py-2.5 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id} className="border-t border-black/[0.06]">
                    <td className="h-[62px] px-6">
                      <div className="flex items-center gap-3">
                        <IconTile icon={FileText} />
                        <div>
                          <div className="text-[14px]">{d.name}</div>
                          <div className="mono-label">{d.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 font-mono text-[12px] text-black/60">{d.validTo}</td>
                    <td className="px-6">
                      <StatusBadge status={d.status} label={d.statusLabel} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="border-t border-black/[0.06] px-6 py-3 text-[12px] text-black/45">
              Gespeichert werden nur Zertifikate und Erklärungen. Preise, Angebote und Kalkulationen sind nicht vorgesehen.
            </div>
          </Card>

          {/* Sharing matrix */}
          <Card>
            <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-4">
              <div>
                <Label>Freigaben</Label>
                <div className="text-[16px]">Freigaben pro Kunde</div>
              </div>
              <Annotation n={3} hurdle="confidentiality" align="right" />
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="mono-label px-6 py-2.5 text-left font-normal">Dokument</th>
                  {customers.map((c) => (
                    <th key={c.id} className="mono-label px-3 py-2.5 text-center font-normal">
                      {c.short}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((d) => (
                  <tr key={d.id} className="border-t border-black/[0.06]">
                    <td className="h-[62px] px-6 text-[14px]">{d.name}</td>
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
            <div className="flex items-center gap-2 border-t border-black/[0.06] px-6 py-3 text-[12px] text-black/60">
              <EyeOff className="h-3.5 w-3.5 text-sea" />
              Jeder Kunde sieht nur seine eigenen Freigaben, nie die anderen Kunden.
            </div>
          </Card>
        </div>

        <StepNav prev="/3" next="/5" />
      </Page>
    </TactoShell>
  )
}
