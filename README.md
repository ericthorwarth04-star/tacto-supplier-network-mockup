# Tacto Supplier Network – Concept Mockup

Clickable mockup for a job interview case: turning the suppliers of Tacto's customers into a growth channel without damaging the customer–supplier relationship.

> Konzept-Mockup für ein Bewerbungsgespräch. Kein offizielles Tacto-Produkt. All companies and people are fictional.

**Live:** _LIVE_LINK_ (Railway)

## Concept in short

1. A Tacto customer requests a compliance document (ISO 9001, REACH, CBAM, LkSG) via a Tacto agent. The supplier opens a personal link, no login, and uploads.
2. After the upload, the supplier can opt in to save the document in a free supplier profile.
3. When another Tacto customer asks for the same document, the supplier releases it with one click and controls per customer who sees what.
4. Only after real usage (several customers, CBAM requests) do tiered offers appear: first "request CBAM data from your own suppliers" (free, documents only), then "Tacto in 10 minutes" with video and an optional intro call.

Guiding principles: no prices, negotiations or should-costs anywhere; no customer sees the supplier's other customers; value first, sales second.

## Screens

| Route | Screen |
| --- | --- |
| `/1` | Inbox: request mail from the customer |
| `/2` | Request form with simulated upload and AI-extracted dates |
| `/3` | Confirmation with opt-in profile offer |
| `/4` | Supplier profile: stats, documents, per-customer sharing matrix, one-click release |
| `/5` | Tiered offers with interview simulator (1 / 3 / 5 customers, CBAM yes / no) |
| `/concept` | One-page concept summary (English) |

Toggle **Show annotations** (top right) to show numbered markers explaining which case hurdle each element addresses.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build`, serve with `npm start` (uses `serve -s dist -l $PORT`).

## Stack

Vite, React, TypeScript, Tailwind CSS v4, React Router, lucide-react. No backend; all data lives in `src/data/mock.ts`.
