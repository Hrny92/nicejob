import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const TYPE_LABELS: Record<string, string> = {
  nabor:       'Nábor / RPO',
  headhunting: 'Headhunting',
  poradenstvi: 'HR poradenství',
  skoleni:     'Školení',
  jine:        'Jiné',
  kandidat:    'Kandidát',
  firma:       'Firma',
}

export async function POST(req: NextRequest) {
  try {
    const fd = await req.formData()

    const name     = (fd.get('name')     as string | null) ?? ''
    const email    = (fd.get('email')    as string | null) ?? ''
    const phone    = (fd.get('phone')    as string | null) ?? ''
    const company  = (fd.get('company')  as string | null) ?? ''
    const type     = (fd.get('type')     as string | null) ?? ''
    const message  = (fd.get('message')  as string | null) ?? ''
    const jobTitle = (fd.get('jobTitle') as string | null) ?? ''
    const file     = fd.get('file') as File | null

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

    // ── SMTP transporter ────────────────────────────────────
    const transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const typeLabel = TYPE_LABELS[type] ?? type ?? '—'
    const now = new Date().toLocaleString('cs-CZ', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague',
    })

    const safeMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const safeJobTitle = jobTitle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    const htmlBody = `<!DOCTYPE html>
<html lang="cs">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>NICE JOB — ${safeJobTitle ? 'Reakce na pozici' : 'Nová zpráva'}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#eef2f7" style="background-color:#eef2f7;">
  <tr>
    <td align="center" style="padding:32px 16px 40px;">

      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;">

        <!-- ══ HEADER ════════════════════════════════════════════ -->
        <tr>
          <td bgcolor="#050e1d" style="background-color:#050e1d;border-radius:16px 16px 0 0;padding:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <!-- Levý barevný pruh -->
                <td width="6" style="background-color:#1E71C9;border-radius:16px 0 0 0;">&nbsp;</td>
                <td style="padding:28px 32px 26px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:middle;">
                        <!-- Logo -->
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="40" height="40" bgcolor="#1E71C9" style="background-color:#1E71C9;border-radius:10px;text-align:center;vertical-align:middle;font-family:Arial,sans-serif;font-size:18px;font-weight:900;color:#ffffff;line-height:40px;">
                              N
                            </td>
                            <td style="padding-left:12px;vertical-align:middle;">
                              <div style="color:#ffffff;font-size:18px;font-weight:900;letter-spacing:-0.3px;line-height:1.15;font-family:Arial,sans-serif;">NICE JOB</div>
                              <div style="color:rgba(255,255,255,0.38);font-size:10px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;margin-top:2px;font-family:Arial,sans-serif;">
                                ${safeJobTitle ? 'pracovní nabídky' : 'kontaktní formulář'}
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td align="right" style="vertical-align:middle;">
                        <!-- Typ badge -->
                        <span style="display:inline-block;background-color:${safeJobTitle ? '#1E71C9' : type === 'firma' ? '#0B294A' : '#1E71C9'};color:#ffffff;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:5px 14px;border-radius:99px;font-family:Arial,sans-serif;">
                          ${safeJobTitle ? 'Životopis' : typeLabel || 'Zpráva'}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ REAKCE NA POZICI ══════════════════════════════════ -->
        ${safeJobTitle ? `
        <tr>
          <td bgcolor="#1E3A5F" style="background-color:#1E3A5F;padding:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="6" style="background-color:#1E71C9;">&nbsp;</td>
                <td style="padding:16px 32px;">
                  <div style="color:rgba(255,255,255,0.5);font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:5px;font-family:Arial,sans-serif;">Reakce na pozici</div>
                  <div style="color:#ffffff;font-size:16px;font-weight:700;font-family:Arial,sans-serif;">${safeJobTitle}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : ''}

        <!-- ══ KONTAKTNÍ ÚDAJE ═══════════════════════════════════ -->
        <tr>
          <td bgcolor="#ffffff" style="background-color:#ffffff;padding:32px 38px 24px;">

            <div style="font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:18px;font-family:Arial,sans-serif;">Odesílatel</div>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">

              <!-- Jméno -->
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;" width="120">
                  <span style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:Arial,sans-serif;">Jméno</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                  <span style="font-size:14px;color:#050e1d;font-weight:700;font-family:Arial,sans-serif;">${name}</span>
                </td>
              </tr>

              <!-- E-mail -->
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;" width="120">
                  <span style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:Arial,sans-serif;">E-mail</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                  <a href="mailto:${email}" style="font-size:14px;color:#1E71C9;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">${email}</a>
                </td>
              </tr>

              ${phone ? `
              <!-- Telefon -->
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;" width="120">
                  <span style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:Arial,sans-serif;">Telefon</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                  <a href="tel:${phone.replace(/\s/g, '')}" style="font-size:14px;color:#1E71C9;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;">${phone}</a>
                </td>
              </tr>
              ` : ''}

              ${company ? `
              <!-- Firma -->
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;" width="120">
                  <span style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:Arial,sans-serif;">Firma</span>
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:middle;">
                  <span style="font-size:14px;color:#050e1d;font-weight:600;font-family:Arial,sans-serif;">${company}</span>
                </td>
              </tr>
              ` : ''}

              ${!safeJobTitle && typeLabel ? `
              <!-- Typ -->
              <tr>
                <td style="padding:10px 0;vertical-align:middle;" width="120">
                  <span style="font-size:11px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-family:Arial,sans-serif;">Typ</span>
                </td>
                <td style="padding:10px 0;vertical-align:middle;">
                  <span style="display:inline-block;background-color:#f0f7ff;color:#1E71C9;font-size:12px;font-weight:700;padding:3px 12px;border-radius:99px;font-family:Arial,sans-serif;">${typeLabel}</span>
                </td>
              </tr>
              ` : ''}

            </table>
          </td>
        </tr>

        <!-- ══ ZPRÁVA ════════════════════════════════════════════ -->
        <tr>
          <td bgcolor="#f8fafc" style="background-color:#f8fafc;padding:0 38px 28px;border-left:1px solid #e8edf4;border-right:1px solid #e8edf4;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td bgcolor="#f0f7ff" style="background-color:#f0f7ff;border-radius:10px;padding:20px 22px;margin-top:20px;">
                  <div style="font-size:10px;font-weight:700;color:#1E71C9;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:12px;font-family:Arial,sans-serif;">Zpráva</div>
                  <div style="font-size:14px;color:#1e293b;line-height:1.7;white-space:pre-wrap;font-family:Arial,sans-serif;">${safeMessage}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ PŘÍLOHA ══════════════════════════════════════════ -->
        ${file && file.size > 0 ? `
        <tr>
          <td bgcolor="#f8fafc" style="background-color:#f8fafc;padding:0 38px 24px;border-left:1px solid #e8edf4;border-right:1px solid #e8edf4;">
            <table role="presentation" cellpadding="0" cellspacing="0" style="border:1.5px solid #d1d9e8;border-radius:8px;padding:12px 16px;background-color:#ffffff;">
              <tr>
                <td width="28" style="vertical-align:middle;text-align:center;padding-right:10px;">
                  <div style="width:28px;height:28px;background-color:#eef2f7;border-radius:6px;text-align:center;line-height:28px;font-size:14px;">📎</div>
                </td>
                <td style="vertical-align:middle;">
                  <div style="font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:2px;font-family:Arial,sans-serif;">Příloha</div>
                  <div style="font-size:13px;color:#050e1d;font-weight:600;font-family:Arial,sans-serif;">${file.name}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        ` : ''}

        <!-- ══ FOOTER ════════════════════════════════════════════ -->
        <tr>
          <td bgcolor="#f1f5f9" style="background-color:#f1f5f9;border-radius:0 0 16px 16px;padding:20px 38px;border:1px solid #e2e8f0;border-top:none;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="vertical-align:middle;">
                  <span style="font-size:11px;color:#94a3b8;font-family:Arial,sans-serif;">Odesláno ${now}</span>
                </td>
                <td align="right" style="vertical-align:middle;">
                  <a href="https://nicejob.cz" style="font-size:11px;color:#1E71C9;text-decoration:none;font-weight:600;font-family:Arial,sans-serif;">nicejob.cz</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ══ REPLY CTA ═════════════════════════════════════════ -->
        <tr>
          <td align="center" style="padding:24px 0 0;">
            <a href="mailto:${email}" style="display:inline-block;background-color:#1E71C9;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;padding:12px 32px;border-radius:99px;font-family:Arial,sans-serif;letter-spacing:0.02em;">
              Odpovědět ${name.split(' ')[0] ? `${name.split(' ')[0]}ovi` : ''} →
            </a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`

    // ── Příloha ─────────────────────────────────────────────
    const attachments: { filename: string; content: Buffer }[] = []
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({ filename: file.name, content: buffer })
    }

    const subject = jobTitle
      ? `Životopis: ${name} — ${jobTitle}`
      : `Nová poptávka: ${name}${company ? ` (${company})` : ''} — ${typeLabel}`

    await transporter.sendMail({
      from:        `"NICEJOB web" <${process.env.SMTP_USER}>`,
      to:          process.env.MAIL_TO ?? 'lukas.hrncir@bidli.cz',
      replyTo:     email,
      subject,
      html:        htmlBody,
      attachments,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json({ error: 'Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.' }, { status: 500 })
  }
}
