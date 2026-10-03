# Plan de implementación

## Análisis y decisiones

El directorio de trabajo está vacío; se creará una aplicación nueva con React, TypeScript y Vite. La experiencia será una historia vertical mobile first, con paleta lila, lavanda, rosa empolvado y crema, tipografías serif/sans/script, espacios amplios e ilustraciones reemplazables. Los datos del evento y los regalos vivirán en archivos dedicados. Los assets ilustrados solicitados se dejarán como placeholders identificables, sin dibujar imágenes falsas en código.

## Estructura

```text
src/
  animations/       # variantes/reduced motion y parallax GSAP
  assets/           # placeholders para ilustraciones
  components/       # piezas compartidas: Reveal, decoraciones, botones
  data/             # event.ts y wishlist.ts
  hooks/            # countdown y preferencias de movimiento
  sections/         # intro, hero, mensaje, fecha, wishlist, ubicación, RSVP, cierre
  styles/           # estilos globales, tokens y fuentes
  App.tsx
  main.tsx
```

## Componentes y datos

- `App`: composición de la historia completa y metadatos del documento.
- Secciones: `IntroSection`, `HeroSection`, `MessageSection`, `DateSection`, `CountdownSection`, `WishlistSection`, `LocationSection`, `RsvpSection`, `ClosingSection`.
- Compartidos: `Reveal`, `SectionEyebrow`, `FloralPlaceholder`, `CountdownUnit`, `GiftCard`.
- `src/data/event.ts`: nombre de bebé y padres, fecha ISO y zona horaria, dirección, `googleMapsUrl`, `whatsappNumber`, título/description/favIcon.
- `src/data/wishlist.ts`: catálogo por categoría con imagen, nombre, categoría, enlace y estado; las tarjetas se filtran desde esos datos.

## Fases y control

1. **FASE 0 — Setup:** Vite, React, TypeScript, Tailwind, Framer Motion, GSAP, Lucide; build.
2. **FASE 1 — Design system:** tokens, tipografía y estilos base; build.
3. **FASE 2 — Intro + Hero:** primera impresión y assets placeholder; build.
4. **FASE 3 — Save the Date + Countdown:** fecha y reloj America/Lima; build.
5. **FASE 4 — Wishlist:** categorías, filtros y tarjetas; build.
6. **FASE 5 — Ubicación + WhatsApp:** enlaces configurables y RSVP; build.
7. **FASE 6 — Animaciones avanzadas:** reveals y parallax GSAP sutil; build.
8. **FASE 7 — Responsive:** revisión de anchos móvil, tablet y escritorio; build.
9. **FASE 8 — Accesibilidad:** reduced motion, semántica, foco y contraste; build.
10. **FASE 9 — Performance:** carga diferida, assets y metadatos; build.
11. **FASE 10 — QA final:** build final y revisión de diff/errores.

Cada fase se registra aquí después de pasar `npm run build`; no se avanza si el build falla.

## Registro

- Inicial: inspección realizada; directorio vacío.
- FASE 0 completada: scaffolding React/TypeScript/Vite, Tailwind v4, Framer Motion, GSAP y Lucide. `npm install` y `npm run build` correctos.
- FASE 1 completada: tokens de color/tipografía, fuentes serif/sans/script y base responsive en `styles/global.css`; datos configurables iniciales en `data/event.ts` y `data/wishlist.ts`. Build correcto.
- FASE 2 completada: intro con fade escalonado e indicador de scroll, hero editorial y placeholder de arte para conejita. Build correcto.
- FASE 3 completada: mensaje emocional, Save the Date y cuenta regresiva viva hacia la fecha ISO con el offset de Lima (-05:00). Build correcto.
- FASE 4 completada: wishlist configurable con las cinco categorías, filtros animados, estado de cada regalo e imágenes placeholder. Build correcto.
- FASE 5 completada: ubicación con búsqueda de Google Maps por dirección y RSVP con mensaje codificado para WhatsApp. Build correcto.
- FASE 6 completada: reveals Framer Motion, flotación suave y parallax GSAP/ScrollTrigger limitado al hero. Build correcto.
- FASE 7 completada: reglas mobile first, ajuste para anchos menores a 360px y composición amplia desde tablet/escritorio. Build correcto.
- FASE 8 completada: movimiento reducido, foco visible, filtros accesibles y semántica descriptiva. Build correcto.
- FASE 9 completada: title, description, Open Graph y favicon configurables desde `event.ts`; fuentes limitadas a subsets latinos para reducir CSS. Imágenes diferidas en wishlist. Build correcto.
- FASE 10 completada: QA final de TypeScript y bundle de producción; `npm run build` final correcto. Se documentaron los assets de ilustración que quedan listos para reemplazo en `public/assets/README.md`.

### Estado de personalización

Los datos personales y de contacto se leen desde `src/data/event.ts`; los articulos, estados y enlaces de regalo se mantienen en `src/data/wishlist.ts`. En la iteracion incremental se preservaron tal como estaban al iniciar el trabajo.

## Iteracion incremental de assets visuales

