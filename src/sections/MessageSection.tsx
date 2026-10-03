import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'
import bunnyAccent from '../assets/bunnies/bunny-accent.png'

export function MessageSection() {
  return <section className="message-section">
    <Reveal className="message-content">
      <span className="message-flower" aria-hidden="true">✿</span>
      <SectionLabel>CON TODO NUESTRO AMOR</SectionLabel>
      <h2>Cada día falta un poquito menos <em>para conocerte.</em></h2>
      <img className="bunny-accent" src={bunnyAccent} alt="Conejita sentada entre flores en tonos suaves" loading="lazy" decoding="async" />
      <p>Queremos compartir contigo la alegría de esta dulce espera y celebrar juntos la llegada de nuestra pequeña.</p>
      <span className="message-flower lower" aria-hidden="true">✿</span>
    </Reveal>
  </section>
}
