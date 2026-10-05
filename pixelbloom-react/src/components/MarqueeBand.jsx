import { useRef } from 'react'
import { marqueeItems } from '../data'

export default function MarqueeBand() {
  const doubled = [...marqueeItems, ...marqueeItems]
  const r1 = useRef(null)
  const r2 = useRef(null)

  const pause  = r => () => { if (r.current) r.current.style.animationPlayState = 'paused' }
  const resume = r => () => { if (r.current) r.current.style.animationPlayState = 'running' }

  return (
    <div className="marquee-band">
      <div className="marquee-row">
        <div ref={r1} className="marquee-inner"
          style={{ animation:'marquee 26s linear infinite' }}
          onMouseEnter={pause(r1)} onMouseLeave={resume(r1)}>
          {doubled.map((item, i) => (
            <div key={i} className="mitem">
              <span className="mdot"/>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