- Se inspeccionaron antes de editar `event.ts`, `wishlist.ts` y sus componentes consumidores. Se conservaron nombre de la bebe, padres, fecha, hora, direccion, Maps, WhatsApp, textos, articulos, estados y enlaces existentes.
- Se integraron localmente tres ilustraciones originales de conejitas en `src/assets/bunnies/` para hero, mensaje y cierre. Las transparencias se conservaron y las dimensiones se redujeron para web.
- Se agregaron cinco ilustraciones de categoria en `src/assets/wishlist/`. `wishlist.ts` aporta `image` e `imageAlt` a cada regalo segun su categoria, sin modificar los nombres, estados ni enlaces guardados.
- `WishlistSection` y las secciones de hero, mensaje y cierre ahora usan las ilustraciones con carga diferida donde corresponde y texto alternativo.
- Las imagenes externas halladas durante la busqueda no tenian una licencia de descarga verificable; se usaron ilustraciones originales locales, sin hotlinking.
- `npm install` termino sin nuevas dependencias ni vulnerabilidades. El primer build se corrigio agregando `src/vite-env.d.ts` para los tipos de assets de Vite; el build final paso.
- Las ilustraciones locales suman aproximadamente 2.5 MB: bunny PNG con transparencia redimensionados y cinco miniaturas JPG de 720 px (aprox. 350 KB en total).
- La verificacion visual en navegador no pudo completarse: la sesion no expuso navegadores ni la superficie `iab`. Se revisaron los tamanos/encuadres en CSS y el build de produccion paso.

## Iteracion FASE 7 — responsive integral

- Se ajustaron las composiciones de hero y ubicacion para aprovechar columnas en pantallas amplias, manteniendo textos y configuraciones existentes.
- Se aplicaron escalas fluidas con `clamp()`, max-widths editoriales, grids por rango de espacio disponible y controles táctiles de al menos 44 px.
- Countdown: 2x2 en pantallas menores de 600 px y cuatro columnas desde tablet. Wishlist: 1 columna móvil, 2 tablet, 3 escritorio y 4 desde 1600 px.
- Se redujeron decoraciones y amplitud de movimiento en móvil; GSAP adapta el parallax por tamaño y Framer Motion reduce el desplazamiento de entrada.
- Se añadió una suite Playwright (`npm run test:responsive`) que valida los 15 anchos solicitados: overflow, elementos fuera de viewport, textos cortados, carga/alt de imágenes, objetivos táctiles y columnas. Recorre secciones para capturar también los reveals.
- Verificación visual de capturas realizada en 320, 1024 y 1920 px; la jerarquía, ilustraciones y rejilla de wishlist se mantienen proporcionadas. Suite: 15/15 aprobada. `npm run build`: correcto.
- Se preservaron sin cambios `src/data/event.ts` y `src/data/wishlist.ts`.

## IteraciÃ³n: wishlist curada y portada equilibrada

- Wishlist reducida a 9 elementos existentes, con distribuciÃ³n 2 Esenciales, 2 Ropita, 2 SueÃ±o y confort, 2 Juguetes y 1 Paseo. Se filtran elementos del mismo catÃ¡logo; los nombres, estados y enlaces individuales seleccionados se conservan.
- Se buscaron referencias Pexels e integraron localmente en `src/assets/wishlist/` fotografÃ­as de paÃ±ales en canasta, ropa neutra, manta en canasta y juguetes de madera. Sus autores y fuentes quedan registrados en `src/assets/wishlist/SOURCES.md`. Paseo conserva la ilustraciÃ³n de acuarela local.
- Las tarjetas de wishlist ahora presentan la referencia en una imagen panorÃ¡mica 1.8:1; layout de 1 columna mÃ³vil, 2 tablet y un mÃ¡ximo de 3 en escritorio. Se mantienen los filtros y animaciones.
- Hero: portada apilada, centrada y mÃ¡s compacta en mÃ³vil; split equilibrado a partir de 768 px; textos y conejita centrados verticalmente, marco oval reposicionado y max-widths responsivos.
- Se ampliaron las comprobaciones Playwright para validar 9 regalos, su distribuciÃ³n por categorÃ­a, la proporciÃ³n de imÃ¡genes, alineaciÃ³n del hero y rejillas responsive en los anchos definidos. `npm install` sin cambios pendientes ni vulnerabilidades; suite: 15/15 aprobada; `npm run build`: correcto.
- `src/data/event.ts` se mantuvo intacto; la reducciÃ³n de wishlist filtrÃ³ objetos existentes conservando nombres, enlaces y estados de cada regalo seleccionado.

## FASE 11 - Auditoria visual y refinamiento

- Revision de las nueve secciones y capturas responsive existentes. Se compactaron bienvenida, mensaje, fecha, ubicacion y RSVP para dar continuidad al recorrido.
- Hero centrado como composicion unica en movil, tablet y escritorio: titulo y nombre agrupados con la ilustracion, ovalo centrado y conejita con mejor proporcion.
- Wishlist conserva los nueve regalos, filtros y estados. Cada articulo usa un recorte fotografico distinto; se refinaron la proporcion editorial y los indicadores de disponibilidad, reserva y compra.
- Transiciones suaves para wishlist y flotacion leve para la ilustracion secundaria. Se conservan `prefers-reduced-motion` y el parallax existente.
- Fondos crema y lavanda con gradientes organicos. Datos confirmados del evento y nombres, estados y enlaces de regalos preservados.
- Validacion: `npm run build` correcto; vistas responsive 9/9 aprobadas, sin overflow, texto truncado ni controles pequenos.