import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactInfo } from '../data'

gsap.registerPlugin(ScrollTrigger)

const CHANNELS = [
  {
    label: 'Email',
    get value() { return contactInfo.email },
    get href()  { return `mailto:${contactInfo.email}` },
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    color: 'var(--brand)',
  },
  {
    label: 'Instagram',
    get value() { return contactInfo.instagramHandle },
    get href()  { return contactInfo.instagram },
    icon: <><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    color: '#bc1888',
  },
  {
    label: 'YouTube',
    get value() { return contactInfo.youtubeHandle },
    get href()  { return contactInfo.youtube },
    icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
    color: '#FF0000',
  },
]

export default function Contact() {
  const leftRef  = useRef(null)
  const rightRef = useRef(null)
  const [form, setForm] = useState({ fname:'', lname:'', email:'', service:'', msg:'' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    gsap.fromTo(leftRef.current,
      { opacity:0, x:-40 },
      { opacity:1, x:0, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger:leftRef.current, start:'top 80%', once:true } })
    gsap.fromTo(rightRef.current,
      { opacity:0, x:40 },
      { opacity:1, x:0, duration:0.9, ease:'power3.out',
        scrollTrigger:{ trigger:rightRef.current, start:'top 80%', once:true } })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const set = (k) => (v) => setForm(f => ({ ...f, [k]:v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => { setSent(false); setForm({ fname:'',lname:'',email:'',service:'',msg:'' }) }, 3500)
  }

  return (
    <section id="contact">
      <div className="contact-split">

        {/* ── LEFT — dark ──────────────────────────── */}
        <div ref={leftRef} className="contact-left" style={{ opacity:0 }}>
          <div className="contact-left-bg"/>

          <p className="label contact-left-label">
            <span className="rule" style={{ background:'var(--ink-light)' }}/>
            Get in touch
          </p>

          <h2 className="display-md contact-left-title" style={{ marginTop:20, marginBottom:24 }}>
            Let's make<br/>something <em className="accent-br">great.</em>
          </h2>

          <p className="contact-lead">
            Whether you have a brief ready or just a rough idea — we're here for it. Tell us what you're building and let's figure out how PixelBloom can make it better.
          </p>

          <div className="contact-channel-list">
            {CHANNELS.map(ch => (
              <a key={ch.label} href={ch.href} target="_blank" rel="noreferrer" className="contact-channel">
                <div className="contact-ch-icon">
                  <svg viewBox="0 0 24 24" style={{ width:16,height:16,stroke:ch.color,fill:'none',strokeWidth:1.5 }}>
                    {ch.icon}
                  </svg>
                </div>
                <div>
                  <div className="contact-ch-lbl">{ch.label}</div>
                  <div className="contact-ch-val">{ch.value}</div>
                </div>
                <div style={{ marginLeft:'auto', color:'var(--ink-light)', fontSize:18 }}>↗</div>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT — form ─────────────────────────── */}
        <div ref={rightRef} className="contact-right" style={{ opacity:0 }}>
          <div className="contact-form-title">Send us a brief</div>
          <div className="contact-form-sub">We'll respond within 24 hours.</div>

          {sent ? (
            <div className="form-sent">
              <div className="form-sent-icon">✦</div>
              <div className="form-sent-msg">Message sent — we'll be in touch soon!</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <F label="First name" id="fn" placeholder="Varad"   v={form.fname} onChange={set('fname')}/>
                <F label="Last name"  id="ln" placeholder="Patil"   v={form.lname} onChange={set('lname')}/>
              </div>
              <div className="fgroup">
                <F label="Email" id="em" type="email" placeholder="hello@studio.com" v={form.email} onChange={set('email')}/>
              </div>
              <div className="fgroup">
                <label htmlFor="svc">Service needed</label>
                <select id="svc" value={form.service} onChange={e => set('service')(e.target.value)}>
                  <option value="">Select a service…</option>
                  <option>Wedding Films</option>
                  <option>Creator Space</option>
                  <option>Brand &amp; Commercial</option>
                  <option>VFX &amp; 3D</option>
                  <option>Photography</option>
                  <option>Video Editing</option>
                </select>
              </div>
              <div className="fgroup">
                <label htmlFor="msg">Tell us about your project</label>
                <textarea id="msg" placeholder="Brief description, timeline, budget range…" value={form.msg} onChange={e => set('msg')(e.target.value)}/>
              </div>
              <button type="submit" className="form-btn">
                Send brief →
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}

/* ── Field helper ──────────────────────────────────────────── */
function F({ label, id, type='text', placeholder, v, onChange }) {
  return (
    <div className="fgroup">
      <label htmlFor={id}>{label}</label>
      <input
        id={id} type={type} placeholder={placeholder} value={v}
        onChange={e => onChange(e.target.value)}
        onFocus={e => { e.target.style.borderColor='var(--wedding)'; e.target.style.boxShadow='0 0 0 3px rgba(232,135,156,.2)' }}
        onBlur={e  => { e.target.style.borderColor='';               e.target.style.boxShadow='' }}
      />
    </div>
  )
}
