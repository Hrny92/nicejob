import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, type, message } = body

    // ── Validace ────────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Vyplňte povinná pole: jméno, e-mail a zprávu.' },
        { status: 400 }
      )
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRe.test(email)) {
      return NextResponse.json({ error: 'Neplatný formát e-mailu.' }, { status: 400 })
    }

    // ── Napojení na e-mail (TODO) ────────────────────────────
    // Zde doplnit odesílání přes Resend / Nodemailer / SendGrid:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'web@nicejob.cz',
    //   to: 'info@nicejob.cz',
    //   subject: `Nová zpráva od ${name}`,
    //   html: `<p>${message}</p>`,
    // })
    //
    // Proměnné prostředí přidat do .env.local + Vercel Environment Variables

    console.log('📬 Nová zpráva z webu:', { name, email, phone, company, type, message })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Interní chyba serveru.' }, { status: 500 })
  }
}
