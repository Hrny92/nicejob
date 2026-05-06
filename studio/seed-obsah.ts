/**
 * Seed skript pro sekce "O nás" a "Proč my".
 * Nenahrazuje reference, klienty ani služby — ty jsou v seed.ts.
 *
 * Spuštění: SANITY_TOKEN=<token> npx tsx seed-obsah.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'd9mk2nno',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
})

const O_NAS = {
  _id:   'singleton-oNas',
  _type: 'oNas',
  nadpis1:          'Vznikli jsme z potřeby',
  nadpis2:          'dělat věci jinak.',
  perex:            'Spojujeme roky zkušeností s dravostí nové značky zaměřené čistě na lidi.',
  perexTucne:       'Nice Job není jen název, je to náš standard.',
  perexPo:          'Pomáháme firmám růst skrze ty správné lidi a nastavujeme novou laťku v HR praxi.',
  checklistPolozky: [
    'Lidský přístup ke každé zakázce',
    'Propojení dat, intuice a moderních nástrojů',
    'Rychlost a transparentnost bez kompromisů',
  ],
}

const PROC_MY = {
  _id:   'singleton-procMy',
  _type: 'procMy',
  nadpis1:   'Nejsme jen agentura.',
  nadpis2:   'Jsme váš partner.',
  podnadpis: 'Sázíme na data, intuici a moderní technologie.',
  statistiky: [
    { _key: 'stat1', hodnota: '200+',   popis: 'Obsazených pozic',    podpis: 'od vzniku agentury' },
    { _key: 'stat2', hodnota: '98%',    popis: 'Spokojenost klientů', podpis: 'dle interního průzkumu' },
    { _key: 'stat3', hodnota: '14 dní', popis: 'Průměrná doba',       podpis: 'obsazení role' },
  ],
  pilire: [
    {
      _key: 'pilar1',
      nadpis: 'Rychlost',
      popis:  'Pohybujeme se rychle. Bez zbytečné byrokracie. Obsadíme roli dříve, než ji obsadí konkurence.',
    },
    {
      _key: 'pilar2',
      nadpis: 'Transparentnost',
      popis:  'Vždy víte, kde stojíme. Pravidelný reporting, otevřená komunikace, žádné skryté poplatky.',
    },
    {
      _key: 'pilar3',
      nadpis: 'Lidskost',
      popis:  'Za každou pozicí vidíme skutečného člověka. Kandidáti i klienti jsou pro nás partneři, ne čísla.',
    },
  ],
}

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌  Chybí SANITY_TOKEN. Spusťte: SANITY_TOKEN=<token> npx tsx seed-obsah.ts')
    process.exit(1)
  }

  console.log('🌱  Ukládám sekci "O nás"...')
  await client.createOrReplace(O_NAS)
  console.log('   ✓  O nás')

  console.log('🌱  Ukládám sekci "Proč my"...')
  await client.createOrReplace(PROC_MY)
  console.log('   ✓  Proč my')

  console.log('✅  Hotovo! Nezapomeňte dokumenty v Sanity Studiu publishnout.')
}

seed().catch(console.error)
