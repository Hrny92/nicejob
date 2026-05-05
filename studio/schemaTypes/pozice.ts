import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pozice',
  title: 'Pracovní pozice',
  type: 'document',
  fields: [
    defineField({
      name: 'nazev',
      title: 'Název pozice',
      type: 'string',
      validation: (Rule) => Rule.required().error('Název pozice je povinný'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL adresa)',
      type: 'slug',
      description: 'Automaticky vygenerováno z názvu. Používá se v URL, např. /pozice/senior-recruiter',
      options: {
        source: 'nazev',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug je povinný'),
    }),
    defineField({
      name: 'aktivni',
      title: 'Aktivní inzerát',
      type: 'boolean',
      description: 'Neaktivní inzeráty se nezobrazí na webu',
      initialValue: true,
    }),
    defineField({
      name: 'lokalita',
      title: 'Lokalita',
      type: 'string',
      description: 'Např. Praha, Brno, Remote, Celá ČR',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'typUvazku',
      title: 'Typ úvazku',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Plný úvazek', value: 'plny' },
          { title: 'Částečný úvazek', value: 'castecny' },
          { title: 'DPP', value: 'dpp' },
          { title: 'DPČ', value: 'dpc' },
          { title: 'Remote', value: 'remote' },
          { title: 'Hybridní', value: 'hybridni' },
        ],
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mzdaOd',
      title: 'Mzda od (Kč/měsíc)',
      type: 'number',
      description: 'Volitelné — spodní hranice mzdového rozmezí',
    }),
    defineField({
      name: 'mzdaDo',
      title: 'Mzda do (Kč/měsíc)',
      type: 'number',
      description: 'Volitelné — horní hranice mzdového rozmezí',
    }),
    defineField({
      name: 'perex',
      title: 'Krátký popis (perex)',
      type: 'text',
      rows: 3,
      description: 'Zobrazuje se v přehledu inzerátů — max. 200 znaků',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'popis',
      title: 'Popis pozice',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normální text', value: 'normal' },
            { title: 'Nadpis H2', value: 'h2' },
            { title: 'Nadpis H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Tučně', value: 'strong' },
              { title: 'Kurzíva', value: 'em' },
            ],
          },
        },
      ],
      description: 'Detailní popis pracovní pozice a náplně práce',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pozadavky',
      title: 'Požadavky na kandidáta',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Každý bod na nový řádek — přidejte pomocí Enter',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'benefity',
      title: 'Co nabízíme (benefity)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Výhody a benefity pozice',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'zverejneno',
      title: 'Datum zveřejnění',
      type: 'date',
      options: {
        dateFormat: 'DD. MM. YYYY',
      },
      initialValue: new Date().toISOString().split('T')[0],
    }),
  ],
  orderings: [
    {
      title: 'Datum zveřejnění (nejnovější)',
      name: 'zverejnenoDesc',
      by: [{ field: 'zverejneno', direction: 'desc' }],
    },
    {
      title: 'Název A–Z',
      name: 'nazevAsc',
      by: [{ field: 'nazev', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'nazev',
      subtitle: 'lokalita',
      aktivni: 'aktivni',
    },
    prepare({ title, subtitle, aktivni }) {
      return {
        title,
        subtitle: `${subtitle ?? ''}${aktivni === false ? ' · ⏸ Neaktivní' : ''}`,
      }
    },
  },
})
