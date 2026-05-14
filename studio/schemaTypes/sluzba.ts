import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sluzba',
  title: 'Služby',
  type: 'document',
  fields: [
    defineField({
      name: 'nazev',
      title: 'Název služby',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'popis',
      title: 'Krátký popis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'detaily',
      title: 'Detaily (odrážky pod popisem)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Max. 4–5 bodů. Zobrazí se pod popisem na desktopu.',
    }),
    defineField({
      name: 'foto',
      title: 'Fotografie / vizuál služby',
      type: 'image',
      description: 'Zobrazí se na stěně 3D kostky. Doporučený formát: čtvercový, min. 800×800 px.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'poradi',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve. Minimum 1, maximum dle potřeby.',
      initialValue: 99,
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  orderings: [
    { title: 'Pořadí', name: 'poradiAsc', by: [{ field: 'poradi', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'nazev', subtitle: 'ikona' },
    prepare({ title, subtitle }) {
      const EMOJI: Record<string, string> = {
        recruit: '🔍', audit: '📋', hunt: '🎯', culture: '👥',
        learn: '🎓', strategy: '💡', data: '📊', brand: '⭐',
        onboarding: '🤝', communication: '📣',
      }
      return { title, subtitle: EMOJI[subtitle] ?? subtitle }
    },
  },
})
