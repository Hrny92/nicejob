'use client'

import { useEffect, useRef, useState } from 'react'
import { useContactModal } from '@/context/ContactModalContext'

type Status = 'idle' | 'loading' | 'success' | 'error'
type UserType = 'firma' | 'kandidat' | ''

const INITIAL = { name: '', email: '', phone: '', company: '', message: '', type: '' as UserType }

export default function ContactModal() {
  const { isOpen, close } = useContactModal()
  const backdropRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<typeof INITIAL>>({})

  /* Scroll lock + ESC */
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  /* Reset po zavření */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setForm(INITIAL)
        setStatus('idle')
        setErrors({})
      }, 300)
    }
  }, [isOpen])

  const validate = () => {
    const e: Partial<typeof INITIAL> = {}
    if (!form.name.trim())    e.name    = 'Vyplňte jméno'
    if (!form.email.trim())   e.email   = 'Vyplňte e-mail'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Neplatný formát'
    if (!form.message.trim()) e.message = 'Napište nám zprávu'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const set = (field: keyof typeof INITIAL) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      onClick={e => e.target === backdropRef.current && close()}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(5,14,29,0.82)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        animation: 'modalFadeIn 0.25s ease both',
      }}
    >
      <style>{`
        @keyframes modalFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes modalSlideUp { from { opacity:0; transform:translateY(28px) scale(0.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        .cform-input {
          width:100%; background:#f8fafc; border:1.5px solid #e2e8f0;
          border-radius:10px; padding:11px 14px;
          font-size:0.9rem; color:#0B294A; outline:none;
          transition:border-color 0.2s, box-shadow 0.2s;
          font-family:inherit;
        }
        .cform-input:focus { border-color:#1E71C9; box-shadow:0 0 0 3px rgba(30,113,201,0.1); }
        .cform-input.err   { border-color:#be1622; }
        .cform-input::placeholder { color:#94a3b8; }
        textarea.cform-input { resize:vertical; min-height:110px; }
      `}</style>

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* ── Hlavička ─────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg, #050e1d 0%, #0B294A 100%)',
          borderRadius: '20px 20px 0 0',
          padding: '28px 28px 24px',
          position: 'relative',
        }}>
          {/* Tečkový vzor */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '20px 20px 0 0', pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Zavřít */}
          <button
            type="button"
            onClick={close}
            aria-label="Zavřít"
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 10,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.22)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622' }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Kontakt
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 900,
              fontSize: '1.7rem', color: '#fff', lineHeight: 1.1, marginBottom: 4,
            }}>
              Napiš nám
            </h2>
            <p style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: '1.15rem', color: 'rgba(30,113,201,0.85)',
            }}>
              ozveme se do 24 hodin.
            </p>
          </div>
        </div>

        {/* ── Tělo formuláře ───────────────────────────── */}
        <div style={{ padding: '28px 28px 32px' }}>

          {status === 'success' ? (
            /* Úspěch */
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(30,113,201,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#1E71C9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Roboto, system-ui', fontWeight: 800, color: '#050e1d', fontSize: '1.2rem', marginBottom: 8 }}>
                Zpráva odeslána!
              </h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 24 }}>
                Děkujeme za váš zájem. Ozveme se vám co nejdříve, nejpozději do 24 hodin.
              </p>
              <button
                onClick={close}
                style={{
                  background: '#0B294A', color: '#fff', border: 'none',
                  borderRadius: 999, padding: '11px 28px',
                  fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Zavřít
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Jsem */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 8, letterSpacing: '0.05em' }}>
                  Jsem
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { val: 'firma',    label: '🏢 Firma' },
                    { val: 'kandidat', label: '👤 Kandidát' },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, type: prev.type === val ? '' : val as UserType }))}
                      style={{
                        flex: 1, padding: '10px 0', borderRadius: 10, border: 'none',
                        fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.15s',
                        background: form.type === val ? '#0B294A' : '#f1f5f9',
                        color: form.type === val ? '#fff' : '#64748b',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Jméno + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    Jméno a příjmení <span style={{ color: '#be1622' }}>*</span>
                  </label>
                  <input
                    className={`cform-input${errors.name ? ' err' : ''}`}
                    value={form.name} onChange={set('name')}
                    placeholder="Jan Novák"
                  />
                  {errors.name && <p style={{ color: '#be1622', fontSize: '0.75rem', marginTop: 4 }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    E-mail <span style={{ color: '#be1622' }}>*</span>
                  </label>
                  <input
                    type="email"
                    className={`cform-input${errors.email ? ' err' : ''}`}
                    value={form.email} onChange={set('email')}
                    placeholder="jan@firma.cz"
                  />
                  {errors.email && <p style={{ color: '#be1622', fontSize: '0.75rem', marginTop: 4 }}>{errors.email}</p>}
                </div>
              </div>

              {/* Telefon + Firma */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="cform-input"
                    value={form.phone} onChange={set('phone')}
                    placeholder="+420 123 456 789"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                    Firma
                  </label>
                  <input
                    className="cform-input"
                    value={form.company} onChange={set('company')}
                    placeholder="Název společnosti"
                  />
                </div>
              </div>

              {/* Zpráva */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                  Zpráva <span style={{ color: '#be1622' }}>*</span>
                </label>
                <textarea
                  className={`cform-input${errors.message ? ' err' : ''}`}
                  value={form.message} onChange={set('message')}
                  placeholder="Čím vám můžeme pomoci?"
                />
                {errors.message && <p style={{ color: '#be1622', fontSize: '0.75rem', marginTop: 4 }}>{errors.message}</p>}
              </div>

              {/* Chyba odeslání */}
              {status === 'error' && (
                <p style={{
                  background: 'rgba(190,22,34,0.07)', border: '1px solid rgba(190,22,34,0.2)',
                  borderRadius: 10, padding: '10px 14px',
                  color: '#be1622', fontSize: '0.85rem',
                }}>
                  Nepodařilo se odeslat zprávu. Zkuste to prosím znovu nebo nás kontaktujte na kocandova@mztraining.cz.
                </p>
              )}

              {/* Odeslat */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? '#94a3b8' : '#0B294A',
                  color: '#fff', border: 'none',
                  borderRadius: 999, padding: '13px 0',
                  fontSize: '0.95rem', fontWeight: 700,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginTop: 4,
                }}
              >
                {status === 'loading' ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                    </svg>
                    Odesílám…
                  </>
                ) : 'Odeslat zprávu →'}
              </button>

              <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: -4 }}>
                Odesláním souhlasíte se{' '}
                <a href="/gdpr" target="_blank" style={{ color: '#1E71C9', textDecoration: 'underline' }}>
                  zpracováním osobních údajů
                </a>.
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
