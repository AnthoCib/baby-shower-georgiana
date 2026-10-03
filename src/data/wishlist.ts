export type GiftStatus = 'Disponible' | 'Reservado' | 'Comprado'
export type GiftCategory = 'Esenciales' | 'Ropita' | 'Sueño y confort' | 'Juguetes' | 'Paseo'

export interface Gift {
  id: string
  name: string
  category: GiftCategory
  link: string
  status: GiftStatus
}

export const categories: GiftCategory[] = ['Esenciales', 'Ropita', 'Sueño y confort', 'Juguetes', 'Paseo']

const curatedGiftIds = new Set([
  'esencial-0', 'esencial-1',
  'ropa-0', 'ropa-1',
  'sueno-0', 'sueno-3',
  'juguete-0', 'juguete-2',
  'paseo-0',
])

// Edita esta lista para personalizar las ideas de regalo y sus enlaces.
export const wishlist: Gift[] = [
  ...['Pañales', 'Toallitas húmedas', 'Higiene', 'Muselinas', 'Baberos'].map((name, i) => ({ id: `esencial-${i}`, name, category: 'Esenciales' as const, link: '', status: 'Disponible' as const })),
  ...['Bodys', 'Pijamas', 'Ropa 3–6 meses', 'Ropa 6–9 meses', 'Medias', 'Gorritos'].map((name, i) => ({ id: `ropa-${i}`, name, category: 'Ropita' as const, link: '', status: 'Disponible' as const })),
  ...['Mantas', 'Cobijas', 'Toallas', 'Sábanas'].map((name, i) => ({ id: `sueno-${i}`, name, category: 'Sueño y confort' as const, link: '', status: 'Disponible' as const })),
  ...['Sonajeros', 'Juguetes sensoriales', 'Libros', 'Gimnasio de actividades', 'Peluches'].map((name, i) => ({ id: `juguete-${i}`, name, category: 'Juguetes' as const, link: '', status: 'Disponible' as const })),
  ...['Organizadores', 'Accesorios para coche', 'Bolsos'].map((name, i) => ({ id: `paseo-${i}`, name, category: 'Paseo' as const, link: '', status: 'Disponible' as const })),
].filter(gift => curatedGiftIds.has(gift.id))
