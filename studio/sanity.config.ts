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
            S.listItem()
              .title('Pracovní pozice')
              .icon(() => '💼')
              .child(
                S.documentTypeList('pozice')
                  .title('Pracovní pozice')
                  .defaultOrdering([{ field: 'zverejneno', direction: 'desc' }])
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
