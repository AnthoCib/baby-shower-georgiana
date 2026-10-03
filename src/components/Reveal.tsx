import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  const mobileOffset = typeof window !== 'undefined' && window.matchMedia('(max-width: 599px)').matches ? 14 : 24
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: mobileOffset }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: reduce ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function FloralPlaceholder({ label, className = '' }: { label: string; className?: string }) {
  return <div className={`art-placeholder ${className}`} role="img" aria-label={label}><span className="art-sparkle">✳</span><span>{label}</span><small>Ilustración por añadir</small></div>
}
