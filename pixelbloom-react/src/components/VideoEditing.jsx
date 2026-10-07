import { useState } from 'react'
import './VideoEditing.css'
import Ballpit from './Ballpit'
import DomeGallery from './DomeGallery'
import ShreeMark from './ShreeMark'

export default function VideoEditing({ onBack }) {
  const [galleryVisible, setGalleryVisible] = useState(false)

  return (
    <main className="video-editing-page">
      <header className="video-editing-nav">
        <div className="video-editing-shree"><ShreeMark /></div>
        <a
          className="video-editing-brand"
          href="#"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          <span className="video-editing-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="video-editing-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section
        className={`video-editing-hero${galleryVisible ? ' video-editing-hero--gallery' : ''}`}
        aria-labelledby="video-editing-title"
      >
        {galleryVisible ? (
          <DomeGallery
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale
            className="video-editing-gallery"
          />
        ) : (
          <Ballpit
            className="video-editing-ballpit"
            count={100}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
            onComplete={() => setGalleryVisible(true)}
          />
        )}
        <div className="video-editing-shade" aria-hidden="true"/>

        <div className="video-editing-content">
          <p className="video-editing-eyebrow"><span/> Video Editing <span/></p>
          <h1 id="video-editing-title">
            Every frame,<br />
            <em>finds its flow.</em>
          </h1>
          <p className="video-editing-description">
            From raw footage to a polished final cut. We edit for YouTube, Instagram, brand films and everything in between.
          </p>

          <div className="video-editing-services" aria-label="Video editing services">
            <span>YouTube</span>
            <span>Instagram</span>
            <span>Brand films</span>
          </div>

          <div className="video-editing-actions">
            <a className="btn video-editing-cta" href="#contact">
              Let’s shape your story <span aria-hidden="true">↗</span>
            </a>
            <a
              className="video-editing-work-link"
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
