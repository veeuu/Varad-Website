import './WeddingFilms.css'
import ShreeMark from './ShreeMark'

const imagePath = file => `${import.meta.env.BASE_URL}assets/images/weddings/${file}`

const STORY_PHOTOS = [
  {
    src: imagePath('dsc00507.jpg'),
    alt: 'A candid moment shared during the wedding celebrations',
    label: 'The in-between',
    note: 'The moments you never planned.',
  },
  {
    src: imagePath('dsc00528.jpg'),
    alt: 'A quiet, heartfelt moment from the wedding day',
    label: 'The feeling',
    note: 'Everything the day felt like.',
  },
  {
    src: imagePath('dsc09907.jpg'),
    alt: 'A joyful scene from a wedding celebration',
    label: 'The celebration',
    note: 'A little bit of beautiful chaos.',
  },
]

export default function WeddingFilms({ onBack }) {
  const goToContact = event => {
    event.preventDefault()
    onBack()
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
  }

  return (
    <main className="wedding-page">
      <header className="wedding-page-nav">
        <a
          className="wedding-brand"
          href="#home"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
          aria-label="PixelBloom home"
        >
          <span className="wedding-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <div className="wedding-shree-mark"><ShreeMark /></div>
        <button className="wedding-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="wedding-cover" aria-labelledby="wedding-page-title">
        <div className="wedding-cover-copy">
          <p className="wedding-eyebrow wedding-intro-item"><span/> Wedding films, made personal</p>
          <h1 id="wedding-page-title">
            <span className="wedding-title-line"><span>The day goes by.</span></span>
            <span className="wedding-title-line"><em>The feeling stays.</em></span>
          </h1>
          <p className="wedding-cover-description wedding-intro-item">
            Honest, artful films for the day you’ll want to feel all over again.
          </p>
          <a className="wedding-text-link wedding-intro-item" href="#wedding-story">
            Explore the stories <span aria-hidden="true">↓</span>
          </a>
          <span className="wedding-cover-index wedding-intro-item" aria-hidden="true">01 <i/> 03</span>
        </div>

        <figure className="wedding-cover-image">
          <img
            src={imagePath('dsc09811.jpg')}
            alt="A couple surrounded by the warmth and color of their wedding day"
            loading="eager"
          />
          <figcaption>
            <span>One day, a thousand little stories.</span>
            <span>PixelBloom Weddings</span>
          </figcaption>
        </figure>
        <div className="wedding-cover-mark" aria-hidden="true">P<span>B</span></div>
      </section>

      <section className="wedding-story" id="wedding-story" aria-labelledby="wedding-story-title">
        <div className="wedding-story-heading">
          <div>
            <p className="wedding-eyebrow"><span/> A story in every frame</p>
            <h2 id="wedding-story-title">Not just how it looked.<br/><em>How it felt.</em></h2>
          </div>
          <p className="wedding-story-intro">
            The deep breaths, the happy tears, the dance floor after dark. We make films that keep all of it close.
          </p>
        </div>

        <div className="wedding-photo-grid">
          {STORY_PHOTOS.map((photo, index) => (
            <figure className={`wedding-photo-card wedding-photo-card-${index + 1}`} key={photo.src}>
              <div className="wedding-photo-image">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <span className="wedding-photo-number">0{index + 2}</span>
              </div>
              <figcaption>
                <span>{photo.label}</span>
                <span>{photo.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wedding-inquiry" aria-labelledby="wedding-inquiry-title">
        <p className="wedding-eyebrow"><span/> Your story, your way</p>
        <h2 id="wedding-inquiry-title">Let’s make something<br/><em>you’ll come back to.</em></h2>
        <a className="wedding-inquiry-link" href="#contact" onClick={goToContact}>
          Tell us about your day <span aria-hidden="true">↗</span>
        </a>
        <span className="wedding-inquiry-flower" aria-hidden="true">✳</span>
      </section>

      <footer className="wedding-page-footer">
        <span>PixelBloom Weddings</span>
        <span>Made for the moments that matter.</span>
      </footer>
    </main>
  )
}
