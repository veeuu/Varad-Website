import './Vfx3D.css'
import ModelViewer from './ModelViewer'
import ShreeMark from './ShreeMark'

export default function Vfx3D({ onBack }) {
  return (
    <main className="vfx-page">
      <header className="vfx-nav">
        <div className="vfx-shree"><ShreeMark /></div>
        <a
          className="vfx-brand"
          href="#"
          onClick={event => {
            event.preventDefault()
            onBack()
          }}
        >
          <span className="vfx-brand-mark" aria-hidden="true"><i/><i/></span>
          <span>PixelBloom</span>
        </a>
        <button className="vfx-back" type="button" onClick={onBack}>
          <span aria-hidden="true">←</span> Back to studio
        </button>
      </header>

      <section className="vfx-hero" aria-labelledby="vfx-title">
        <div className="vfx-copy">
          <p className="vfx-eyebrow"><span/> VFX &amp; 3D <span/></p>
          <h1 id="vfx-title">
            Give your<br />
            ideas <em>another</em><br />
            dimension.
          </h1>
          <p className="vfx-description">
            Blender renders, motion graphics and visual effects that add dimension and magic to your content. Concept to completion, in-house.
          </p>

          <div className="vfx-services" aria-label="VFX and 3D services">
            <span>Blender</span>
            <span>Motion GFX</span>
            <span>3D Renders</span>
          </div>

          <div className="vfx-actions">
            <a className="btn vfx-cta" href="#contact">
              Build something unreal <span aria-hidden="true">↗</span>
            </a>
            <a
              className="vfx-work-link"
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

        <div className="vfx-visual" aria-label="Interactive 3D model">
          <ModelViewer
            url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
            width={560}
            height={560}
            modelXOffset={1.2}
            modelYOffset={0}
            mobileModelXOffset={0.5}
            mobileModelYOffset={0.7}
            mobileModelScale={4}
            enableMouseParallax
            enableHoverRotation
            environmentPreset="forest"
            fadeIn={false}
            autoRotate={false}
            autoRotateSpeed={0.35}
          />
        </div>
      </section>
    </main>
  )
}
