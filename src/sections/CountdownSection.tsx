import { AnimatePresence, motion } from 'framer-motion'
import { useCountdown } from '../hooks/useCountdown'
import { event } from '../data/event'
import { Reveal } from '../components/Reveal'

export function CountdownSection() {
  const time = useCountdown(event.dateIso)
  const pairs = [
    [['DÍAS', time.days], ['HORAS', time.hours]],
    [['MIN', time.minutes], ['SEG', time.seconds]],
  ] as const
  const renderUnit = ([label, value]: readonly [string, number]) => <div className="countdown-unit" key={label}>
    <AnimatePresence mode="popLayout"><motion.span className="countdown-number" key={value} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: .25 }}>{String(value).padStart(label === 'DÍAS' ? 1 : 2, '0')}</motion.span></AnimatePresence>
    <span className="count-label">{label}</span>
  </div>
  return <section className="countdown-section" aria-label="Cuenta regresiva para el Baby Shower">
    <Reveal><p className="countdown-intro">Falta muy poquito</p>
      <div className="countdown-inline" role="timer" aria-live="off" aria-label={`${time.days} días, ${time.hours} horas, ${time.minutes} minutos y ${time.seconds} segundos`}>
        <div className="countdown-pair">{renderUnit(pairs[0][0])}<span className="countdown-separator" aria-hidden="true">·</span>{renderUnit(pairs[0][1])}</div>
        <span className="countdown-separator countdown-group-separator" aria-hidden="true">·</span>
        <div className="countdown-pair">{renderUnit(pairs[1][0])}<span className="countdown-separator" aria-hidden="true">·</span>{renderUnit(pairs[1][1])}</div>
      </div>
    </Reveal>
  </section>
}
