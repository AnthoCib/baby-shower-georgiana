import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export function useStoryParallax() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const media = gsap.matchMedia()
    media.add({ mobile: '(max-width: 599px)', larger: '(min-width: 600px)' }, (context) => {
      const { mobile } = context.conditions as { mobile: boolean; larger: boolean }
      gsap.to('.bunny-hero', {
        yPercent: mobile ? 4 : 12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: mobile ? 1.2 : 0.8 },
      })
    })
    return () => media.revert()
  }, [reduce])
}
