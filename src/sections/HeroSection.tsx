import { Flower2, Sparkles } from 'lucide-react'
import { event } from '../data/event'
import { SectionLabel } from '../components/SectionLabel'
import bunnyHero from '../assets/bunnies/bunny-hero.png'

export function HeroSection() {
  return (
    <section className="hero section-wrap" id="hero">
      <Flower2
        className="decor-flower hero-flower"
        aria-hidden="true"
      />

      <Sparkles
        className="decor-star hero-star"
        aria-hidden="true"
      />

      <div className="hero-container">

        <div className="hero-copy">
          <SectionLabel>UNA DULCE ESPERA</SectionLabel>

          <h1 className="hero-title">
            Baby <em>Shower</em>
          </h1>

          <p className="hero-subtitle">
            Una pequeña princesa
            <br />
            está por llegar
          </p>

          <p className="baby-name">
            {event.babyName}
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-oval" aria-hidden="true" />

          <div className="bunny-stage">
            <img
              src={bunnyHero}
              alt="Conejita bebé en acuarela con flores lavanda y rosa"
              className="bunny-image"
              fetchPriority="high"
            />
          </div>
        </div>

        <p className="hero-footnote">
          Con ilusión, contamos los días para conocerte
        </p>

      </div>
    </section>
  )
}
