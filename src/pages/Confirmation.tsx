import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellRing, CheckCircle2, CloudUpload, ShieldCheck, UserCheck } from 'lucide-react'
import { requestingCustomer } from '../data/mock'
import { Button, Card, Page, SceneCaption } from '../components/ui'
import StepNav from '../components/StepNav'
import Annotation from '../components/Annotation'

export default function Confirmation() {
  const navigate = useNavigate()
  const [declined, setDeclined] = useState(false)

  return (
    <Page narrow>
      <SceneCaption step={3}>Die Pflichtaufgabe ist erledigt. Erst jetzt erscheint ein ruhiges, freiwilliges Angebot.</SceneCaption>

      <Card className="p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h1 className="mt-4 text-2xl font-semibold text-slate-900">Vielen Dank, Ihre Antwort ist bei {requestingCustomer.short} Antriebstechnik eingegangen.</h1>
        <p className="mt-2 text-sm text-slate-500">
          ISO 9001:2015 wurde übermittelt. Sie erhalten eine Bestätigung per E-Mail. Sie können dieses Fenster jetzt schließen.
        </p>
      </Card>

      {!declined ? (
        <Card className="mt-6 border-accent-100 p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Optional</p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                Nächstes Mal schneller: Dokument in Ihrem kostenlosen Lieferantenprofil speichern?
              </h2>
            </div>
            <Annotation n={1} hurdle="asymmetry" align="right" />
          </div>

          <ul className="mt-5 grid grid-cols-3 gap-4">
            {[
              { icon: CloudUpload, title: 'Einmal hochladen', text: 'Ihr Zertifikat liegt sicher in Ihrem Profil.' },
              { icon: UserCheck, title: 'Selbst freigeben', text: 'Sie entscheiden für jeden Kunden, was er sieht.' },
              { icon: BellRing, title: 'Erinnerung vor Ablauf', text: 'Wir erinnern Sie rechtzeitig vor dem Ablaufdatum.' },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-lg bg-slate-50 p-4">
                <Icon className="h-5 w-5 text-accent-600" />
                <div className="mt-2 text-sm font-medium text-slate-800">{title}</div>
                <div className="mt-1 text-sm text-slate-500">{text}</div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-600">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
            <span className="flex-1">
              <strong className="font-medium text-slate-800">Ihre Kunden sehen nur, was Sie ihnen freigeben.</strong> Preise und
              Angebote werden nie gespeichert.
            </span>
            <Annotation n={2} hurdle="confidentiality" align="right" />
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate('/4')}>Im Profil speichern</Button>
            <Button variant="ghost" onClick={() => setDeclined(true)}>
              Nein danke
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-400">Kein Passwort nötig. Sie melden sich später einfach über einen Link per E-Mail an.</p>
        </Card>
      ) : (
        <Card className="mt-6 p-6 text-sm text-slate-600">
          Alles klar. Wir fragen nicht noch einmal nach. Sie können das Profil jederzeit über den Link in der Bestätigungsmail
          anlegen.
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setDeclined(false)}>
              Doch speichern
            </Button>
          </div>
        </Card>
      )}

      <StepNav prev="/2" next="/4" />
    </Page>
  )
}
