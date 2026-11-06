import { useState, type ReactNode } from 'react'
import { BellRing, CalendarDays, Check, Info, Leaf, Lock, Play, Send, UserRound, type LucideIcon } from 'lucide-react'
import { callSlots, ownSuppliers, stats } from '../data/mock'
import { Button, Card, IconTile, Label, Page, SceneCaption, Segmented } from '../components/ui'
import StepNav from '../components/StepNav'
import Annotation from '../components/Annotation'
import TactoShell from '../components/TactoShell'

type CustomerCount = 1 | 3 | 5

function StageHeader({ n, title, icon, aside }: { n: number; title: string; icon: LucideIcon; aside?: ReactNode }) {
  return (
    <div className="flex items-center gap-3 border-b border-black/[0.06] px-6 py-4">
      <IconTile icon={icon} />
      <div className="flex-1">
        <Label>Stufe 0{n}</Label>
        <div className="text-[16px]">{title}</div>
      </div>
      {aside}
    </div>
  )
}

function LockedStage({ n, title, condition }: { n: number; title: string; condition: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[10px] border border-dashed border-black/15 px-6 py-4">
      <Lock className="h-4 w-4 text-black/30" />
      <span className="mono-label">Stufe 0{n}</span>
      <span className="text-[14px] text-black/40">
        <span className="text-black/60">{title}</span> wird noch nicht angezeigt. Bedingung: {condition}
      </span>
    </div>
  )
}

