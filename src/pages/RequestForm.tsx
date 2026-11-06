import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, CalendarClock, Check, FileCheck2, FileText, Upload, X } from 'lucide-react'
import { request, requestingCustomer } from '../data/mock'
import { AgentOrb, Button, Card, IconTile, Label, Page, SceneCaption, Tag } from '../components/ui'
import StepNav from '../components/StepNav'
import TactoShell from '../components/TactoShell'

type UploadState = 'idle' | 'uploading' | 'done'
type Decision = 'upload' | 'na' | 'decline'

export default function RequestForm() {
  const navigate = useNavigate()
  const [state, setState] = useState<UploadState>('idle')
  const [decision, setDecision] = useState<Decision>('upload')
  const [validFrom, setValidFrom] = useState('')
  const [validTo, setValidTo] = useState('')

  const simulateUpload = () => {
    setDecision('upload')
    setState('uploading')
    setTimeout(() => {
      setState('done')
      setValidFrom(request.extractedValidFrom)
      setValidTo(request.extractedValidTo)
    }, 1400)
  }

  const reset = () => {
    setState('idle')
    setValidFrom('')
    setValidTo('')
  }

  const canSubmit = decision !== 'upload' || (state === 'done' && validFrom && validTo)

  return (
    <TactoShell mode="request" context={<Tag>Im Auftrag von {requestingCustomer.name}</Tag>}>
      <Page narrow>
        <SceneCaption step={2}>Der persönliche Link öffnet die Anfrage direkt im Browser, ohne Login.</SceneCaption>

        <Label>Dokumentenanfrage</Label>
        <h1 className="mt-3 text-[34px] font-light leading-[1.15] tracking-[-0.02em]">
          Hoffmann Antriebstechnik bittet um Ihr aktuelles ISO-9001-Zertifikat.
          <span className="block text-black/35">Kein Login nötig. Dauer: ca. 3 Minuten.</span>
        </h1>

        <Card className="mt-8 grid grid-cols-3 divide-x divide-black/[0.06]">
          {[
            { icon: Building2, label: 'Anfragender Kunde', value: requestingCustomer.name, sub: requestingCustomer.contact },
            { icon: CalendarClock, label: 'Frist', value: request.deadline, sub: 'noch 70 Tage' },
            { icon: FileCheck2, label: 'Bitte vorbereiten', value: '1 Dokument', sub: 'Zertifikat als PDF' },
          ].map(({ icon, label, value, sub }) => (
            <div key={label} className="flex gap-3 p-5">
              <IconTile icon={icon} />
              <div className="min-w-0">
                <Label>{label}</Label>
                <div className="mt-1 text-[14px] leading-snug">{value}</div>
                <div className="text-[12px] text-black/45">{sub}</div>
              </div>
            </div>
          ))}
        </Card>

        <Card className="mt-5">
          <div className="flex items-center gap-3 border-b border-black/[0.06] px-6 py-4">
            <IconTile icon={FileText} />
            <div className="flex-1">
              <Label>Dokument 1 von 1</Label>
              <div className="text-[16px]">{request.document}</div>
            </div>
            {decision !== 'upload' && <Tag>{decision === 'na' ? 'Nicht zutreffend' : 'Abgelehnt'}</Tag>}
            {decision === 'upload' && state === 'done' && (
              <Tag tone="sea">
                <Check className="h-3 w-3" /> Bereit
              </Tag>
            )}
          </div>

          <div className="px-6 py-5">
            {decision === 'upload' && (
              <>
                {state === 'idle' && (
                  <button
                    onClick={simulateUpload}
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-black/20 bg-smoke py-10 transition hover:border-black/50"
                  >
                    <Upload className="mb-3 h-5 w-5 text-black/50" strokeWidth={1.5} />
                    <span className="text-[14px]">Datei hierher ziehen oder klicken</span>
                    <span className="mono-label mt-1">PDF · max. 20 MB</span>
                  </button>
                )}
                {state === 'uploading' && (
                  <div className="flex items-center gap-3 rounded-[8px] border border-black/[0.08] bg-smoke px-4 py-4">
                    <AgentOrb size={28} />
                    <div className="flex-1">
                      <Label>Tacto-Agent</Label>
                      <div className="text-[14px]">Liest {request.uploadFileName} aus ...</div>
                    </div>
                    <span className="h-1 w-24 overflow-hidden rounded-full bg-stone">
                      <span className="block h-full w-1/2 animate-pulse rounded-full bg-blue" />
                    </span>
                  </div>
                )}
                {state === 'done' && (
                  <div className="flex items-center gap-3 rounded-[8px] border border-black/[0.08] px-4 py-3">
                    <FileText className="h-4 w-4 text-black/50" />
                    <span className="flex-1 text-[14px]">{request.uploadFileName}</span>
                    <span className="mono-label">1,2 MB</span>
                    <button onClick={reset} className="cursor-pointer text-black/40 hover:text-black" aria-label="Datei entfernen">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Gültig ab', value: validFrom, set: setValidFrom },
                    { label: 'Gültig bis', value: validTo, set: setValidTo },
                  ].map((f) => (
                    <label key={f.label} className="block">
                      <span className="mb-1.5 flex items-center gap-2">
                        <span className="mono-label">{f.label}</span>
                        {state === 'done' && (
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.04em] text-blue">
                            <AgentOrb size={10} /> von der KI ausgelesen
                          </span>
                        )}
                      </span>
                      <input
                        type="date"
                        value={f.value}
                        onChange={(e) => f.set(e.target.value)}
                        className={`w-full rounded-[6px] border px-3 py-2.5 text-[14px] outline-none focus:border-black ${
                          state === 'done' ? 'border-blue/30 bg-[#f3f7fe]' : 'border-black/15 bg-white'
                        }`}
                      />
                    </label>
                  ))}
                </div>
              </>
            )}
            {decision !== 'upload' && (
              <p className="text-[14px] text-black/55">
                {decision === 'na'
                  ? 'Sie teilen Hoffmann Antriebstechnik mit, dass dieses Dokument für Ihr Unternehmen nicht zutrifft.'
                  : 'Sie lehnen die Anfrage ab. Hoffmann Antriebstechnik wird darüber informiert.'}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 border-t border-black/[0.06] px-6 py-4">
            <Button variant="secondary" onClick={simulateUpload}>
              <Upload className="h-3.5 w-3.5" /> Hochladen
            </Button>
            <Button
              variant={decision === 'na' ? 'primary' : 'secondary'}
              onClick={() => {
                setDecision('na')
                reset()
              }}
            >
              Nicht zutreffend
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setDecision('decline')
                reset()
              }}
            >
              Ablehnen
            </Button>
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-end gap-4">
          {!canSubmit && <span className="mono-label">Bitte zuerst das Dokument hochladen</span>}
          <Button onClick={() => navigate('/3')} disabled={!canSubmit} className="px-6">
            Absenden
          </Button>
        </div>

        <StepNav prev="/1" next="/3" />
      </Page>
    </TactoShell>
  )
}
