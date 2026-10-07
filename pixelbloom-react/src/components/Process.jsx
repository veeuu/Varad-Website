import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircularGallery from './CircularGallery'
import { processSteps } from '../data'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const stepsRef   = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(headerRef.current,
      { opacity:0, y:40 },
      { opacity:1, y:0, duration:0.8, ease:'power3.out',
        scrollTrigger:{ trigger:headerRef.current, start:'top 85%', once:true } })

      if (stepsRef.current) {
        gsap.fromTo(stepsRef.current,
        { opacity:0, y:48 },
        { opacity:1, y:0, duration:0.7, ease:'power3.out',
          scrollTrigger:{ trigger:stepsRef.current, start:'top 78%', once:true } })
      }
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef}>
      <div className="wrap">
        <div ref={headerRef} className="process-gallery-header">
          <div>
            <p className="label process-header-label"><span className="rule"/>How we work</p>
            <h2 className="display-md process-title" style={{ marginTop:18 }}>
              Our creative <em className="accent-cr">process</em>
            </h2>
          </div>
          <p className="process-subtitle">
            Four clear steps from brief to delivery — no fluff, no back-and-forths, just clean creative execution every time.
          </p>
        </div>

        <div ref={stepsRef} className="process-gallery">
          <CircularGallery
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            font='bold 10px "DM Sans", sans-serif'
            scrollSpeed={2}
            items={processSteps.map((step, index) => ({
              ...step,
              image: [
                'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
              ][index],
            }))}
          />
        </div>
      </div>
    </section>
  )
}
