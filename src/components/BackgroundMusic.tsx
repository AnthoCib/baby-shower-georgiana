import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export type BackgroundMusicHandle = { start: () => void }
const audioFiles = import.meta.glob('../assets/audio/*.mp3', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const audioSource = audioFiles['../assets/audio/baby-shower-music.mp3']

export const BackgroundMusic = forwardRef<BackgroundMusicHandle>(function BackgroundMusic(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrame = useRef<number | undefined>(undefined)
  const [active, setActive] = useState(false)
  const reduceMotion = useReducedMotion()

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audioSource) return
    if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current)
    audio.volume = 0
    const startedAt = performance.now()
    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 1800)
      if (audioRef.current) audioRef.current.volume = .3 * progress
      if (progress < 1) fadeFrame.current = requestAnimationFrame(step)
    }
    fadeFrame.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audioSource) return
    audio.volume = 0
    void audio.play().then(() => { setActive(true); fadeIn() }).catch(() => setActive(false))
  }, [fadeIn])

  useImperativeHandle(ref, () => ({ start }), [start])

  useEffect(() => () => { if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current) }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !audioSource) return
    if (audio.paused) {
      void audio.play().then(() => { setActive(true); fadeIn() }).catch(() => setActive(false))
    } else {
      audio.pause()
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current)
      setActive(false)
    }
  }

  return <>
    {audioSource && <audio ref={audioRef} src={audioSource} loop preload="auto" aria-hidden="true" />}
    <motion.button
      className="music-toggle"
      type="button"
      onClick={toggle}
      aria-label={active ? 'Pausar música' : 'Reproducir música'}
      aria-pressed={active}
      animate={active && !reduceMotion ? { scale: [1, 1.045, 1] } : { scale: 1 }}
      transition={active && !reduceMotion ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : { duration: .2 }}
    >{active ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}</motion.button>
  </>
})
