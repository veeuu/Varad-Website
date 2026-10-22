import './CreatorSpace.css'
import DitherVeil from './DitherVeil'
import ShreeMark from './ShreeMark'

const CREATOR_IMAGE = 'https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop'

export default function CreatorSpace({ onBack, designVersion = 'current' }) {
  const isPreviousDesign = designVersion === 'previous'

  return (
    <main className="creator-page">
      <header className="creator-page-nav">
        {isPreviousDesign && <div className="creator-shree-mark"><ShreeMark /></div>}
        <a
          className="creator-brand"
          href="#"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          <span className="creator-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="creator-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="creator-hero" aria-labelledby="creator-page-title">
        <div className="creator-visual">
          <DitherVeil
            src={CREATOR_IMAGE}
            pattern="floyd"
            pixelSize={2}
            inkColor={isPreviousDesign ? '#120f17' : '#f2efe8'}
            paperColor={isPreviousDesign ? '#f4f1ea' : '#342b28'}
            revealRadius={200}
            softness={0.6}
            linger={1}
            fit="contain"
            rimColor={isPreviousDesign ? '#a78bfa' : '#e85a2a'}
            palette="duotone"
            levels={2}
            contrast={isPreviousDesign ? 1.15 : 1.25}
            brightness={0}
            rim={isPreviousDesign ? 0 : 0.24}
            transparentBackground={!isPreviousDesign}
            reverse={false}
            wander={!isPreviousDesign}
            clickBurst
          />
          <span className="creator-visual-caption">A little more than an edit</span>
        </div>

        <div className="creator-copy">
          <p className="creator-eyebrow"><span/> Creator Space <span/></p>
          <h1 id="creator-page-title">
            Make room<br />
            for your <em>next story.</em>
          </h1>
          <p className="creator-lede">
            Your channel has a voice. We help it find its rhythm with thoughtful, reliable post-production—so you can stay focused on making.
          </p>

          <div className="creator-offerings" aria-label="Creator services">
            <div><span>01</span><p>Long-form video editing</p></div>
            <div><span>02</span><p>Shorts, reels &amp; cutdowns</p></div>
            <div><span>03</span><p>Ongoing creative partnerships</p></div>
          </div>

          <div className="creator-actions">
            <a className="btn creator-cta" href="#contact">
              Let’s build your channel <span aria-hidden="true">↗</span>
            </a>
            <a
              className="creator-work-link"
              href="#work"
              onClick={event => {
                event.preventDefault()
                onBack()
                window.setTimeout(() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }, 80)
              }}
            >
              See creator work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