const inputCls = 'w-full rounded-[6px] border border-black/15 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-black'

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

  const toggleSupplier = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <TactoShell mode="portal" activeTab="Für Sie">
      <Page>
        <SceneCaption step={5}>Erst wenn der Nutzen erlebt wurde, erscheinen gestaffelte Angebote im Profil.</SceneCaption>

        {/* Interview simulator: presentation control, deliberately dark */}
        <div className="mb-10 rounded-[10px] bg-black px-6 py-5 text-white">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.05em] text-white/50">
              Interview simulator · not part of the product UI
            </span>
            <Annotation n={1} hurdle="salescycle" align="right" />
          </div>
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-white/70">Anzahl Tacto-Kunden</span>
              <Segmented<CustomerCount>
                dark
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
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-white/70">CBAM-Anfragen erhalten</span>
              <Segmented<'ja' | 'nein'>
                dark
                value={cbam ? 'ja' : 'nein'}
                onChange={(v) => setCbam(v === 'ja')}
                options={[
                  { value: 'ja', label: 'ja' },
                  { value: 'nein', label: 'nein' },
                ]}
              />
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.04em] text-white/70">
              <span>Teilanfragen gesendet:</span>
              <span className={subRequestsSent ? 'text-orange' : 'text-white/40'}>{subRequestsSent ? 'ja' : 'nein'}</span>
              {subRequestsSent && (
                <button
                  className="ml-1 cursor-pointer text-white/40 underline hover:text-white"
                  onClick={() => {
                    setSubRequestsSent(false)
                    setCbamFormOpen(false)
                  }}
                >
                  zurücksetzen
                </button>
              )}
            </div>
          </div>
        </div>

        <Label>Lieferantenprofil · Brenner Präzisionsteile GmbH</Label>
        <h1 className="mb-8 mt-2 text-[34px] font-light leading-tight tracking-[-0.02em]">
          Für Sie
          <span className="block text-black/35">Angebote erscheinen erst, wenn sie Ihnen wirklich nützen.</span>
        </h1>

        <div className="space-y-4">
          {/* Stage 1 */}
          <Card>
            <StageHeader n={1} title="Ihr Profil arbeitet für Sie" icon={BellRing} />
            <div className="grid grid-cols-2 divide-x divide-black/[0.06]">
              <div className="px-6 py-5">
                <Label>Erinnerung vor Ablauf</Label>
                <p className="mt-2 text-[14px] leading-relaxed text-black/65">
                  {stats.nextExpiryDoc} läuft am {stats.nextExpiry} ab. Wir erinnern Sie 30 Tage vorher und leiten das neue Zertifikat auf
                  Wunsch an alle freigegebenen Kunden weiter.
                </p>
              </div>
              <div className="px-6 py-5">
                <Label>Profil</Label>
                <p className="mt-2 text-[14px] leading-relaxed text-black/65">
                  6 Dokumente gespeichert, {count} {count === 1 ? 'Kunde' : 'Kunden'} über Tacto. Jede neue Anfrage zu einem vorhandenen
                  Dokument beantworten Sie mit einem Klick.
                </p>
              </div>
            </div>
          </Card>

          {count === 1 && (
            <div className="flex items-start gap-3 rounded-[10px] border border-black/[0.08] bg-white/60 px-6 py-4 text-[14px] text-black/55">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-black/35" />
              <span className="flex-1">Bei nur einem Kunden zeigen wir keine Angebote, der Nutzen entsteht erst ab mehreren Kunden.</span>
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
            <Card>
              <StageHeader
                n={2}
                title="CBAM-Daten Ihrer eigenen Lieferanten"
                icon={Leaf}
                aside={
                  <Annotation
                    n={3}
                    hurdle="salescycle"
                    align="right"
                    note="First offer is free and documents-only: the supplier becomes a buyer of the same workflow it already knows. Its own suppliers are often already in the Tacto network."
                  />
                }
              />
              <div className="px-6 py-5">
                {!subRequestsSent ? (
                  <>
                    <p className="text-[18px] font-light leading-snug tracking-[-0.01em]">
                      Sie brauchen für Ihre Kunden CBAM-Daten Ihrer eigenen Lieferanten? Fordern Sie diese kostenlos über Tacto an.
                    </p>
                    <p className="mt-1.5 text-[13px] text-black/50">
                      Gleicher Ablauf wie bei Ihnen: Ihre Lieferanten erhalten einen persönlichen Link, ohne Login. Nur Dokumente, keine
                      Preise.
                    </p>

                    {!cbamFormOpen ? (
                      <Button className="mt-5" onClick={() => setCbamFormOpen(true)}>
                        CBAM-Daten anfordern
                      </Button>
                    ) : (
                      <div className="mt-5 overflow-hidden rounded-[8px] border border-black/[0.1]">
                        <div className="flex items-center justify-between bg-smoke px-4 py-2.5">
                          <Label>Lieferanten auswählen</Label>
                          <span className="mono-label">aus Ihren Bestellungen erkannt</span>
                        </div>
                        <ul>
                          {ownSuppliers.map((s) => (
                            <li key={s.id} className="border-t border-black/[0.06]">
                              <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-[14px] hover:bg-smoke/60">
                                <input
                                  type="checkbox"
                                  checked={selected.includes(s.id)}
                                  onChange={() => toggleSupplier(s.id)}
                                  className="h-4 w-4 accent-black"
                                />
                                <span className="flex-1">{s.name}</span>
                                <span className="w-48 text-[13px] text-black/50">{s.material}</span>
                                <span className="mono-label w-8">{s.country}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-3">
                          <span className="mono-label">CBAM-Emissionsdaten Q3/2026 · Frist 30 Tage</span>
                          <div className="flex gap-2">
                            <Button variant="ghost" onClick={() => setCbamFormOpen(false)}>
                              Abbrechen
                            </Button>
                            <Button disabled={selected.length === 0} onClick={() => setSubRequestsSent(true)}>
                              <Send className="h-3.5 w-3.5" /> Anfrage senden ({selected.length})
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[14px] text-[#13898b]">
                    <Check className="h-4 w-4" />
                    {selected.length} Anfragen gesendet. Sie sehen den Rücklauf hier im Profil.
                  </div>
                )}
              </div>
            </Card>
          ) : (
            count > 1 && <LockedStage n={2} title="CBAM-Daten der eigenen Lieferanten" condition="ab 3 Kunden und erhaltene CBAM-Anfragen." />
          )}

          {/* Stage 3 */}
          {showStage3 ? (
            <Card>
              <StageHeader
                n={3}
                title="Tacto in 10 Minuten kennenlernen"
                icon={Play}
                aside={
                  <Annotation
                    n={4}
                    hurdle="discretion"
                    align="right"
                    note="No customer is named and no referral is used. Self-serve video first, a call is optional. The supplier decides when to talk."
                  />
                }
              />
              {!introSent ? (
                <div className="grid grid-cols-[1.3fr_1fr] gap-6 p-6">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[8px] bg-black">
                    <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_100%,rgba(255,100,20,0.35),transparent_60%),radial-gradient(50%_70%_at_90%_10%,rgba(33,112,236,0.35),transparent_60%)]" />
                    <div className="absolute left-5 top-5 max-w-[70%]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-white/50">Produktvideo</span>
                      <div className="mt-1 text-[18px] font-light leading-snug text-white">
                        Wie Einkaufsteams in der Fertigung mit KI-Agenten arbeiten
                      </div>
                    </div>
                    <button className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white transition hover:scale-105">
                      <Play className="ml-0.5 h-5 w-5 text-black" fill="currentColor" />
                    </button>
                    <span className="absolute bottom-3 right-3 rounded-[3px] bg-white/10 px-2 py-0.5 font-mono text-[11px] text-white">10:00</span>
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
                      <label key={f.label} className="block">
                        <span className="mono-label mb-1.5 block">{f.label}</span>
                        <input defaultValue={f.value} className={inputCls} />
                      </label>
                    ))}
                    <label className="block">
                      <span className="mono-label mb-1.5 block">Anzahl eigener Lieferanten</span>
                      <select defaultValue="50 bis 200" className={inputCls}>
                        <option>unter 50</option>
                        <option>50 bis 200</option>
                        <option>200 bis 500</option>
                        <option>über 500</option>
                      </select>
                    </label>

                    <label className="flex cursor-pointer items-center gap-2 pt-1 text-[13px]">
                      <input
                        type="checkbox"
                        checked={callOpen}
                        onChange={(e) => setCallOpen(e.target.checked)}
                        className="h-4 w-4 accent-black"
                      />
                      Kurzes Gespräch mit einer Ansprechpartnerin vereinbaren (optional)
                    </label>

                    {callOpen && (
                      <div className="space-y-2 rounded-[8px] bg-smoke p-3">
                        <div className="mono-label flex items-center gap-2">
                          <UserRound className="h-3.5 w-3.5" /> 20 Minuten · Video oder Telefon
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {callSlots.map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setSlot(s)}
                              className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-[6px] border px-2 py-2 text-[12px] ${
                                slot === s ? 'border-orange bg-orange-soft text-black' : 'border-black/15 bg-white text-black/60'
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
                <div className="flex items-center gap-2 px-6 py-5 text-[14px] text-[#13898b]">
                  <Check className="h-4 w-4" />
                  Danke, Frau Krause. Der Link zum Video ist unterwegs
                  {callOpen && slot ? `, Ihr Terminwunsch: ${slot}.` : '.'}
                  <button className="mono-label ml-auto cursor-pointer underline" onClick={() => setIntroSent(false)}>
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
    </TactoShell>
  )
}
