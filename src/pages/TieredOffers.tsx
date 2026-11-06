import { useState } from 'react'
import {
  BellRing,
  CalendarDays,
  CheckCircle2,
  Info,
  Lock,
  Play,
  Send,
  SlidersHorizontal,
  UserRound,
  Leaf,
  type LucideIcon,
} from 'lucide-react'
import { callSlots, ownSuppliers, stats } from '../data/mock'
import { Button, Card, Page, SceneCaption, Segmented } from '../components/ui'
import StepNav from '../components/StepNav'
import Annotation from '../components/Annotation'

type CustomerCount = 1 | 3 | 5

function StageHeader({ n, title, icon: Icon }: { n: number; title: string; icon: LucideIcon }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-50 text-accent-700 ring-1 ring-accent-200">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Stufe {n}</div>
        <div className="font-semibold text-slate-900">{title}</div>
      </div>
    </div>
  )
}

function LockedStage({ n, title, condition }: { n: number; title: string; condition: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 px-6 py-5 text-sm text-slate-400">
      <Lock className="h-4 w-4" />
      <span>
        <span className="font-medium text-slate-500">
          Stufe {n}: {title}
        </span>{' '}
        wird noch nicht angezeigt. Bedingung: {condition}
      </span>
    </div>
  )
}

export default function TieredOffers() {
  const [count, setCount] = useState<CustomerCount>(3)
  const [cbam, setCbam] = useState(true)

  const [cbamFormOpen, setCbamFormOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['s1', 's2', 's4'])
  const [subRequestsSent, setSubRequestsSent] = useState(false)

  const [callOpen, setCallOpen] = useState(false)
  const [slot, setSlot] = useState<string | null>(null)
  const [introSent, setIntroSent] = useState(false)

  const showStage2 = count >= 3 && cbam
  const showStage3 = count >= 5 || (count >= 3 && subRequestsSent)

  const toggleSupplier = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <Page>
      <SceneCaption step={5}>Erst wenn der Nutzen erlebt wurde, erscheinen gestaffelte Angebote im Profil.</SceneCaption>

      {/* Interview simulator */}
      <div className="mb-8 rounded-xl border border-slate-300 bg-slate-800 p-5 text-slate-100">
        <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <SlidersHorizontal className="h-4 w-4" /> Interview simulator (not part of the product UI)
        </div>
        <div className="flex flex-wrap items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">Anzahl Tacto-Kunden</span>
            <Segmented<CustomerCount>
              value={count}
              onChange={setCount}
              options={[
                { value: 1, label: '1' },
                { value: 3, label: '3' },
                { value: 5, label: '5' },
              ]}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">CBAM-Anfragen erhalten</span>
            <Segmented<'ja' | 'nein'>
              value={cbam ? 'ja' : 'nein'}
              onChange={(v) => setCbam(v === 'ja')}
              options={[
                { value: 'ja', label: 'ja' },
                { value: 'nein', label: 'nein' },
              ]}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <span>Teilanfragen gesendet:</span>
            <span className={subRequestsSent ? 'font-medium text-emerald-300' : 'text-slate-400'}>{subRequestsSent ? 'ja' : 'nein'}</span>
            {subRequestsSent && (
              <button
                className="ml-1 cursor-pointer text-xs text-slate-400 underline hover:text-slate-200"
                onClick={() => {
                  setSubRequestsSent(false)
                  setCbamFormOpen(false)
                }}
              >
                zurücksetzen
              </button>
            )}
          </div>
          <Annotation n={1} hurdle="salescycle" align="right" className="ml-auto" />
        </div>
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-slate-500">Lieferantenprofil · Brenner Präzisionsteile GmbH</p>
          <h1 className="text-2xl font-semibold text-slate-900">Für Sie</h1>
        </div>
      </div>

      <div className="space-y-5">
        {/* Stage 1 */}
        <Card className="p-6">
          <StageHeader n={1} title="Ihr Profil arbeitet für Sie" icon={BellRing} />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="font-medium text-slate-800">Erinnerung vor Ablauf</div>
              <div className="mt-1 text-slate-500">
                {stats.nextExpiryDoc} läuft am {stats.nextExpiry} ab. Wir erinnern Sie 30 Tage vorher und leiten das neue Zertifikat auf
                Wunsch an alle freigegebenen Kunden weiter.
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <div className="font-medium text-slate-800">Profil</div>
              <div className="mt-1 text-slate-500">
                6 Dokumente gespeichert, {count} {count === 1 ? 'Kunde' : 'Kunden'} über Tacto. Jede neue Anfrage zu einem vorhandenen
                Dokument beantworten Sie mit einem Klick.
              </div>
            </div>
          </div>
        </Card>

        {count === 1 && (
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            <span className="flex-1">
              Bei nur einem Kunden zeigen wir keine Angebote, der Nutzen entsteht erst ab mehreren Kunden.
            </span>
            <Annotation
              n={2}
              hurdle="asymmetry"
              align="right"
              note="Value before sales: with a single customer the profile is pure service. Pushing an offer here would feel like the customer's portal is being used to sell."
            />
          </div>
        )}

        {/* Stage 2 */}
        {showStage2 ? (
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <StageHeader n={2} title="CBAM-Daten Ihrer eigenen Lieferanten" icon={Leaf} />
              <Annotation
                n={3}
                hurdle="salescycle"
                align="right"
                note="First offer is free and documents-only: the supplier becomes a buyer of the same workflow it already knows. Its own suppliers are often already in the Tacto network."
              />
            </div>

            {!subRequestsSent ? (
              <>
                <p className="text-slate-700">
                  Sie brauchen für Ihre Kunden CBAM-Daten Ihrer eigenen Lieferanten? Fordern Sie diese kostenlos über Tacto an.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Gleicher Ablauf wie bei Ihnen: Ihre Lieferanten erhalten einen persönlichen Link, ohne Login. Nur Dokumente, keine
                  Preise.
                </p>

                {!cbamFormOpen ? (
                  <Button className="mt-4" onClick={() => setCbamFormOpen(true)}>
                    CBAM-Daten anfordern
                  </Button>
                ) : (
                  <div className="mt-5 rounded-lg border border-slate-200">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700">
                      Lieferanten auswählen <span className="font-normal text-slate-400">(aus Ihren Bestellungen erkannt)</span>
                    </div>
                    <ul>
                      {ownSuppliers.map((s) => (
                        <li key={s.id} className="border-b border-slate-100 last:border-b-0">
                          <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-slate-50">
                            <input
                              type="checkbox"
                              checked={selected.includes(s.id)}
                              onChange={() => toggleSupplier(s.id)}
                              className="h-4 w-4 accent-[#0f4c5c]"
                            />
                            <span className="flex-1 font-medium text-slate-800">{s.name}</span>
                            <span className="w-48 text-slate-500">{s.material}</span>
                            <span className="w-8 text-xs text-slate-400">{s.country}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
                      <span className="text-xs text-slate-500">Angefordert: CBAM-Emissionsdaten Q3/2026 · Frist 30 Tage</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setCbamFormOpen(false)}>
                          Abbrechen
                        </Button>
                        <Button disabled={selected.length === 0} onClick={() => setSubRequestsSent(true)}>
                          <Send className="h-4 w-4" /> Anfrage senden ({selected.length})
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                {selected.length} Anfragen gesendet. Sie sehen den Rücklauf hier im Profil.
              </div>
            )}
          </Card>
        ) : (
          count > 1 && <LockedStage n={2} title="CBAM-Daten der eigenen Lieferanten" condition="ab 3 Kunden und erhaltene CBAM-Anfragen." />
        )}

        {/* Stage 3 */}
        {showStage3 ? (
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <StageHeader n={3} title="Tacto in 10 Minuten kennenlernen" icon={Play} />
              <Annotation
                n={4}
                hurdle="discretion"
                align="right"
                note="No customer is named and no referral is used. Self-serve video first, a call is optional. The supplier decides when to talk."
              />
            </div>

            {!introSent ? (
              <div className="grid grid-cols-[1.3fr_1fr] gap-6">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-accent-800 to-slate-800">
                  <div className="absolute left-4 top-4 text-sm font-medium text-white/80">
                    Wie Einkaufsteams in der Fertigung mit KI-Agenten arbeiten
                  </div>
                  <button className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-105">
                    <Play className="ml-1 h-7 w-7 text-accent-700" fill="currentColor" />
                  </button>
                  <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">10:00</span>
                </div>

                <form
                  className="space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIntroSent(true)
                  }}
                >
                  {[
                    { label: 'Name', value: 'Sabine Krause' },
                    { label: 'Rolle', value: 'Leitung Qualitätsmanagement' },
                    { label: 'Firma', value: 'Brenner Präzisionsteile GmbH' },
                  ].map((f) => (
                    <label key={f.label} className="block text-sm">
                      <span className="mb-1 block text-slate-600">{f.label}</span>
                      <input
                        defaultValue={f.value}
                        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"
                      />
                    </label>
                  ))}
                  <label className="block text-sm">
                    <span className="mb-1 block text-slate-600">Anzahl eigener Lieferanten</span>
                    <select
                      defaultValue="50 bis 200"
                      className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-accent-500"
                    >
                      <option>unter 50</option>
                      <option>50 bis 200</option>
                      <option>200 bis 500</option>
                      <option>über 500</option>
                    </select>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2 pt-1 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={callOpen}
                      onChange={(e) => setCallOpen(e.target.checked)}
                      className="h-4 w-4 accent-[#0f4c5c]"
                    />
                    Kurzes Gespräch mit einer Ansprechpartnerin vereinbaren (optional)
                  </label>

                  {callOpen && (
                    <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <UserRound className="h-3.5 w-3.5" /> 20 Minuten, per Video oder Telefon
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {callSlots.map((s) => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setSlot(s)}
                            className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-xs ${
                              slot === s ? 'border-accent-600 bg-accent-50 font-medium text-accent-700' : 'border-slate-300 bg-white text-slate-600'
                            }`}
                          >
                            <CalendarDays className="h-3.5 w-3.5" /> {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    {callOpen && slot ? 'Video ansehen und Termin anfragen' : 'Video ansehen'}
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                Danke, Frau Krause. Der Link zum Video ist unterwegs
                {callOpen && slot ? `, Ihr Terminwunsch: ${slot}.` : '.'}
                <button className="ml-auto cursor-pointer text-xs underline" onClick={() => setIntroSent(false)}>
                  zurücksetzen
                </button>
              </div>
            )}
          </Card>
        ) : (
          count > 1 && <LockedStage n={3} title="Tacto in 10 Minuten" condition="ab 5 Kunden oder nach gesendeten Teilanfragen." />
        )}
      </div>

      <StepNav prev="/4" next="/concept" nextLabel="Konzept-Übersicht" />
    </Page>
  )
}
