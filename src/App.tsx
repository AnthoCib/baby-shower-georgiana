import { useEffect, useRef, useState } from 'react'
import { IntroSection } from './sections/IntroSection'
import { HeroSection } from './sections/HeroSection'
import { MessageSection } from './sections/MessageSection'
import { DateSection } from './sections/DateSection'
import { CountdownSection } from './sections/CountdownSection'
import { WishlistSection } from './sections/WishlistSection'
import { LocationSection } from './sections/LocationSection'
import { RsvpSection } from './sections/RsvpSection'
import { ClosingSection } from './sections/ClosingSection'
import { useStoryParallax } from './animations/useStoryParallax'
import { event } from './data/event'
import { WelcomeSplash } from './components/WelcomeSplash'
import { BackgroundMusic, type BackgroundMusicHandle } from './components/BackgroundMusic'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const musicRef = useRef<BackgroundMusicHandle>(null)
  useStoryParallax()
  useEffect(() => {
    document.title = event.title
    const setMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, key)
        document.head.append(tag)
      }
      tag.content = content
    }
    setMeta('meta[name="description"]', 'name', 'description', event.description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', event.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', event.description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website')
    let icon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!icon) { icon = document.createElement('link'); icon.rel = 'icon'; document.head.append(icon) }
    icon.href = event.favicon
  }, [])
  useEffect(() => {
    if (!showSplash) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [showSplash])

  const handleEnter = () => musicRef.current?.play() ?? Promise.resolve()

  return <>
    <main className="min-h-screen w-full"><HeroSection /><IntroSection /><MessageSection /><DateSection /><CountdownSection /><WishlistSection /><LocationSection /><RsvpSection /><ClosingSection /></main>
    <BackgroundMusic ref={musicRef} />
    {showSplash && <WelcomeSplash onEnter={handleEnter} onDismiss={() => setShowSplash(false)} />}
  </>
}
