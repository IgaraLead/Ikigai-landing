import { useEffect, useLayoutEffect, useState } from 'react'
import { IkigaiLogo } from './Logo'
import { SITE_URL } from '../config/site'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Professional Match', href: '#professional-match' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Palestras', href: '#palestras' },
  { label: 'Contato', href: '#contato' },
]

const OVERLAY_ID = 'hero-overlay'
const HERO_VISIBILITY_THRESHOLD = 0.3

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isHeroMoreThanThresholdVisible, setIsHeroMoreThanThresholdVisible] = useState(true)

  useLayoutEffect(() => {
    const el = document.getElementById(OVERLAY_ID)
    if (!el) {
      setIsHeroMoreThanThresholdVisible(false)
      return
    }

    const getVisibleRatio = () => {
      const rect = el.getBoundingClientRect()
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      const safeVisibleHeight = Math.max(0, visibleHeight)
      return rect.height > 0 ? safeVisibleHeight / rect.height : 0
    }

    setIsHeroMoreThanThresholdVisible(getVisibleRatio() > HERO_VISIBILITY_THRESHOLD)

    const io = new IntersectionObserver(
      ([e]) => {
        setIsHeroMoreThanThresholdVisible(
          e.isIntersecting && e.intersectionRatio > HERO_VISIBILITY_THRESHOLD
        )
      },
      { root: null, threshold: [0, HERO_VISIBILITY_THRESHOLD, 1], rootMargin: '0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (isHeroMoreThanThresholdVisible) setOpen(false)
  }, [isHeroMoreThanThresholdVisible])

  const mainHidden = isHeroMoreThanThresholdVisible

  return (
    <nav
      className="glass-nav fixed top-0 left-0 right-0 z-50"
      aria-label="Principal"
    >
      <div
        className={[
          'overflow-hidden transition-all duration-300 ease-out',
          mainHidden
            ? 'max-h-0 pointer-events-none opacity-0 [visibility:hidden]'
            : 'max-h-[1000px] opacity-100 [visibility:visible]',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 pl-8 pr-4 sm:pr-8 md:pr-32">
          <a
            href={import.meta.env.DEV ? '#inicio' : `${SITE_URL}/#inicio`}
            aria-label="Ikigai Performance"
            className="shrink-0"
          >
            <IkigaiLogo flowerSize={42} />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={[
                  'text-sm font-medium transition-colors',
                  link.href === '#professional-match'
                    ? 'nav-link-professional-match text-[#c6ba9f] hover:text-[#e1d7c0]'
                    : 'text-primary-200/90 hover:text-mist',
                ].join(' ')}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              className="glass-btn-primary rounded-full px-6 py-2.5 text-sm font-semibold"
            >
              Fale Comigo
            </a>
          </div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="shrink-0 md:hidden text-primary-200 p-2"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        {open && (
          <div className="md:hidden glass-card rounded-none border-x-0 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-primary-200/90 hover:text-mist py-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="block glass-btn-primary rounded-full px-6 py-2.5 text-sm font-semibold text-center mt-2"
            >
              Fale Comigo
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
