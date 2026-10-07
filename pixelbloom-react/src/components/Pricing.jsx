import { useEffect } from 'react'
import './Pricing.css'

const PACKAGES = [
  {
    number: '01',
    name: 'Basic',
    note: 'A little polish goes a long way.',
    price: '₹7,500',
    unit: 'per project · sample rate',
    className: 'pricing-card-basic',
    features: [
      'One short-form video edit',
      'Clean cuts & thoughtful pacing',
      'Colour and audio finishing',
      'One revision round',
    ],
    action: 'Start with the basics',
  },
  {
    number: '02',
    name: 'Standard',
    note: 'More room for the whole story.',
    price: '₹18,000',
    unit: 'per project · sample rate',
    className: 'pricing-card-standard',
    badge: 'A lovely place to start',
    features: [
      'Three short-form video edits',
      'Custom pacing & colour grade',
      'Titles, captions & sound design',
      'Two revision rounds',
    ],
    action: 'Build something together',
  },
  {
    number: '03',
    name: 'Custom',
    note: 'Made around your kind of story.',
    price: 'Let’s talk',
    unit: 'a considered quote, just for you',
    className: 'pricing-card-custom',
    features: [
      'Wedding films & event coverage',
      'Brand campaigns & creator retainers',
      'VFX, 3D & ambitious ideas',
      'Scope shaped around your brief',
    ],
    action: 'Tell us what you have in mind',
  },
]

export default function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="pricing-page">
      <header className="pricing-page-nav">
        <a className="pricing-brand" href="#hero" aria-label="PixelBloom — back to studio">
          <span className="pricing-brand-mark" aria-hidden="true"><i /><i /></span>
          <span>PixelBloom</span>
        </a>
        <a className="pricing-back-link" href="#hero">
          <span aria-hidden="true">←</span> Back to studio
        </a>
      </header>
      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="pricing-hero-grain" aria-hidden="true" />
        <div className="pricing-hero-content">
          <p className="pricing-eyebrow"><span />A little clarity before we create<span /></p>
          <h1 id="pricing-title">Thoughtful work.<br /><em>Clear starting points.</em></h1>
          <p className="pricing-intro">
            Every good story starts with a conversation. Here are a few ways we can begin —
            then we shape the details around you.
          </p>
        </div>
        <div className="pricing-hero-stamp" aria-hidden="true">
          <span>Made with</span>
          <span className="pricing-stamp-heart">care</span>
          <span>in every frame</span>
        </div>
      </section>

      <section className="pricing-packages" id="packages" aria-labelledby="packages-title">
        <div className="pricing-section-heading">
          <div>
            <p className="pricing-section-kicker">A good place to begin</p>
            <h2 id="packages-title">Choose your <em>starting point.</em></h2>
          </div>
          <p className="pricing-sample-note">
            These are sample rates for now. We’ll tailor the final quote to your project.
          </p>
        </div>

        <div className="pricing-grid">
          {PACKAGES.map(item => (
            <article key={item.name} className={`pricing-card ${item.className}`}>
              {item.badge && <span className="pricing-badge">{item.badge}</span>}
              <div className="pricing-card-top">
                <span className="pricing-card-number">{item.number}</span>
                <span className="pricing-card-orbit" aria-hidden="true"><i /></span>
              </div>
              <h3>{item.name}</h3>
              <p className="pricing-card-note">{item.note}</p>
              <div className="pricing-price">{item.price}</div>
              <p className="pricing-price-unit">{item.unit}</p>
              <div className="pricing-card-rule" />
              <ul>
                {item.features.map(feature => (
                  <li key={feature}><span aria-hidden="true">✳</span>{feature}</li>
                ))}
              </ul>
              <a
                className="pricing-card-action"
                href="#contact"
              >
                {item.action}<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>

        <div className="pricing-footnote">
          <span className="pricing-footnote-mark" aria-hidden="true">✳</span>
          <p>
            Every project is different. Final pricing depends on the scope, timeline and
            little details that make your story yours.
          </p>
          <a href="#contact">Tell us about yours <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="pricing-note-band">
        <span className="pricing-note-line" aria-hidden="true" />
        <p>Good stories are made together.</p>
        <a href="#contact">Let’s make one <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  )
}
