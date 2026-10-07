import { useEffect, useState } from 'react'
import './RefineFrame.css'

export default function RefineFrame({ images, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (images.length < 2) return undefined
    const interval = window.setInterval(() => {
      setLoaded(false)
      setStage(0)
      setActiveIndex(index => (index + 1) % images.length)
    }, 8000)
    return () => window.clearInterval(interval)
  }, [images.length])

  const activeImage = images[activeIndex]

  useEffect(() => {
    if (!loaded) return undefined
    const timers = [
      window.setTimeout(() => setStage(1), 450),
      window.setTimeout(() => setStage(2), 1100),
      window.setTimeout(() => setStage(3), 1750),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [activeImage.src, loaded])

  return (
    <div
      className={`refine-frame${className ? ` ${className}` : ''}`}
      data-stage={stage}
      aria-hidden="true"
    >
      <img
        key={activeImage.src}
        className="refine-frame__media"
        src={activeImage.src}
        alt=""
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      {(stage === 1 || stage === 2) && (
        <div key={stage} className="refine-frame__sweep" aria-hidden="true"/>
      )}
      <div className="refine-frame__shade"/>
    </div>
  )
}
