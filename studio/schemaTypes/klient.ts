import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'klient',
  title: 'Klienti (lišta "Klienti, kteří nám věří")',
  type: 'document',
  fields: [
    defineField({
      name: 'nazev',
      title: 'Název firmy',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo (volitelné)',
      type: 'image',
      description: 'Pokud logo nevložíte, zobrazí se název firmy jako text',
      options: { hotspot: true },
    }),
    defineField({
      name: 'web',
      title: 'Web (volitelný odkaz)',
      type: 'url',
    }),
    defineField({
      name: 'poradi',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve v liště',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Pořadí',
      name: 'poradiAsc',
      by: [{ field: 'poradi', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nazev', media: 'logo' },
  },
})
