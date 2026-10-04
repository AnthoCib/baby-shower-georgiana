import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import babyShowerMusic from '../assets/audio/baby-shower-lullaby-girl.mp3'

export type BackgroundMusicHandle = { play: () => Promise<void> }

const targetVolume = 0.22
const fadeDuration = 1800

export const BackgroundMusic = forwardRef<BackgroundMusicHandle>(function BackgroundMusic(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const fadeFrame = useRef<number | undefined>(undefined)
  const startedRef = useRef(false)
  const manuallyPausedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const fadeIn = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeFrame.current !== undefined) cancelAnimationFrame(fadeFrame.current)
    const startedAt = performance.now()
    const step = (now: number) => {
      const progress = Math.max(0, Math.min(1, (now - startedAt) / fadeDuration))
      audio.volume = targetVolume * progress
      if (progress < 1) fadeFrame.current = requestAnimationFrame(step)
      else fadeFrame.current = undefined
    }
    fadeFrame.current = requestAnimationFrame(step)
  }, [])

  const play = useCallback((): Promise<void> => {
    const audio = audioRef.current
    if (!audio) return Promise.resolve()
    if (!audio.paused && !audio.ended) return Promise.resolve()

    manuallyPausedRef.current = false
    audio.muted = false
    audio.volume = 0
    let playback: Promise<void>
    try {
      // Keep play() synchronous with the invitation button's click activation.
      playback = audio.play()
    } catch (error) {
      console.warn('No se pudo iniciar la música de la invitación.', error)
      return Promise.resolve()
    }

    return playback.then(() => {
      startedRef.current = true
      fadeIn()
    }).catch(error => {
      console.warn('No se pudo iniciar la música de la invitación.', error)
    })
  }, [fadeIn])

  const togglePlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused && !audio.muted) {
      manuallyPausedRef.current = true
      if (fadeFrame.current !== undefined) cancelAnimationFrame(fadeFrame.current)
      fadeFrame.current = undefined
      audio.pause()
      return
    }
    void play()
  }, [play])

  useImperativeHandle(ref, () => ({ play }), [play])

  useEffect(() => {
    const resumeWhenVisible = () => {
      const audio = audioRef.current
      if (document.visibilityState !== 'visible' || !audio || !startedRef.current || manuallyPausedRef.current || !audio.paused) return
      audio.volume = 0
      void audio.play().then(fadeIn).catch(error => {
        console.warn('No se pudo reanudar la música de la invitación.', error)
      })
    }
    document.addEventListener('visibilitychange', resumeWhenVisible)
    return () => {
      document.removeEventListener('visibilitychange', resumeWhenVisible)
      if (fadeFrame.current !== undefined) cancelAnimationFrame(fadeFrame.current)
    }
  }, [fadeIn])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const syncPlaybackState = () => setIsPlaying(!audio.paused && !audio.muted)
    audio.addEventListener('playing', syncPlaybackState)
    audio.addEventListener('pause', syncPlaybackState)
    audio.addEventListener('ended', syncPlaybackState)
    audio.addEventListener('volumechange', syncPlaybackState)
    syncPlaybackState()
    return () => {
      audio.removeEventListener('playing', syncPlaybackState)
      audio.removeEventListener('pause', syncPlaybackState)
      audio.removeEventListener('ended', syncPlaybackState)
      audio.removeEventListener('volumechange', syncPlaybackState)
    }
  }, [])

  return <>
    <audio ref={audioRef} src={babyShowerMusic} loop preload="auto" aria-hidden="true" />
    <button
      type="button"
      className="music-toggle"
      onClick={togglePlayback}
      aria-label={isPlaying ? 'Silenciar música' : 'Activar música'}
      title={isPlaying ? 'Silenciar música' : 'Activar música'}
    >
      {isPlaying ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
    </button>
  </>
})
