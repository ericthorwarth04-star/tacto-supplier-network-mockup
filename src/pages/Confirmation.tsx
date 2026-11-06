import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellRing, Check, CloudUpload, ShieldCheck, UserCheck } from 'lucide-react'
import { requestingCustomer } from '../data/mock'
import { Button, Card, IconTile, Label, Page, SceneCaption, Tag } from '../components/ui'
import StepNav from '../components/StepNav'
import Annotation from '../components/Annotation'
import TactoShell from '../components/TactoShell'

export default function Confirmation() {
  const navigate = useNavigate()
  const [declined, setDeclined] = useState(false)

  return (
    <TactoShell mode="request" context={<Tag>Im Auftrag von {requestingCustomer.name}</Tag>}>
      <Page narrow>
        <SceneCaption step={3}>Die Pflichtaufgabe ist erledigt. Erst jetzt erscheint ein ruhiges, freiwilliges Angebot.</SceneCaption>

        <div className="flex items-start gap-5">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black">
            <Check className="h-5 w-5 text-white" strokeWidth={2} />
          </span>
          <div>
            <Label>Übermittelt · ISO 9001:2015</Label>
            <h1 className="mt-2 text-[32px] font-light leading-[1.15] tracking-[-0.02em]">
              Vielen Dank, Ihre Antwort ist bei Hoffmann Antriebstechnik eingegangen.
              <span className="block text-black/35">Sie können dieses Fenster jetzt schließen.</span>
            </h1>
          </div>
        </div>

        {!declined ? (
          <Card className="mt-10 overflow-visible">
            <div className="flex items-start justify-between gap-4 border-b border-black/[0.06] px-7 py-5">
              <div>
                <Tag>Optional · kostenlos</Tag>
                <h2 className="mt-3 text-[22px] font-light leading-snug tracking-[-0.01em]">
                  Nächstes Mal schneller: Dokument in Ihrem kostenlosen Lieferantenprofil speichern?
                </h2>
              </div>
              <Annotation n={1} hurdle="asymmetry" align="right" />
            </div>

            <ul className="grid grid-cols-3 divide-x divide-black/[0.06]">
              {[
                { icon: CloudUpload, title: 'Einmal hochladen', text: 'Ihr Zertifikat liegt sicher in Ihrem Profil.' },
                { icon: UserCheck, title: 'Selbst freigeben', text: 'Sie entscheiden für jeden Kunden, was er sieht.' },
                { icon: BellRing, title: 'Erinnerung vor Ablauf', text: 'Wir erinnern Sie rechtzeitig vor dem Ablaufdatum.' },
              ].map(({ icon, title, text }, i) => (
                <li key={title} className="px-7 py-6">
                  <div className="flex items-center justify-between">
                    <IconTile icon={icon} />
                    <span className="mono-label">0{i + 1}</span>
                  </div>
                  <div className="mt-4 text-[15px]">{title}</div>
                  <div className="mt-1 text-[13px] leading-relaxed text-black/50">{text}</div>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 border-t border-black/[0.06] bg-smoke/60 px-7 py-4 text-[13px]">
              <ShieldCheck className="h-4 w-4 shrink-0 text-sea" />
              <span className="flex-1">
                Ihre Kunden sehen nur, was Sie ihnen freigeben. <span className="text-black/50">Preise und Angebote werden nie gespeichert.</span>
              </span>
              <Annotation n={2} hurdle="confidentiality" align="right" />
            </div>

            <div className="flex items-center gap-3 border-t border-black/[0.06] px-7 py-5">
              <Button onClick={() => navigate('/4')}>Im Profil speichern</Button>
              <Button variant="ghost" onClick={() => setDeclined(true)}>
                Nein danke
              </Button>
              <span className="mono-label ml-auto">Kein Passwort nötig · Login per E-Mail-Link</span>
            </div>
          </Card>
        ) : (
          <Card className="mt-10 px-7 py-6">
            <p className="text-[14px] text-black/60">
              Alles klar. Wir fragen nicht noch einmal nach. Sie können das Profil jederzeit über den Link in der Bestätigungsmail anlegen.
            </p>
            <Button variant="secondary" className="mt-4" onClick={() => setDeclined(false)}>
              Doch speichern
            </Button>
          </Card>
        )}

        <StepNav prev="/2" next="/4" />
      </Page>
    </TactoShell>
  )
}
