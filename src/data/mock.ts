// All companies and people are fictional.

export const supplier = {
  company: 'Brenner Präzisionsteile GmbH',
  contact: 'Sabine Krause',
  role: 'Qualitätsmanagement',
  email: 's.krause@brenner-praezision.example',
  initials: 'SK',
}

export type CustomerId = 'hoffmann' | 'weiland' | 'kessler'

export interface Customer {
  id: CustomerId
  name: string
  short: string
  contact: string
}

export const customers: Customer[] = [
  { id: 'hoffmann', name: 'Hoffmann Antriebstechnik GmbH', short: 'Hoffmann', contact: 'Markus Hoffmann, Einkauf' },
  { id: 'weiland', name: 'Weiland Fördertechnik AG', short: 'Weiland', contact: 'Julia Brandt, Supplier Quality' },
  { id: 'kessler', name: 'Kessler Pumpen GmbH', short: 'Kessler', contact: 'Thomas Reiter, Strategischer Einkauf' },
]

export const requestingCustomer = customers[0]

export const request = {
  subject: 'Erneuerung Ihres ISO-9001-Zertifikats bis 15.01.2027',
  deadline: '15.01.2027',
  sentAt: 'Fr., 06.11.2026, 09:12',
  document: 'ISO 9001:2015',
  uploadFileName: 'Brenner_ISO9001_Zertifikat_2026.pdf',
  extractedValidFrom: '2026-11-02',
  extractedValidTo: '2029-11-01',
}

export type DocStatus = 'valid' | 'expiring' | 'expired'

export interface SupplierDocument {
  id: string
  name: string
  category: string
  validTo: string
  status: DocStatus
  statusLabel: string
}

export const documents: SupplierDocument[] = [
  { id: 'iso9001', name: 'ISO 9001:2015', category: 'Qualität', validTo: '01.11.2029', status: 'valid', statusLabel: 'Gültig' },
  { id: 'iso14001', name: 'ISO 14001:2015', category: 'Umwelt', validTo: '16.12.2026', status: 'expiring', statusLabel: 'Läuft in 40 Tagen ab' },
  { id: 'reach', name: 'REACH-Erklärung', category: 'Compliance', validTo: '30.06.2027', status: 'valid', statusLabel: 'Gültig' },
  { id: 'rohs', name: 'RoHS-Erklärung', category: 'Compliance', validTo: '30.06.2027', status: 'valid', statusLabel: 'Gültig' },
  { id: 'cbam', name: 'CBAM-Emissionsdaten', category: 'Nachhaltigkeit', validTo: '30.09.2026', status: 'expired', statusLabel: 'Abgelaufen' },
  { id: 'lksg', name: 'LkSG-Selbstauskunft', category: 'Lieferkette', validTo: '31.03.2027', status: 'valid', statusLabel: 'Gültig' },
]

// Initial sharing matrix: document -> customer -> shared?
export const initialSharing: Record<string, Record<CustomerId, boolean>> = {
  iso9001: { hoffmann: true, weiland: true, kessler: false },
  iso14001: { hoffmann: true, weiland: false, kessler: false },
  reach: { hoffmann: true, weiland: true, kessler: true },
  rohs: { hoffmann: false, weiland: true, kessler: true },
  cbam: { hoffmann: true, weiland: false, kessler: false },
  lksg: { hoffmann: true, weiland: true, kessler: false },
}

export const stats = {
  requestsThisYear: 14,
  avgHandlingMinutes: 4,
  customersViaTacto: 3,
  nextExpiry: '16.12.2026',
  nextExpiryDoc: 'ISO 14001',
}

export const openRequest = {
  customerId: 'kessler' as CustomerId,
  document: 'ISO 9001:2015',
  receivedAt: 'heute, 08:47',
  deadline: '30.11.2026',
}

// The supplier's own (sub-)suppliers for the CBAM data request
export const ownSuppliers = [
  { id: 's1', name: 'Stahlhandel Ostbayern GmbH', material: 'Rundstahl 42CrMo4', country: 'DE' },
  { id: 's2', name: 'Gießerei Varga Kft.', material: 'Gussrohlinge EN-GJS', country: 'HU' },
  { id: 's3', name: 'Alu-Profile Lindner GmbH', material: 'Aluminiumprofile', country: 'AT' },
  { id: 's4', name: 'Metalurgia Nowak Sp. z o.o.', material: 'Schmiedeteile', country: 'PL' },
  { id: 's5', name: 'Schrauben Maier KG', material: 'Normteile', country: 'DE' },
]

export const callSlots = ['Di., 10.11., 10:00 Uhr', 'Mi., 11.11., 14:30 Uhr', 'Do., 12.11., 09:00 Uhr']

export const steps = [
  { path: '/1', label: 'Posteingang' },
  { path: '/2', label: 'Anfrage ausfüllen' },
  { path: '/3', label: 'Bestätigung' },
  { path: '/4', label: 'Lieferantenprofil' },
  { path: '/5', label: 'Gestaffelte Angebote' },
]

export type HurdleKey = 'asymmetry' | 'confidentiality' | 'discretion' | 'salescycle'

export const hurdles: Record<HurdleKey, { title: string; text: string }> = {
  asymmetry: {
    title: 'Asymmetry',
    text: 'The supplier gets its own value (reuse, reminders, less portal work), not only buyer pressure. The relationship becomes two-sided.',
  },
  confidentiality: {
    title: 'Confidentiality',
    text: 'Documents only. No prices, negotiations or should-costs are ever stored. Sharing is controlled per customer, per document.',
  },
  discretion: {
    title: 'Discretion',
    text: 'No referral needed from the customer. Peers are never named: no customer sees which other customers the supplier works with.',
  },
  salescycle: {
    title: 'Sales cycle',
    text: "Supplier data and the supplier's own suppliers are already in Tacto. Usage (number of customers, CBAM requests) signals readiness before any offer appears.",
  },
}
