import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { event } from '../data/event'
import { Reveal } from '../components/Reveal'

export function CountdownSection() {
  const time = useCountdown(event.dateIso)
  return <section className="countdown-section" aria-label="Cuenta regresiva para el Baby Shower">
    <Reveal><p className="countdown-intro">Falta muy poquito</p>
      <div className="countdown-grid">{Object.entries({ DÍAS: time.days, HORAS: time.hours, MINUTOS: time.minutes, SEGUNDOS: time.seconds }).map(([label, value]) =>
        <div className="countdown-unit" key={label}><div className="count-number-wrap"><AnimatePresence mode="popLayout"><motion.span key={value} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}>{String(value).padStart(label === 'DÍAS' ? 1 : 2, '0')}</motion.span></AnimatePresence></div><span className="count-label">{label}</span></div>
      )}</div>
    </Reveal>
  </section>
}
