import { expect, test } from '@playwright/test'

const widths = [320, 360, 375, 390, 412, 430, 600, 768, 820, 1024, 1280, 1366, 1440, 1600, 1920]

for (const width of widths) {
  test(`la invitacion se adapta a ${width}px`, async ({ page }, testInfo) => {
    const height = width < 600 ? 844 : width < 1024 ? 1024 : 1000
    await page.setViewportSize({ width, height })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)

    await page.locator('img').evaluateAll(images => {
      for (const image of images) (image as HTMLImageElement).loading = 'eager'
    })
    await page.locator('.closing-section').scrollIntoViewIfNeeded()
    await page.evaluate(async () => {
      await Promise.all(Array.from(document.images, image => image.decode().catch(() => undefined)))
      window.scrollTo(0, 0)
    })

    const layout = await page.evaluate(() => {
      const width = document.documentElement.clientWidth
      const selectors = ['img', 'h1', 'h2', 'h3', '.wishlist-item', '.wishlist-name', '.wishlist-action', '.outline-button', '.solid-button', '.section-label']
      const outOfBounds = selectors.flatMap(selector => Array.from(document.querySelectorAll<HTMLElement>(selector)))
        .filter(element => {
          const rect = element.getBoundingClientRect()
          return rect.width > 0 && (rect.left < -1 || rect.right > width + 1)
        }).map(element => ({ tag: element.tagName, className: element.className.toString(), text: element.textContent?.trim().slice(0, 40) }))
      const clippedText = Array.from(document.querySelectorAll<HTMLElement>('h1, h2, h3, .wishlist-name, .wishlist-action, .section-label, .outline-button, .solid-button'))
        .filter(element => element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 2)
        .map(element => ({ tag: element.tagName, className: element.className.toString(), text: element.textContent?.trim().slice(0, 40) }))
      const imageState = Array.from(document.images).map(image => ({ alt: image.alt, loaded: image.complete && image.naturalWidth > 0 }))
      const countColumns = getComputedStyle(document.querySelector('.countdown-grid')!).gridTemplateColumns.split(' ').length
      const wishColumns = getComputedStyle(document.querySelector('.wishlist-list')!).gridTemplateColumns.split(' ').length
      const giftCount = document.querySelectorAll('.wishlist-item').length
      const wishlistImages = document.querySelectorAll('.wishlist-list img').length
      const visibleCategories = document.querySelectorAll('.wishlist-list .gift-category').length
      const heroCopy = document.querySelector('.hero-copy')!.getBoundingClientRect()
      const heroIllustration = document.querySelector('.hero-visual')!.getBoundingClientRect()
      const heroCenterDelta = Math.abs((heroCopy.left + heroCopy.width / 2) - (heroIllustration.left + heroIllustration.width / 2))
      const linksUnder44 = Array.from(document.querySelectorAll<HTMLElement>('.outline-button, .solid-button, .wishlist-action[href]'))
        .filter(link => link.getBoundingClientRect().height < 44).map(link => link.textContent?.trim())
      return { width, scrollWidth: document.documentElement.scrollWidth, outOfBounds, clippedText, imageState, countColumns, wishColumns, giftCount, wishlistImages, visibleCategories, heroCenterDelta, linksUnder44 }
    })

    expect(layout.scrollWidth, `overflow horizontal en ${width}px`).toBeLessThanOrEqual(width)
    expect(layout.outOfBounds, `elementos fuera del viewport en ${width}px`).toEqual([])
    expect(layout.clippedText, `texto cortado en ${width}px`).toEqual([])
    expect(layout.imageState.every(image => image.loaded && image.alt.length > 0), `imagenes ausentes o sin alt en ${width}px`).toBe(true)
    expect(layout.linksUnder44, `botones/links pequenos en ${width}px`).toEqual([])
    expect(layout.countColumns).toBe(width < 600 ? 2 : 4)
    expect(layout.wishColumns).toBe(1)
    expect(layout.giftCount).toBe(9)
    expect(layout.wishlistImages).toBe(0)
    expect(layout.visibleCategories).toBe(0)
    if (width >= 768) expect(layout.heroCenterDelta).toBeLessThanOrEqual(2)

    // Recorrer cada sección para activar los reveals antes de tomar la captura larga.
    const sections = page.locator('main > section')
    for (let index = 0; index < await sections.count(); index += 1) {
      await sections.nth(index).scrollIntoViewIfNeeded()
      await page.waitForTimeout(120)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(900)
    const wishlistOpacity = await page.locator('.wishlist-item').evaluateAll(items => items.map(item => Number(getComputedStyle(item).opacity)))
    expect(wishlistOpacity.every(opacity => opacity >= 0.99), `wishlist visible en ${width}px: ${JSON.stringify(wishlistOpacity)}`).toBe(true)
    await page.screenshot({ path: testInfo.outputPath(`invitacion-${width}px.png`), fullPage: true, animations: 'disabled' })
  })
}

