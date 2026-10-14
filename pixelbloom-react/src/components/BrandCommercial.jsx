import './BrandCommercial.css'
import { GridScan } from './GridScan'

export default function BrandCommercial({ onBack }) {
  return (
    <main className="brand-commercial-page">
      <header className="brand-commercial-nav">
        <a
          className="brand-commercial-brand"
          href="#"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          <span className="brand-commercial-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="brand-commercial-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="brand-commercial-hero" aria-labelledby="brand-commercial-title">
        <GridScan
          className="brand-commercial-grid"
          style={{ position: 'absolute', inset: 0 }}
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#a48270"
          gridScale={0.1}
          scanColor="#e85a2a"
          scanOpacity={0.72}
          enablePost
          bloomIntensity={0.75}
          chromaticAberration={0.0015}
          noiseIntensity={0.008}
          lineJitter={0.14}
          scanGlow={0.75}
          scanSoftness={2}
        />
        <div className="brand-commercial-shade" aria-hidden="true"/>

        <div className="brand-commercial-content">
          <p className="brand-commercial-eyebrow"><span/> Brand &amp; Commercial <span/></p>
          <h1 id="brand-commercial-title">
            Make your<br />
            <em>brand impossible</em><br />
            to ignore.
          </h1>
          <p className="brand-commercial-description">
            Campaigns, partnership content and commercial edits for brands looking to grow their digital presence with cinematic quality.
          </p>

          <div className="brand-commercial-services" aria-label="Brand and commercial services">
            <span>Campaigns</span>
            <span>Reels</span>
            <span>Partnerships</span>
          </div>

          <div className="brand-commercial-actions">
            <a className="btn brand-commercial-cta" href="#contact">
              Let’s make something <span aria-hidden="true">↗</span>
            </a>
            <a
              className="brand-commercial-work-link"
              href="#work"
              onClick={event => {
                event.preventDefault()
                onBack()
                window.setTimeout(() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }, 80)
              }}
            >
              Explore our work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <span className="brand-commercial-index" aria-hidden="true">03 / 06 — BRAND STORIES</span>
      </section>
    </main>
  )
}
