/**
 * Seed skript — vloží reference a klienty do Sanity.
 * Spustit: npx ts-node --esm seed.ts
 * nebo:    npx tsx seed.ts
 *
 * Potřebujete write token z manage.sanity.io → API → Tokens
 * Spuštění: SANITY_TOKEN=<váš-token> npx tsx seed.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'd9mk2nno',
  dataset:   'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_TOKEN,
  useCdn:    false,
})

const REFERENCES = [
  {
    jmeno:        'Veronika Ž.',
    role:         'HR Business Partner · NET4GAS',
    inicialy:     'VŽ',
    citace:       'Zdenku mohu s čistým svědomím doporučit. Je velmi pečlivá, upřímná a svoji práci dělá víc než dobře. Kandidáti pro ni nejsou čísla, ale každému se plně věnuje a chce, aby se během náboru cítil dobře. Zároveň se s ní moc dobře plánuji rozvojové aktivity a firemní akce. Je pořád samý nápad a její energie neskutečně dobijí.',
    barvaAvataru: '#1E71C9',
    poradi:       1,
  },
  {
    jmeno:        'Jana Kružlíková',
    role:         'Spolupracovnice',
    inicialy:     'JK',
    citace:       'Spolupráci se Zdeňkou mohu všem vřele doporučit. Má v oblasti náboru perfektní přehled a ráda zkouší různé cesty k dosažení cíle. Nikdy nezůstává stát na místě. K jejím velkým výhodám patří obdivuhodná trpělivost, loajalita a nekonečná chuť vzdělávat se. Každý den má úsměv na tváři a do kolektivu přináší pozitivní atmosféru. Víc takových lidí.',
    barvaAvataru: '#0B294A',
    poradi:       2,
  },
  {
    jmeno:        'Silvie Michalcová',
    role:         'HR Manager, HR Consultant, Coach',
    inicialy:     'SM',
    citace:       'Zdenku jsem poznala při výběru nových kolegů. Oslovilo mne její profesionální jednání. Je strukturovaná, její návrhy dávají smysl a můžu se spolehnout na dodržení termínů a dohod. Zdenka je v komunikaci velmi příjemná, naslouchá, zajímají ji potřeby klientů a dokáže se přizpůsobit situaci, která se rychle mění. Za spolupráci se Zdenkou jsem velmi ráda.',
    barvaAvataru: '#13467D',
    poradi:       3,
  },
  {
    jmeno:        'Jana Milfaitova',
    role:         'Sales & HR',
    inicialy:     'JM',
    citace:       'Se Zdenkou spolupracuji už řadu měsíců a vždy jsem nadšená z její energie, pozitivního přístupu a hlavně profesionality. K řešení problémů přistupuje velmi pragmaticky, v situaci se rychle zorientuje a návrhy k dalšímu postupu téměř sype z rukávu. Díky jejím organizačním schopnostem a pozitivnímu přístupu je spolupráce s ní nejen efektivní, ale i velmi příjemná.',
    barvaAvataru: '#1E71C9',
    poradi:       4,
  },
  {
    jmeno:        'Pavel Janouch',
    role:         'Codexis · dlouhodobý spolupracovník',
    inicialy:     'PJ',
    citace:       'Se Zdeňkou spolupracuji již 8 rokem a velmi si vážím její profesionality, spolehlivosti a lidského přístupu. Je vždy maximálně ochotná, vstřícná a dokáže udržovat jasnou, otevřenou a přátelskou komunikaci. Zdeňka má skvělý přehled nejen v recruitingu, ale i v marketingu a komunikaci přes sociální sítě. Mohu ji jednoznačně doporučit jako spolehlivého a férového partnera.',
    barvaAvataru: '#0B294A',
    poradi:       5,
  },
  {
    jmeno:        'Monika Bérešová',
    role:         'Social Media & Community Manager · Ideappeal',
    inicialy:     'MB',
    citace:       'Zdeňka má vždy vše pod kontrolou s nadhledem jí vlastním. Pečlivě organizuje všechny své úkoly i výzvy — i několik takových projektů najednou. Je charakterní a týmová hráčka. Rozhodně se s ní nebudete nudit při jakékoli kooperaci.',
    barvaAvataru: '#13467D',
    poradi:       6,
  },
  {
    jmeno:        'Kateřina Pokorná',
    role:         'e-Commerce Specialist · Vorwerk',
    inicialy:     'KP',
    citace:       'Zdeňka mě příjemně překvapila svou energičností, se kterou přistupuje k práci. Vím, že se na ni mohu spolehnout s dosažením cílů, které si spolu vytyčíme. Navíc má ode mě plusové body za příjemnou komunikaci.',
    barvaAvataru: '#1E71C9',
    poradi:       7,
  },
  {
    jmeno:        'Soňa Vančová',
    role:         'Talent Acquisition Specialist · Garrett',
    inicialy:     'SV',
    citace:       'Zdeňka pracuje na stejné pozici jako já a umí skvěle komunikovat, vede velmi příjemné a profesionální pohovory. Je radost s ní spolupracovat. Je zběhlá nejen v náborech, ale v oblasti HR obecně.',
    barvaAvataru: '#0B294A',
    poradi:       8,
  },
  {
    jmeno:        'Lubomír Brož',
    role:         'Spolupracovník',
    inicialy:     'LB',
    citace:       'Paní Kocandová je v oblasti personalistiky velmi aktivní a neustále se v ní vzdělává a pracuje na sobě. Snaží se přemýšlet i o nových směrech a nápadech v oblasti náboru, zejména obchodních zástupců.',
    barvaAvataru: '#13467D',
    poradi:       9,
  },
  {
    jmeno:        'Pavel Zamecnik',
    role:         'Spolupracovník',
    inicialy:     'PZ',
    citace:       'Zdeňka je výborná personalistka 👍 mohu jen doporučit.',
    barvaAvataru: '#1E71C9',
    poradi:       10,
  },
]

const KLIENTI = [
  { nazev: 'NET4GAS',    poradi: 1 },
  { nazev: 'Vorwerk',    poradi: 2 },
  { nazev: 'Garrett',    poradi: 3 },
  { nazev: 'Ideappeal',  poradi: 4 },
  { nazev: 'Codexis',    poradi: 5 },
  { nazev: 'Atlas Group',poradi: 6 },
]

async function seed() {
  if (!process.env.SANITY_TOKEN) {
    console.error('❌  Chybí SANITY_TOKEN. Spusťte: SANITY_TOKEN=<token> npx tsx seed.ts')
    process.exit(1)
  }

  console.log('🌱  Vkládám reference...')
  for (const r of REFERENCES) {
    await client.create({ _type: 'recenze', ...r })
    console.log(`   ✓  ${r.jmeno}`)
  }

  console.log('🌱  Vkládám klienty...')
  for (const k of KLIENTI) {
    await client.create({ _type: 'klient', ...k })
    console.log(`   ✓  ${k.nazev}`)
  }

  console.log('✅  Hotovo!')
}

seed().catch(console.error)
