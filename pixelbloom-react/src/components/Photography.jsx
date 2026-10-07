import './Photography.css'
import RefineFrame from './RefineFrame'
import ShreeMark from './ShreeMark'

const PHOTOGRAPHY_IMAGES = [
  { src: `${import.meta.env.BASE_URL}assets/images/weddings/dsc09811.jpg`, alt: 'Wedding event photography' },
  { src: `${import.meta.env.BASE_URL}assets/images/weddings/dsc00507.jpg`, alt: 'Candid event moment' },
  { src: `${import.meta.env.BASE_URL}assets/images/concepts/studio-wide.png`, alt: 'Behind the scenes in the studio' },
  { src: `${import.meta.env.BASE_URL}assets/images/bmw/front.png`, alt: 'Automotive product photography' },
  { src: `${import.meta.env.BASE_URL}assets/images/weddings/dsc09907.jpg`, alt: 'Celebration captured in a still' },
  { src: `${import.meta.env.BASE_URL}assets/images/bmw/upper-1.png`, alt: 'Product detail photography' },
]

export default function Photography({ onBack }) {
  return (
    <main className="photography-page">
      <header className="photography-nav">
        <div className="photography-shree"><ShreeMark /></div>
        <a
          className="photography-brand"
          href="#"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          <span className="photography-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="photography-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="photography-hero" aria-labelledby="photography-title">
        <RefineFrame images={PHOTOGRAPHY_IMAGES} className="photography-background"/>

        <div className="photography-content">
          <p className="photography-eyebrow"><span/> Photography <span/></p>
          <h1 id="photography-title">
            Life, in<br />
            <em>the frame.</em>
          </h1>
          <p className="photography-description">
            Event stills, behind-the-scenes documentation, and product photography. Capturing moments that live beyond the reel.
          </p>

          <div className="photography-services" aria-label="Photography services">
            <span>Event stills</span>
            <span>Behind the scenes</span>
            <span>Product photography</span>
          </div>

          <div className="photography-actions">
            <a className="btn photography-cta" href="#contact">
              Let’s capture your story <span aria-hidden="true">↗</span>
            </a>
            <a
              className="photography-work-link"
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
      </section>
    </main>
  )
}
