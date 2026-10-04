import { expect, test, type Page } from '@playwright/test'

async function verifyInvitationMusic(page: Page) {
  const audioWarnings: string[] = []
  page.on('console', message => {
    if ((message.type() === 'error' || message.type() === 'warning') && /m[uú]sica de la invitaci[oó]n/i.test(message.text())) {
      audioWarnings.push(message.text())
    }
  })
  page.on('pageerror', error => audioWarnings.push(error.message))

  await page.goto('/')
  const audio = page.locator('audio')
  await expect(audio).toHaveCount(1)
  await expect(audio).toHaveAttribute('loop', '')
  await expect(audio).toHaveAttribute('preload', 'auto')
  expect(await audio.getAttribute('src')).toContain('baby-shower-lullaby-girl')
  const musicButton = page.locator('.music-toggle')
  await expect(musicButton).toHaveCount(1)
  await expect(musicButton).toHaveAttribute('aria-label', 'Activar música')
  expect(await audio.evaluate(element => (element as HTMLAudioElement).paused)).toBe(true)
  expect(await audio.evaluate(element => (element as HTMLAudioElement).muted)).toBe(false)
  await audio.evaluate(element => { (element as HTMLAudioElement).dataset.instanceMarker = 'mounted-before-open' })

  await page.getByRole('button', { name: 'Abrir invitación' }).click()
  await expect.poll(() => audio.evaluate(element => !(element as HTMLAudioElement).paused)).toBe(true)
  await expect(page.locator('.welcome-splash')).toHaveCount(0, { timeout: 5000 })
  await expect(musicButton).toHaveAttribute('aria-label', 'Silenciar música')
  expect(await audio.getAttribute('data-instance-marker')).toBe('mounted-before-open')
  expect(await audio.evaluate(element => (element as HTMLAudioElement).volume)).toBeGreaterThan(0)
  expect(await audio.evaluate(element => (element as HTMLAudioElement).volume)).toBeLessThanOrEqual(0.22)

  const startTime = await audio.evaluate(element => (element as HTMLAudioElement).currentTime)
  for (const selector of ['#hero', '.intro', '.message-section', '#fecha', '.countdown-section', '.wishlist-section', '#ubicacion', '#rsvp', '.closing-section']) {
    await page.locator(selector).scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    expect(await audio.evaluate(element => !(element as HTMLAudioElement).paused)).toBe(true)
    expect(await audio.count()).toBe(1)
  }
  expect(await audio.evaluate(element => (element as HTMLAudioElement).currentTime)).toBeGreaterThan(startTime)

  await musicButton.click()
  await expect.poll(() => audio.evaluate(element => (element as HTMLAudioElement).paused)).toBe(true)
  await expect(musicButton).toHaveAttribute('aria-label', 'Activar música')
  await musicButton.click()
  await expect.poll(() => audio.evaluate(element => !(element as HTMLAudioElement).paused)).toBe(true)
  await expect(musicButton).toHaveAttribute('aria-label', 'Silenciar música')

  await audio.evaluate(element => (element as HTMLAudioElement).pause())
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'hidden' })
    document.dispatchEvent(new Event('visibilitychange'))
    Object.defineProperty(document, 'visibilityState', { configurable: true, value: 'visible' })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect.poll(() => audio.evaluate(element => !(element as HTMLAudioElement).paused)).toBe(true)

  await page.waitForFunction(() => {
    const player = document.querySelector('audio')
    return !!player && Number.isFinite(player.duration) && player.duration > 1
  })
  await audio.evaluate(element => {
    const player = element as HTMLAudioElement
    player.currentTime = player.duration - 0.25
  })
  await expect.poll(() => audio.evaluate(element => (element as HTMLAudioElement).currentTime), { timeout: 5000 }).toBeLessThan(1)
  expect(audioWarnings).toEqual([])
}

test('la música permanece continua en Chrome desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 })
  await verifyInvitationMusic(page)
})

test.describe('Chrome móvil emulado', () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })

  test('la música permanece continua en móvil', async ({ page }) => {
    await verifyInvitationMusic(page)
  })
})
