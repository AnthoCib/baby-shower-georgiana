import { CalendarDays, Flower2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { event } from '../data/event'

export function DateSection() {
  return <section className="date-section date-editorial" id="fecha">
    <Reveal className="date-content date-card">
      <Flower2 className="date-ornament" aria-hidden="true" />
      <SectionLabel>RESERVA LA FECHA</SectionLabel>
      <div className="date-lockup">
        <div className="date-day">{event.dayLabel}</div>
        <div className="date-month"><span className="date-month-name">{event.monthLabel}</span><span className="date-year">{event.yearLabel}</span></div>
      </div>
      <div className="date-divider"><span /><CalendarDays size={17} strokeWidth={1.3} /><span /></div>
      <p className="date-time">{event.timeLabel}</p>
      <p className="date-note">Una tarde para celebrar<br />un amor que ya sentimos tanto.</p>
    </Reveal>
  </section>
}
