import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, CalendarClock, CheckCircle2, FileCheck2, Loader2, Sparkles, Upload, X } from 'lucide-react'
import { request, requestingCustomer } from '../data/mock'
import { Button, Card, Page, SceneCaption } from '../components/ui'
import StepNav from '../components/StepNav'

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
    }, 1100)
  }

  const reset = () => {
    setState('idle')
    setValidFrom('')
    setValidTo('')
  }

  const canSubmit = decision !== 'upload' || (state === 'done' && validFrom && validTo)

  return (
    <Page narrow>
      <SceneCaption step={2}>Der persönliche Link öffnet die Anfrage direkt im Browser, ohne Login.</SceneCaption>

      <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
        <span>
          Anfrage von <span className="font-medium text-slate-600">{requestingCustomer.name}</span>
        </span>
        <span>
          bereitgestellt über <span className="font-semibold text-accent-700">tacto</span>
        </span>
      </div>

      <Card className="mb-6 p-6">
        <h1 className="text-xl font-semibold text-slate-900">Dokumentenanfrage</h1>
        <div className="mt-5 grid grid-cols-3 gap-4 text-sm">
          <div className="flex gap-3">
            <Building2 className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <div className="text-slate-500">Anfragender Kunde</div>
              <div className="font-medium text-slate-800">{requestingCustomer.name}</div>
              <div className="text-xs text-slate-500">{requestingCustomer.contact}</div>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarClock className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <div className="text-slate-500">Frist</div>
              <div className="font-medium text-slate-800">{request.deadline}</div>
              <div className="text-xs text-slate-500">noch 70 Tage</div>
            </div>
          </div>
          <div className="flex gap-3">
            <FileCheck2 className="mt-0.5 h-5 w-5 text-slate-400" />
            <div>
              <div className="text-slate-500">Bitte vorbereiten</div>
              <div className="font-medium text-slate-800">1 Dokument</div>
              <div className="text-xs text-slate-500">Zertifikat als PDF</div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{request.document}</h2>
            <p className="text-sm text-slate-500">Zertifikat Qualitätsmanagementsystem, aktuelle Fassung</p>
          </div>
          {decision !== 'upload' && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {decision === 'na' ? 'Als nicht zutreffend markiert' : 'Abgelehnt'}
            </span>
          )}
        </div>

        {decision === 'upload' && (
          <>
            <div className="mt-5">
              {state === 'idle' && (
                <button
                  onClick={simulateUpload}
                  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-10 text-sm text-slate-500 transition hover:border-accent-500 hover:bg-accent-50"
                >
                  <Upload className="mb-2 h-6 w-6 text-slate-400" />
                  <span className="font-medium text-slate-700">Datei hierher ziehen oder klicken</span>
                  <span className="text-xs">PDF, max. 20 MB</span>
                </button>
              )}
              {state === 'uploading' && (
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  <Loader2 className="h-5 w-5 animate-spin text-accent-600" />
                  <span>{request.uploadFileName} wird hochgeladen und ausgelesen ...</span>
                </div>
              )}
              {state === 'done' && (
                <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="flex-1 font-medium text-slate-800">{request.uploadFileName}</span>
                  <span className="text-xs text-slate-500">1,2 MB</span>
                  <button onClick={reset} className="cursor-pointer text-slate-400 hover:text-slate-600" aria-label="Datei entfernen">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                { label: 'Gültig ab', value: validFrom, set: setValidFrom },
                { label: 'Gültig bis', value: validTo, set: setValidTo },
              ].map((f) => (
                <label key={f.label} className="block text-sm">
                  <span className="mb-1 flex items-center gap-2 text-slate-600">
                    {f.label}
                    {state === 'done' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2 py-0.5 text-[11px] font-medium text-accent-700 ring-1 ring-accent-200">
                        <Sparkles className="h-3 w-3" /> von der KI ausgelesen
                      </span>
                    )}
                  </span>
                  <input
                    type="date"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 text-slate-800 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100 ${
                      state === 'done' ? 'border-accent-200 bg-accent-50/40' : 'border-slate-300'
                    }`}
                  />
                </label>
              ))}
            </div>
          </>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
          <Button variant="secondary" onClick={simulateUpload}>
            <Upload className="h-4 w-4" /> Hochladen
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
        {!canSubmit && <span className="text-sm text-slate-400">Bitte zuerst das Dokument hochladen.</span>}
        <Button onClick={() => navigate('/3')} disabled={!canSubmit} className="px-6">
          Absenden
        </Button>
      </div>

      <StepNav prev="/1" next="/3" />
    </Page>
  )
}
