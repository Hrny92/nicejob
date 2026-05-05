import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'recenze',
  title: 'Reference',
  type: 'document',
  fields: [
    defineField({
      name: 'jmeno',
      title: 'Jméno',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Pozice / Firma',
      type: 'string',
      description: 'Např. "HR Manager · NET4GAS"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inicialy',
      title: 'Iniciály (2 znaky)',
      type: 'string',
      description: 'Zobrazí se v avataru, např. "VŽ"',
      validation: (Rule) => Rule.required().max(3),
    }),
    defineField({
      name: 'citace',
      title: 'Text reference',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'barvaAvataru',
      title: 'Barva avataru',
      type: 'string',
      options: {
        list: [
          { title: 'Modrá tmavá', value: '#0B294A' },
          { title: 'Modrá střední', value: '#13467D' },
          { title: 'Modrá světlá', value: '#1E71C9' },
        ],
        layout: 'radio',
      },
      initialValue: '#1E71C9',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poradi',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve',
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
    select: { title: 'jmeno', subtitle: 'role' },
  },
})
