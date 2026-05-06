/**
 * StructuredData — vloží JSON-LD schema do <head>.
 * Použití:
 *   <StructuredData schema={schemaOrganization()} />
 *   <StructuredData schema={[schemaWebSite(), schemaOrganization()]} />
 */
export default function StructuredData({
  schema,
}: {
  schema: Record<string, unknown> | Record<string, unknown>[]
}) {
  const data = Array.isArray(schema)
    ? { '@context': 'https://schema.org', '@graph': schema }
    : schema

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  )
}
