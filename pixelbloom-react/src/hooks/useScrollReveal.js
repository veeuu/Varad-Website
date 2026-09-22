import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' })

    ref.current?.querySelectorAll('.sr').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return ref
}
