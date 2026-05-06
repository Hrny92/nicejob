import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'oNas',
  title: 'O nás',
  type: 'document',
  fields: [
    defineField({
      name: 'nadpis1',
      title: 'Nadpis — 1. řádek (tučný)',
      type: 'string',
      description: 'Např. "Vznikli jsme z potřeby"',
      validation: r => r.required(),
    }),
    defineField({
      name: 'nadpis2',
      title: 'Nadpis — 2. řádek (kurzíva, modrá)',
      type: 'string',
      description: 'Např. "dělat věci jinak."',
      validation: r => r.required(),
    }),
    defineField({
      name: 'perex',
      title: 'Hlavní text (první část)',
      type: 'text',
      rows: 3,
      description: 'Text před tučnou větou',
    }),
    defineField({
      name: 'perexTucne',
      title: 'Hlavní text — tučná část',
      type: 'string',
      description: 'Zobrazí se tučně uprostřed textu, např. "Nice Job není jen název, je to náš standard."',
    }),
    defineField({
      name: 'perexPo',
      title: 'Hlavní text (druhá část)',
      type: 'text',
      rows: 3,
      description: 'Text za tučnou větou',
    }),
    defineField({
      name: 'checklistPolozky',
      title: 'Checklist — body pod textem',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Zaškrtnuté body (doporučeno 3–5)',
      validation: r => r.max(6),
    }),
  ],
  preview: {
    select: { title: 'nadpis1' },
    prepare: ({ title }) => ({ title: title ?? 'O nás' }),
  },
})
