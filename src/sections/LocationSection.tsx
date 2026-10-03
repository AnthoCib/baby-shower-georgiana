import { ArrowUpRight, MapPin } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { event } from '../data/event'

const addressQuery = encodeURIComponent(event.address.join(', '))
const mapsHref = event.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${addressQuery}` 
export function LocationSection() {
  return <section className="location-section" id="ubicacion">
    <Reveal className="location-content"><MapPin className="location-icon" size={23} strokeWidth={1.2} />
      <SectionLabel>GUARDA ESTE LUGAR</SectionLabel>
      <h2>Nos vemos <em>aquí</em></h2>
      <address>{event.address.map(line => <span key={line}>{line}</span>)}</address>
      <a className="outline-button" href={mapsHref} target="_blank" rel="noreferrer">Ver ubicación en Google Maps <ArrowUpRight size={15} /></a>
    </Reveal>
    <div className="location-ornament" aria-hidden="true">✿</div>
  </section>
}
