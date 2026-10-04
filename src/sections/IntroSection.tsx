import { motion, useReducedMotion } from 'framer-motion'
import { Flower2, Sparkles } from 'lucide-react'

export function IntroSection() {
  const reduce = useReducedMotion()
  const fade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }
  return <section className="intro" aria-label="Bienvenida">
    <div className="intro-glow" />
    <Flower2 className="intro-flower flower-a" aria-hidden="true" /><Sparkles className="intro-star star-a" aria-hidden="true" />
    <motion.div className="intro-copy" initial="hidden" animate="show" transition={{ staggerChildren: reduce ? 0 : 0.22 }}>
      <motion.p variants={fade} transition={{ duration: 1.1 }}>Hay momentos que se convierten en recuerdos para toda la vida…</motion.p>
      <motion.span className="intro-rule" variants={fade} transition={{ duration: 1 }} />
      <motion.p variants={fade} transition={{ duration: 1.1 }}>Y queremos compartir uno de ellos contigo.</motion.p>
    </motion.div>
    <span className="scroll-cue" aria-hidden="true">Una historia para celebrar</span>
  </section>
}
