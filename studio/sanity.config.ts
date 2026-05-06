import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'nicejob',
  title: 'Nice Job — CMS',

  projectId: 'd9mk2nno',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nice Job CMS')
          .items([
            // ── Stránky (singletony) ────────────────────────────
            S.listItem()
              .title('O nás')
              .icon(() => '👤')
              .child(
                S.document()
                  .schemaType('oNas')
                  .documentId('singleton-oNas')
                  .title('O nás')
              ),
            S.listItem()
              .title('Proč my')
              .icon(() => '🏆')
              .child(
                S.document()
                  .schemaType('procMy')
                  .documentId('singleton-procMy')
                  .title('Proč my')
              ),
            S.divider(),
            // ── Kolekce ─────────────────────────────────────────
            S.listItem()
              .title('Pracovní pozice')
              .icon(() => '💼')
              .child(
                S.documentTypeList('pozice')
                  .title('Pracovní pozice')
                  .defaultOrdering([{ field: 'zverejneno', direction: 'desc' }])
              ),
            S.listItem()
              .title('Služby')
              .icon(() => '⚙️')
              .child(
                S.documentTypeList('sluzba')
                  .title('Služby')
                  .defaultOrdering([{ field: 'poradi', direction: 'asc' }])
              ),
            S.listItem()
              .title('Reference')
              .icon(() => '⭐')
              .child(
                S.documentTypeList('recenze')
                  .title('Reference')
                  .defaultOrdering([{ field: 'poradi', direction: 'asc' }])
              ),
            S.listItem()
              .title('Klienti (lišta)')
              .icon(() => '🏢')
              .child(
                S.documentTypeList('klient')
                  .title('Klienti')
                  .defaultOrdering([{ field: 'poradi', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
