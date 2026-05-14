import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const TYPE_LABELS: Record<string, string> = {
  nabor:       'Nábor / RPO',
  headhunting: 'Headhunting',
  poradenstvi: 'HR poradenství',
  skoleni:     'Školení',
  jine:        'Jiné',
}

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

    // ── SMTP transporter (Email Profi / Seznam) ──────────────
    const transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz',
      port: 465,
      secure: true,          // SSL
      auth: {
        user: process.env.SMTP_USER,   // info@nicejob.cz
        pass: process.env.SMTP_PASS,
      },
    })

    const typeLabel = TYPE_LABELS[type] ?? type ?? '—'

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; color: #050e1d;">
        <div style="background: #0B294A; padding: 24px 32px; border-radius: 10px 10px 0 0;">
          <h2 style="color: #fff; margin: 0; font-size: 1.2rem;">
            📬 Nová zpráva z webu NICEJOB
          </h2>
        </div>
        <div style="background: #f4f7fb; padding: 28px 32px; border-radius: 0 0 10px 10px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 130px;">Jméno</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">E-mail</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1E71C9;">${email}</a></td>
            </tr>
            ${phone ? `<tr>
              <td style="padding: 8px 0; color: #64748b;">Telefon</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #1E71C9;">${phone}</a></td>
            </tr>` : ''}
            ${company ? `<tr>
              <td style="padding: 8px 0; color: #64748b;">Firma</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Typ poptávky</td>
              <td style="padding: 8px 0;">${typeLabel}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 18px 0;" />

          <p style="color: #64748b; font-size: 0.8rem; margin: 0 0 8px;">Zpráva:</p>
          <p style="white-space: pre-wrap; margin: 0; line-height: 1.65;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
      </div>
    `

    await transporter.sendMail({
      from:    `"NICEJOB web" <${process.env.SMTP_USER}>`,
      to:      process.env.MAIL_TO ?? 'lukas.hrncir@bidli.cz',
      replyTo: email,
      subject: `Nová poptávka: ${name}${company ? ` (${company})` : ''} — ${typeLabel}`,
      html:    htmlBody,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' }, { status: 500 })
  }
}
