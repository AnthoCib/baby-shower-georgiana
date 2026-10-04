import { Flower2, Sparkles } from 'lucide-react'
import { event } from '../data/event'
import bunnySleep from '../assets/bunnies/bunny-sleep.png'

export function ClosingSection() {
  return <footer className="closing-section">
    <Sparkles className="closing-star star-left" aria-hidden="true" />
    <Flower2 className="closing-flower" aria-hidden="true" />
    <Sparkles className="closing-star star-right" aria-hidden="true" />
    <div className="closing-artwork">
      <span className="closing-moon" aria-hidden="true">☾</span>
      <span className="closing-cloud cloud-left" aria-hidden="true" />
      <span className="closing-cloud cloud-right" aria-hidden="true" />
      <img className="bunny-sleep" src={bunnySleep} alt="Conejita dormida rodeada de pequeñas flores en acuarela" loading="lazy" decoding="async" />
      <span className="closing-art-sparkle sparkle-left" aria-hidden="true">✧</span>
      <span className="closing-art-sparkle sparkle-right" aria-hidden="true">✦</span>
    </div>
    <p>Gracias por acompañarnos<br />en esta dulce espera.</p>
    <span className="closing-with-love">Con mucho cariño</span>
    <strong>{event.parents}</strong>
    <small>{event.dayLabel} · {event.monthLabel} · {event.yearLabel}</small>
  </footer>
}
