import { Flower2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { event } from '../data/event'

export function DateSection() {
  return <section className="date-section date-editorial" id="fecha">
    <Reveal className="date-content date-card">
      <Flower2 className="date-ornament" aria-hidden="true" />
      <SectionLabel>RESERVA LA FECHA</SectionLabel>
      <div className="date-meta">
        <span className="date-main">
          <span className="date-day">{event.dayLabel}</span>
          <span className="date-month-name">{event.monthLabel}</span>
          <span className="date-year">{event.yearLabel}</span>
        </span>
        <span className="date-separator" aria-hidden="true">·</span>
        <span className="date-time">{event.timeLabel}</span>
      </div>
      <p className="date-note">Una tarde para celebrar<br />un amor que ya sentimos tanto.</p>
    </Reveal>
  </section>
}
