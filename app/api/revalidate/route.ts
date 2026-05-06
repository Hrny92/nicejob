import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Tajný klíč — musí shodovat s tím co nastavíte v Sanity webhooku
const SECRET = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  // Ověření tajného klíče
  if (!SECRET || secret !== SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const type: string = body?._type ?? ''

    // Podle typu dokumentu přegenerujeme příslušné stránky
    if (type === 'pozice') {
      revalidatePath('/', 'page')
      revalidatePath('/pozice', 'page')
      revalidatePath('/pozice/[slug]', 'page')
    } else if (type === 'recenze' || type === 'klient' || type === 'sluzba' || type === 'oNas' || type === 'procMy') {
      revalidatePath('/', 'page')
    } else {
      // Fallback — přegeneruj vše
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({ revalidated: true, type })
  } catch {
    return NextResponse.json({ message: 'Error parsing body' }, { status: 400 })
  }
}
