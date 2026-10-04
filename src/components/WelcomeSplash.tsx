import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Flower2, Sparkles, Star } from 'lucide-react'
import { event } from '../data/event'
import bunny from '../assets/bunnies/bunny-hero.png'

type WelcomeSplashProps = { onEnter: () => Promise<void>; onDismiss: () => void }

export function WelcomeSplash({ onEnter, onDismiss }: WelcomeSplashProps) {
  const [opening, setOpening] = useState(false)
  const [closing, setClosing] = useState(false)
  const reduceMotion = useReducedMotion()
  const duration = reduceMotion ? 0 : 0.85

  const enter = () => {
    if (opening || closing) return
    void onEnter()
    setOpening(true)
    window.setTimeout(() => setClosing(true), reduceMotion ? 0 : 1050)
  }

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {!closing && <motion.section
        className="welcome-splash"
        role="dialog"
        aria-modal="true"
        aria-label="Sobre de invitación del Baby Shower"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration, ease: 'easeInOut' }}
        onKeyDown={event => { if (event.key === 'Tab') { event.preventDefault(); document.querySelector<HTMLButtonElement>('.welcome-button')?.focus() } }}
      >
        <motion.div className="welcome-sparkle sparkle-one" initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .35, duration: .8 }}><Star aria-hidden="true" /></motion.div>
        <motion.div className="welcome-sparkle sparkle-two" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .8 }}><Sparkles aria-hidden="true" /></motion.div>
        <motion.div className="welcome-flower flower-one" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .9 }}><Flower2 aria-hidden="true" /></motion.div>
        <motion.div className="welcome-flower flower-two" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .5, duration: .9 }}><Flower2 aria-hidden="true" /></motion.div>

        <motion.div className="splash-scene" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .8, ease: [.2, .7, .2, 1] }}>
          <div className="envelope-shell">
            <div className="envelope envelope-back" aria-hidden="true" />
            <motion.div
              className="envelope-letter"
              aria-hidden={!opening}
              initial={false}
              animate={opening ? { y: -35, opacity: 1 } : { y: 42, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : .72, delay: opening && !reduceMotion ? .16 : 0, ease: [.2, .75, .25, 1] }}
            >
              <span className="welcome-eyebrow">UNA DULCE ESPERA</span>
              <h1 id="welcome-title">Baby Shower</h1>
              <span className="welcome-name">{event.babyName}</span>
              <img className="welcome-bunny" src={bunny} alt="Conejita en acuarela" />
              <p className="welcome-date">{event.dateLabel}</p>
            </motion.div>
            <div className="envelope-folds" aria-hidden="true" />
            <div className="envelope-front" aria-hidden="true" />
            <motion.div
              className="envelope-flap"
              aria-hidden="true"
              animate={opening ? { rotateX: -168 } : { rotateX: 0 }}
              transition={{ duration: reduceMotion ? 0 : .72, ease: [.35, .05, .2, 1] }}
            >
              <svg className="envelope-flap-mark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d="M 1 1 L 50 76 L 99 1" />
              </svg>
              <span className="envelope-seal"><Flower2 /></span>
            </motion.div>
          </div>
          <motion.button
            className="welcome-button"
            type="button"
            onClick={enter}
            whileTap={reduceMotion ? undefined : { scale: .97 }}
            animate={opening ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : .22 }}
          >Abrir invitación</motion.button>
        </motion.div>
      </motion.section>}
    </AnimatePresence>
  )
}
