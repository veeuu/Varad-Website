import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { contactInfo } from '../data'

const labelStyle = { display: 'block', fontSize: 10.5, fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink-light)', marginBottom: 7 }
const inputStyle = { width: '100%', background: 'var(--paper-warm)', border: '1px solid var(--border-med)', borderRadius: 'var(--r)', padding: '12px 15px', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 300, color: 'var(--ink)', outline: 'none', transition: 'border-color var(--t), box-shadow var(--t)', WebkitAppearance: 'none' }

function Field({ label, id, type = 'text', placeholder, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} style={inputStyle}
        onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb,var(--brand) 12%,transparent)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border-med)'; e.target.style.boxShadow = 'none' }}
      />
    </div>
  )
}

export default function Contact() {
  const ref = useScrollReveal()
  const [form, setForm] = useState({ fname: '', lname: '', email: '', service: '', msg: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ fname: '', lname: '', email: '', service: '', msg: '' }) }, 3000)
  }

  const channels = [
    {
      label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}`,
      icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    },
    {
      label: 'Instagram', value: contactInfo.instagramHandle, href: contactInfo.instagram,
      icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    },
    {
      label: 'YouTube', value: contactInfo.youtubeHandle, href: contactInfo.youtube,
      icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></>,
    },
  ]

  return (
    <section id="contact" style={{ padding: '120px 0', background: 'var(--paper-warm)' }} ref={ref}>
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <p className="label sr"><span className="rule" />Get in touch</p>
            <h2 className="section-title sr d1" style={{ margin: '12px 0 20px' }}>
              Let's make<br />something <em style={{ color: 'var(--brand)' }}>great.</em>
            </h2>
            <p className="about-body sr d2" style={{ marginBottom: 36 }}>
              Whether you have a brief ready or just a rough idea — we're here for it. Tell us what you're building and let's figure out how PixelBloom can make it better.
            </p>
            <div className="channel-list sr d3">
              {channels.map(ch => (
                <a key={ch.label} href={ch.href} target="_blank" rel="noreferrer" className="channel">
                  <div className="ch-icon-c">
                    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'var(--brand)', fill: 'none', strokeWidth: 1.5 }}>{ch.icon}</svg>
                  </div>
                  <div>
                    <div className="ch-lbl">{ch.label}</div>
                    <div className="ch-val">{ch.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="contact-form sr d2">
            <div className="form-title">Send us a brief</div>
            <div className="form-sub">We'll respond within 24 hours.</div>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="fgroup">
                  <Field label="First name" id="fname" placeholder="Varad" value={form.fname} onChange={v => setForm(f => ({ ...f, fname: v }))} />
                </div>
                <div className="fgroup">
                  <Field label="Last name" id="lname" placeholder="Sharma" value={form.lname} onChange={v => setForm(f => ({ ...f, lname: v }))} />
                </div>
              </div>
              <div className="fgroup">
                <Field label="Email address" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
              </div>
              <div className="fgroup">
                <label htmlFor="service" style={labelStyle}>Service needed</label>
                <select id="service" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={inputStyle}>
                  <option value="">Select a service…</option>
                  <option>Wedding Film</option>
                  <option>Creator Space</option>
                  <option>Brand &amp; Commercial</option>
                  <option>VFX &amp; 3D</option>
                  <option>Photography</option>
                  <option>Video Editing</option>
                </select>
              </div>
              <div className="fgroup">
                <label htmlFor="msg" style={labelStyle}>Tell us about your project</label>
                <textarea id="msg" placeholder="Quick overview — what are you making, when do you need it, and what's the vibe?" value={form.msg} onChange={e => setForm(f => ({ ...f, msg: e.target.value }))} style={{ ...inputStyle, height: 112, resize: 'none' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb,var(--brand) 12%,transparent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border-med)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              <button type="submit" className="form-btn"
                style={sent ? { background: 'var(--photo)', color: 'var(--ink)' } : {}}
              >
                {sent ? 'Message sent ✓' : 'Send message →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
