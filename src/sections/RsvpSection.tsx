import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import { event } from '../data/event'

const message = `Hola, confirmo mi asistencia al Baby Shower del ${event.dateLabel}.`
const phone = event.whatsappNumber.replace(/\D/g, '')
const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

export function RsvpSection() {
  return <section className="rsvp-section" id="rsvp">
    <Reveal className="rsvp-content"><MessageCircle className="rsvp-icon" size={22} strokeWidth={1.2} />
      <SectionLabel>QUEREMOS CONTAR CONTIGO</SectionLabel>
      <h2>¿Nos <em>acompañas?</em></h2>
      <p>Nos encantará compartir este momento contigo.</p>
      <a className="solid-button" href={whatsappHref} target="_blank" rel="noreferrer">Confirmar asistencia <ArrowUpRight size={16} /></a>
    </Reveal>
  </section>
}
