import { motion, useReducedMotion } from 'framer-motion'
import { Flower2 } from 'lucide-react'
import { wishlist } from '../data/wishlist'
import { Reveal } from '../components/Reveal'
import { SectionLabel } from '../components/SectionLabel'

export function WishlistSection() {
  const reduceMotion = useReducedMotion()

  return <section className="wishlist-section wishlist-letter" id="wishlist">
    <Reveal className="wishlist-heading">
      <SectionLabel>{'CON MUCHO CARI\u00d1O'}</SectionLabel>
      <h2>Wishlist</h2>
      <p>
        Tu presencia es nuestro regalo favorito,<br className="wishlist-copy-break" />
        pero si deseas tener un detalle con nuestra {'peque\u00f1a,'}<br className="wishlist-copy-break" />
        {'aqu\u00ed te dejamos algunas ideas con mucho cari\u00f1o.'}
      </p>
    </Reveal>

    <div className="wishlist-paper">
      <Flower2 className="wishlist-paper-flower paper-flower-top" aria-hidden="true" />
      <Flower2 className="wishlist-paper-flower paper-flower-bottom" aria-hidden="true" />
      <motion.ul
        className="wishlist-list"
        aria-label="Ideas de regalo"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055 } } }}
      >
        {wishlist.map(gift => <motion.li
          className="wishlist-item"
          key={gift.id}
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="wishlist-bullet" aria-hidden="true">✧</span>
          <span className="wishlist-name">{gift.name}</span>
        </motion.li>)}
      </motion.ul>
    </div>
  </section>
}
