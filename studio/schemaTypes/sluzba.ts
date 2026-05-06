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
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'detaily',
      title: 'Detaily (odrážky pod popisem)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Max. 4–5 bodů. Zobrazí se pod popisem na desktopu.',
    }),
    defineField({
      name: 'ikona',
      title: 'Ikona v zaměřovači',
      type: 'string',
      options: {
        list: [
          { title: '🔍  Nábor / hledání lidí',       value: 'recruit'       },
          { title: '📋  Audit / hodnocení procesů',   value: 'audit'         },
          { title: '🎯  Headhunting / přímé oslovení', value: 'hunt'         },
          { title: '👥  Firemní kultura / tým',        value: 'culture'      },
          { title: '🎓  Vzdělávání / rozvoj',          value: 'learn'        },
          { title: '💡  Strategie / poradenství',      value: 'strategy'     },
          { title: '📊  Data / analytika',             value: 'data'         },
          { title: '⭐  Employer branding',            value: 'brand'        },
          { title: '🤝  Onboarding / nástup',         value: 'onboarding'   },
          { title: '📣  Komunikace / marketing',       value: 'communication'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poradi',
      title: 'Pořadí',
      type: 'number',
      description: 'Nižší číslo = zobrazí se dříve. Minimum 2, maximum dle potřeby.',
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
