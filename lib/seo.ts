/**
 * Centrální SEO konfigurace pro Nice Job.
 * Všechny metadata, JSON-LD schémata a helpery jsou zde.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://nicejob.cz'

// ── Základní informace o firmě ────────────────────────────────────────────

export const COMPANY = {
  brandName:   'Nice Job',
  legalName:   'MZ Training s.r.o.',
  ic:          '24192279',
  dic:         'CZ24192279',
  description: 'Moderní HR agentura s lidským přístupem. Komplexní nábor, headhunting a HR poradenství pro firmy v Praze a okolí.',
  url:         SITE_URL,
  logo:        `${SITE_URL}/loga/logo-color.svg`,
  email:       'kocandova@mztraining.cz',
  phone:       '+420737266272',
  phoneDisplay: '+420 737 266 272',

  address: {
    street:    'Strančická 3339/43',
    city:      'Praha 4',
    zip:       '100 00',
    country:   'CZ',
    countryName: 'Česká republika',
  },
  branch: {
    street: 'K Písnici 611',
    city:   'Dolní Břežany',
    zip:    '252 41',
  },

  social: {
    linkedin: 'https://www.linkedin.com/in/zdenkakocandova/',
  },

  openingHours: 'dle dohody',
  areaServed:   ['Praha', 'Středočeský kraj', 'Česká republika'],

  keywords: [
    'HR agentura Praha',
    'personální agentura Praha',
    'headhunting Praha',
    'nábor zaměstnanců',
    'recruiting Praha',
    'HR poradenství',
    'obsazování pracovních pozic',
    'employer branding',
    'HR konzultant Praha',
    'nábor na klíč',
    'Nice Job',
    'MZ Training',
  ],
}

export const PERSON = {
  name:     'Mgr. Zdeňka Kocandová',
  jobTitle: 'ředitelka společnosti',
  email:    'kocandova@mztraining.cz',
  phone:    '+420737266272',
  linkedin: 'https://www.linkedin.com/in/zdenkakocandova/',
}

// ── JSON-LD schémata ──────────────────────────────────────────────────────

/** WebSite schema — pomáhá Google zobrazit SearchBox v výsledcích */
export function schemaWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type':    'WebSite',
    '@id':      `${SITE_URL}/#website`,
    name:       COMPANY.brandName,
    alternateName: COMPANY.legalName,
    url:        SITE_URL,
    inLanguage: 'cs-CZ',
    potentialAction: {
      '@type':       'SearchAction',
      target:        { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/pozice?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

/** Organization + LocalBusiness schema */
export function schemaOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type':    ['Organization', 'ProfessionalService'],
    '@id':      `${SITE_URL}/#organization`,
    name:       COMPANY.brandName,
    legalName:  COMPANY.legalName,
    url:        SITE_URL,
    logo: {
      '@type':      'ImageObject',
      url:          COMPANY.logo,
      contentUrl:   COMPANY.logo,
    },
    image:      COMPANY.logo,
    description: COMPANY.description,
    email:      COMPANY.email,
    telephone:  COMPANY.phone,
    vatID:      COMPANY.dic,
    taxID:      COMPANY.ic,
    address: {
      '@type':          'PostalAddress',
      streetAddress:    COMPANY.address.street,
      addressLocality:  COMPANY.address.city,
      postalCode:       COMPANY.address.zip,
      addressCountry:   COMPANY.address.country,
    },
    location: [
      {
        '@type': 'Place',
        name:    `${COMPANY.brandName} — Praha`,
        address: {
          '@type':         'PostalAddress',
          streetAddress:   COMPANY.address.street,
          addressLocality: COMPANY.address.city,
          postalCode:      COMPANY.address.zip,
          addressCountry:  COMPANY.address.country,
        },
      },
      {
        '@type': 'Place',
        name:    `${COMPANY.brandName} — Dolní Břežany`,
        address: {
          '@type':         'PostalAddress',
          streetAddress:   COMPANY.branch.street,
          addressLocality: COMPANY.branch.city,
          postalCode:      COMPANY.branch.zip,
          addressCountry:  COMPANY.address.country,
        },
      },
    ],
    areaServed:    COMPANY.areaServed,
    openingHours:  COMPANY.openingHours,
    sameAs: [
      COMPANY.social.linkedin,
    ],
    founder: {
      '@type':    'Person',
      '@id':      `${SITE_URL}/#person-kocandova`,
      name:       PERSON.name,
      jobTitle:   PERSON.jobTitle,
      email:      PERSON.email,
      telephone:  PERSON.phone,
      sameAs:     [PERSON.linkedin],
      worksFor: { '@id': `${SITE_URL}/#organization` },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name:    'HR služby',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Komplexní nábor na klíč', description: 'Od definice profilu přes aktivní vyhledávání až po podpis smlouvy.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HR audit & poradenství',  description: 'Zmapování HR procesů, analýza kultury a nastavení měřitelných cílů.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Headhunting',             description: 'Přímé oslovení top kandidátů na C-level, senior a specialistické pozice.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Budování firemní kultury',description: 'Employer branding, hodnoty a způsob komunikace.' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vzdělávání týmů',         description: 'Tréninky a workshopy na míru — leadership, komunikace, sales, HR.' } },
      ],
    },
  }
}

