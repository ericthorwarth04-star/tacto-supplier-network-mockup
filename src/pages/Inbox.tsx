import { useNavigate } from 'react-router-dom'
import { Archive, Inbox as InboxIcon, Lock, Mail, Reply, Search, Send, Star, Trash2, FileEdit } from 'lucide-react'
import { request, requestingCustomer, supplier } from '../data/mock'
import { Page, SceneCaption } from '../components/ui'
import StepNav from '../components/StepNav'
import Annotation from '../components/Annotation'

const otherMails = [
  { from: 'Spedition Haas', subject: 'Avis: Abholung KW 46', time: '08:41', preview: 'Guten Morgen, die Abholung ist für Dienstag...' },
  { from: 'Intern: Produktion', subject: 'Erstmusterprüfbericht Los 2207', time: 'Do.', preview: 'Anbei der EMPB für die Gehäusedeckel...' },
  { from: 'Messtechnik Service', subject: 'Kalibrierung Koordinatenmessgerät', time: 'Do.', preview: 'Ihr Termin zur jährlichen Kalibrierung...' },
  { from: 'Intern: Geschäftsführung', subject: 'Audit-Planung 2027', time: 'Mi.', preview: 'Liebe Kolleginnen und Kollegen, wie besprochen...' },
]

export default function Inbox() {
  const navigate = useNavigate()

  return (
    <Page>
      <SceneCaption step={1}>Sabine Krause, Qualitätsmanagement bei {supplier.company}, öffnet ihr Postfach.</SceneCaption>

      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-lg">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
          </div>
          <div className="mx-auto flex w-96 items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-slate-400">
            <Search className="h-3.5 w-3.5" /> Suchen
          </div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600 text-[11px] font-semibold text-white">
            {supplier.initials}
          </span>
        </div>

        <div className="grid min-h-[560px] grid-cols-[200px_320px_1fr]">
          {/* Folders */}
          <aside className="border-r border-slate-200 bg-slate-50 p-3 text-sm">
            <button className="mb-4 flex w-full items-center gap-2 rounded-md bg-slate-700 px-3 py-2 text-white">
              <FileEdit className="h-4 w-4" /> Neue E-Mail
            </button>
            {[
              { icon: InboxIcon, label: 'Posteingang', count: 3, active: true },
              { icon: Send, label: 'Gesendet' },
              { icon: Star, label: 'Markiert' },
              { icon: Archive, label: 'Archiv' },
              { icon: Trash2, label: 'Papierkorb' },
            ].map(({ icon: Icon, label, count, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 ${active ? 'bg-slate-200 font-medium text-slate-800' : 'text-slate-600'}`}
              >
                <Icon className="h-4 w-4" /> <span className="flex-1">{label}</span>
                {count && <span className="text-xs font-semibold text-slate-700">{count}</span>}
              </div>
            ))}
          </aside>

          {/* Message list */}
          <div className="border-r border-slate-200">
            <div className="border-b border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">Posteingang</div>
            <div className="border-l-4 border-l-slate-700 bg-slate-100 px-4 py-3">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-900">{requestingCustomer.name}</span>
                <span className="text-xs text-slate-500">09:12</span>
              </div>
              <div className="truncate text-sm font-medium text-slate-800">{request.subject}</div>
              <div className="truncate text-xs text-slate-500">Sehr geehrte Frau Krause, Ihr ISO-9001-Zertifikat...</div>
            </div>
            {otherMails.map((m) => (
              <div key={m.subject} className="border-b border-slate-100 px-4 py-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">{m.from}</span>
                  <span className="text-xs text-slate-400">{m.time}</span>
                </div>
                <div className="truncate text-sm text-slate-600">{m.subject}</div>
                <div className="truncate text-xs text-slate-400">{m.preview}</div>
              </div>
            ))}
          </div>

          {/* Reading pane */}
          <article className="p-8">
            <h1 className="text-xl font-semibold text-slate-900">{request.subject}</h1>
            <div className="mt-4 flex items-center gap-3 border-b border-slate-200 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                HA
              </span>
              <div className="flex-1 text-sm">
                <div className="font-medium text-slate-800">
                  {requestingCustomer.name} <span className="font-normal text-slate-500">&lt;lieferanten@hoffmann-antrieb.example&gt;</span>
                </div>
                <div className="text-slate-500">An: {supplier.email}</div>
              </div>
              <span className="text-xs text-slate-500">{request.sentAt}</span>
              <Reply className="h-4 w-4 text-slate-400" />
            </div>

            <div className="max-w-xl space-y-4 pt-6 text-[15px] leading-relaxed text-slate-700">
              <p>Sehr geehrte Frau Krause,</p>
              <p>
                Ihr ISO-9001-Zertifikat in unserer Lieferantenakte läuft in Kürze ab. Damit wir Brenner Präzisionsteile weiterhin
                als freigegebenen Lieferanten führen können, bitten wir Sie, uns das erneuerte Zertifikat bis zum{' '}
                <strong>{request.deadline}</strong> zukommen zu lassen.
              </p>
              <p>Über den folgenden Link können Sie das Dokument direkt hochladen. Das dauert in der Regel nur wenige Minuten.</p>

              <div className="relative py-2">
                <button
                  onClick={() => navigate('/2')}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-accent-700 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent-800"
                >
                  <Mail className="h-4 w-4" /> Anfrage ausfüllen
                </button>
              </div>

              <p>
                Vielen Dank für die gute Zusammenarbeit.
                <br />
                Mit freundlichen Grüßen
                <br />
                Markus Hoffmann
                <br />
                <span className="text-slate-500">Einkauf, {requestingCustomer.name}</span>
              </p>

              <div className="mt-8 flex items-start gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="flex-1">
                  Gesendet über <span className="font-semibold text-accent-700">tacto</span> im Auftrag von Hoffmann
                  Antriebstechnik. Kein Login nötig, der Link gilt nur für Ihre E-Mail-Adresse.
                </span>
                <Annotation
                  n={1}
                  hurdle="discretion"
                  align="right"
                  note="The request comes from the customer, Tacto is only the sender-on-behalf. No referral and no sales message in this mail: the first touchpoint is the customer's own task."
                />
              </div>
            </div>
          </article>
        </div>
      </div>

      <StepNav next="/2" />
    </Page>
  )
}