const heroViewports = [
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]

for (const viewport of heroViewports) {
  test(`portada hero completa en ${viewport.width}x${viewport.height}`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport)
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await page.locator('#hero').scrollIntoViewIfNeeded()
    await page.evaluate(() => window.scrollTo(0, document.querySelector('#hero')!.getBoundingClientRect().top + window.scrollY))
    await page.waitForTimeout(500)

    const layout = await page.evaluate(() => {
      const box = (selector: string) => {
        const element = document.querySelector<HTMLElement>(selector)!
        const rect = element.getBoundingClientRect()
        const style = getComputedStyle(element)
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height, center: rect.left + rect.width / 2, position: style.position, opacity: Number(style.opacity) }
      }
      const image = document.querySelector<HTMLImageElement>('.bunny-image')!
      const imageBox = image.getBoundingClientRect()
      const ovalBox = document.querySelector('.hero-oval')!.getBoundingClientRect()
      const heroBox = document.querySelector('#hero')!.getBoundingClientRect()
      return {
        viewportWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hero: { top: heroBox.top, bottom: heroBox.bottom, height: heroBox.height },
        title: box('.hero-title'),
        subtitle: box('.hero-subtitle'),
        name: box('.baby-name'),
        art: box('.hero-visual'),
        footnote: box('.hero-footnote'),
        image: { left: imageBox.left, right: imageBox.right, top: imageBox.top, bottom: imageBox.bottom, width: imageBox.width, height: imageBox.height, loaded: image.complete && image.naturalWidth > 0 },
        oval: { left: ovalBox.left, right: ovalBox.right, top: ovalBox.top, bottom: ovalBox.bottom, width: ovalBox.width, center: ovalBox.left + ovalBox.width / 2 },
      }
    })

    const content = [layout.title, layout.subtitle, layout.name, layout.art, layout.footnote]
    expect(layout.scrollWidth).toBeLessThanOrEqual(viewport.width)
    expect(layout.hero.top).toBeGreaterThanOrEqual(-1)
    expect(layout.hero.height, JSON.stringify(layout)).toBeLessThanOrEqual(viewport.height + 1)
    expect(content.every(item => item.top >= -1 && item.bottom <= viewport.height + 1)).toBe(true)
    expect(content.every(item => item.position !== 'absolute')).toBe(true)
    expect(Math.max(...content.map(item => item.center)) - Math.min(...content.map(item => item.center))).toBeLessThanOrEqual(1)
    expect(layout.name.bottom).toBeLessThan(layout.image.top)
    expect(layout.footnote.top).toBeGreaterThan(layout.image.bottom)
    expect(layout.image.loaded).toBe(true)
    expect(layout.image.width).toBeLessThanOrEqual(viewport.width <= 599 ? 350 : viewport.width < 1024 ? 400 : 460)
    expect(layout.oval.width / layout.image.width).toBeGreaterThanOrEqual(1.05)
    expect(layout.oval.width / layout.image.width).toBeLessThanOrEqual(1.15)
    expect(Math.abs(layout.oval.center - (layout.image.left + layout.image.width / 2))).toBeLessThanOrEqual(1)
    await page.screenshot({ path: testInfo.outputPath(`hero-${viewport.width}x${viewport.height}.png`), animations: 'disabled' })
  })
}
