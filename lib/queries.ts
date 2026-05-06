import { client } from './sanity'

// Typ pro přehled pozic (bez plného popisu)
export type PozicePreview = {
  _id: string
  nazev: string
  slug: { current: string }
  lokalita: string
  typUvazku: string[]
  mzdaOd?: number
  mzdaDo?: number
  perex: string
  zverejneno: string
  aktivni: boolean
}

// Typ pro detail pozice
export type PoziceDetail = PozicePreview & {
  popis: unknown[]          // Portable Text blok
  pozadavky?: string[]
  benefity?: string[]
}

// Mapování hodnot typu úvazku na čitelné texty
export const TYP_UVAZKU: Record<string, string> = {
  plny: 'Plný úvazek',
  castecny: 'Částečný úvazek',
  dpp: 'DPP',
  dpc: 'DPČ',
  remote: 'Remote',
  hybridni: 'Hybridní',
}

// Formátování mzdového rozmezí
export function formatMzda(od?: number, do_?: number): string | null {
  if (!od && !do_) return null
  const fmt = (n: number) =>
    new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }).format(n)
  if (od && do_) return `${fmt(od)} – ${fmt(do_)}`
  if (od) return `od ${fmt(od)}`
  if (do_) return `do ${fmt(do_)}`
  return null
}

// ── GROQ dotazy ──────────────────────────────────────────────────────────

const POZICE_PREVIEW_FIELDS = `
  _id,
  nazev,
  slug,
  lokalita,
  typUvazku,
  mzdaOd,
  mzdaDo,
  perex,
  zverejneno,
  aktivni
`

// Poslední 3 aktivní pozice pro hlavní stránku
export async function getLatestPozice(): Promise<PozicePreview[]> {
  return client.fetch(
    `*[_type == "pozice" && aktivni == true] | order(zverejneno desc) [0...3] {
      ${POZICE_PREVIEW_FIELDS}
    }`
  )
}

// Všechny aktivní pozice pro stránku /pozice
export async function getAllPozice(): Promise<PozicePreview[]> {
  return client.fetch(
    `*[_type == "pozice" && aktivni == true] | order(zverejneno desc) {
      ${POZICE_PREVIEW_FIELDS}
    }`
  )
}

// Detail jedné pozice podle slugu
export async function getPoziceBySlug(slug: string): Promise<PoziceDetail | null> {
  return client.fetch(
    `*[_type == "pozice" && slug.current == $slug][0] {
      ${POZICE_PREVIEW_FIELDS},
      popis,
      pozadavky,
      benefity
    }`,
    { slug }
  )
}

// Slugy všech aktivních pozic (pro generateStaticParams)
export async function getAllPoziceSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(
    `*[_type == "pozice" && aktivni == true] { "slug": slug.current }`
  )
}

// ── Reference + klienti ───────────────────────────────────────────────────

export type ReferenceItem = {
  _id: string
  jmeno: string
  role: string
  inicialy: string
  citace: string
  barvaAvataru: string
  poradi: number
}

export type KlientItem = {
  _id: string
  nazev: string
  web?: string
  poradi: number
}

export async function getReference(): Promise<ReferenceItem[]> {
  return client.fetch(
    `*[_type == "recenze"] | order(poradi asc) {
      _id, jmeno, role, inicialy, citace, barvaAvataru, poradi
    }`
  )
}

export async function getKlienti(): Promise<KlientItem[]> {
  return client.fetch(
    `*[_type == "klient"] | order(poradi asc) {
      _id, nazev, web, poradi
    }`
  )
}

// ── Služby ───────────────────────────────────────────────────────────────

export type SluzbaItem = {
  _id: string
  nazev: string
  popis: string
  detaily?: string[]
  ikona: string
  poradi: number
}

export async function getSluzby(): Promise<SluzbaItem[]> {
  return client.fetch(
    `*[_type == "sluzba"] | order(poradi asc) {
      _id, nazev, popis, detaily, ikona, poradi
    }`
  )
}

// ── O nás ────────────────────────────────────────────────────────────────

export type ONasData = {
  nadpis1: string
  nadpis2: string
  perex?: string
  perexTucne?: string
  perexPo?: string
  checklistPolozky?: string[]
}

export async function getONas(): Promise<ONasData | null> {
  return client.fetch(
    `*[_type == "oNas" && _id == "singleton-oNas"][0] {
      nadpis1, nadpis2, perex, perexTucne, perexPo, checklistPolozky
    }`
  )
}

// ── Proč my ──────────────────────────────────────────────────────────────

export type StatItem = {
  _key: string
  hodnota: string
  popis: string
  podpis?: string
}

export type PilarItem = {
  _key: string
  nadpis: string
  popis: string
}

export type ProcMyData = {
  nadpis1: string
  nadpis2: string
  podnadpis?: string
  statistiky?: StatItem[]
  pilire?: PilarItem[]
}

export async function getProcMy(): Promise<ProcMyData | null> {
  return client.fetch(
    `*[_type == "procMy" && _id == "singleton-procMy"][0] {
      nadpis1, nadpis2, podnadpis, statistiky, pilire
    }`
  )
}