/** BreadcrumbList pro podstránky */
export function schemaBreadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context':        'https://schema.org',
    '@type':           'BreadcrumbList',
    itemListElement:   items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  }
}

/** JobPosting schema pro detail inzerátu */
export function schemaJobPosting(job: {
  title:       string
  description: string
  datePosted:  string
  location:    string
  salaryFrom?: number
  salaryTo?:   number
  slug:        string
  employmentTypes: string[]
}) {
  // Mapování internal hodnot na schema.org
  const typeMap: Record<string, string> = {
    plny:     'FULL_TIME',
    castecny: 'PART_TIME',
    dpp:      'CONTRACTOR',
    dpc:      'CONTRACTOR',
    remote:   'TELECOMMUTE',
    hybridni: 'OTHER',
  }

  const schema: Record<string, unknown> = {
    '@context':        'https://schema.org',
    '@type':           'JobPosting',
    title:             job.title,
    description:       job.description,
    datePosted:        job.datePosted,
    validThrough:      new Date(new Date(job.datePosted).setFullYear(new Date(job.datePosted).getFullYear() + 1)).toISOString().split('T')[0],
    url:               `${SITE_URL}/pozice/${job.slug}`,
    hiringOrganization: {
      '@type':    'Organization',
      '@id':      `${SITE_URL}/#organization`,
      name:       COMPANY.brandName,
      sameAs:     SITE_URL,
      logo:       COMPANY.logo,
    },
    jobLocation: {
      '@type':  'Place',
      address: {
        '@type':          'PostalAddress',
        addressLocality:  job.location,
        addressCountry:   'CZ',
      },
    },
    employmentType: job.employmentTypes.map(t => typeMap[t] ?? 'OTHER'),
    directApply:    true,
  }

  if (job.salaryFrom || job.salaryTo) {
    schema.baseSalary = {
      '@type':    'MonetaryAmount',
      currency:   'CZK',
      value: {
        '@type':   'QuantitativeValue',
        ...(job.salaryFrom ? { minValue: job.salaryFrom } : {}),
        ...(job.salaryTo   ? { maxValue: job.salaryTo   } : {}),
        unitText:  'MONTH',
      },
    }
  }

  return schema
}

// ── Metadata helpery ──────────────────────────────────────────────────────

export function buildMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title:        string
  description:  string
  path?:        string
  image?:       string
  noIndex?:     boolean
}) {
  const url = `${SITE_URL}${path}`
  const ogImage = image ?? `${SITE_URL}/og-default.png`

  return {
    title,
    description,
    keywords:   COMPANY.keywords.join(', '),
    authors:    [{ name: PERSON.name }],
    creator:    COMPANY.brandName,
    publisher:  COMPANY.brandName,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type:        'website' as const,
      url,
      siteName:    COMPANY.brandName,
      title,
      description,
      locale:      'cs_CZ',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        'summary_large_image' as const,
      title,
      description,
      images:      [ogImage],
    },
  }
}
