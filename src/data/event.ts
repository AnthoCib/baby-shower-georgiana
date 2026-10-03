const eventDateIso = '2026-10-24T16:00:00-05:00'
const eventTimeZone = 'America/Lima'
const eventDate = new Date(eventDateIso)
const dateParts = new Intl.DateTimeFormat('es-PE', {
  timeZone: eventTimeZone, day: '2-digit', month: 'long', year: 'numeric',
}).formatToParts(eventDate)
const part = (type: Intl.DateTimeFormatPartTypes) => dateParts.find(item => item.type === type)?.value ?? ''

export const event = {
  babyName: 'Giorgianna Valentina',
  parents: 'Gloria & Anthony',
  eventName: 'Baby Shower',
  dateIso: eventDateIso,
  timeZone: eventTimeZone,
  dayLabel: part('day'),
  monthLabel: part('month').toLocaleUpperCase('es-PE'),
  yearLabel: part('year'),
  dateLabel: `${part('day')} de ${part('month')} de ${part('year')}`,
  timeLabel: '4:00 p. m.',
  address: ['Mz. G1, Lt. 4', 'Calle San Vicente de Paul', 'Santa Rosa, Lima, Perú'],
  googleMapsUrl: 'https://maps.app.goo.gl/ASbF2RzKxkUdiv3z8',
  whatsappNumber: '+51965399523',
  title: `Baby Shower | ${part('day')} de ${part('month')} de ${part('year')}`,
  description: 'Acompáñanos a celebrar la dulce espera de nuestra pequeña.',
  favicon: '/favicon.svg',
} as const
