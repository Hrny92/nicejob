import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hrPoradenstvi',
  title: 'HR poradenství — přehled služeb',
  type: 'document',
  fields: [
    defineField({
      name: 'polozky',
      title: 'Položky přehledu',
      type: 'array',
      description: 'Zobrazí se jako slider pod sekcí hlavních služeb.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'nazev',
              title: 'Název',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'popis',
              title: 'Popis',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: { select: { title: 'nazev', subtitle: 'popis' } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'HR poradenství — přehled služeb' }
    },
  },
})
