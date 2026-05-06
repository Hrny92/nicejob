import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'procMy',
  title: 'Proč my',
  type: 'document',
  fields: [
    defineField({
      name: 'nadpis1',
      title: 'Nadpis — 1. řádek (tučný)',
      type: 'string',
      description: 'Např. "Nejsme jen agentura."',
      validation: r => r.required(),
    }),
    defineField({
      name: 'nadpis2',
      title: 'Nadpis — 2. řádek (kurzíva, modrá)',
      type: 'string',
      description: 'Např. "Jsme váš partner."',
      validation: r => r.required(),
    }),
    defineField({
      name: 'podnadpis',
      title: 'Podnadpis pod nadpisem',
      type: 'string',
      description: 'Kratší věta pod nadpisem, šedá',
    }),
    defineField({
      name: 'statistiky',
      title: 'Statistiky (3 čísla)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'hodnota', title: 'Hodnota', type: 'string', description: 'Např. "200+" nebo "14 dní"' },
            { name: 'popis',   title: 'Popis',   type: 'string', description: 'Např. "Obsazených pozic"' },
            { name: 'podpis', title: 'Podpis (malý text pod)', type: 'string', description: 'Např. "od vzniku agentury"' },
          ],
          preview: {
            select: { title: 'hodnota', subtitle: 'popis' },
          },
        },
      ],
      validation: r => r.max(4),
    }),
    defineField({
      name: 'pilire',
      title: 'Pilíře (boxy pod statistikami)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'nadpis', title: 'Název pilíře', type: 'string', description: 'Např. "Rychlost"' },
            { name: 'popis',  title: 'Popis',  type: 'text', rows: 3, description: 'Krátký popis pilíře' },
          ],
          preview: {
            select: { title: 'nadpis', subtitle: 'popis' },
          },
        },
      ],
      description: 'Pořadí (01, 02, 03…) se doplní automaticky',
      validation: r => r.max(4),
    }),
  ],
  preview: {
    select: { title: 'nadpis1' },
    prepare: ({ title }) => ({ title: title ?? 'Proč my' }),
  },
})
