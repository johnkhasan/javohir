import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export function useMagneticEffect(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < rect.width * 1.8) {
        gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.3, ease: 'power2.out' })
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}
