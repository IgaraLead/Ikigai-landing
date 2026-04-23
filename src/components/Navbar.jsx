import { useEffect, useLayoutEffect, useState } from 'react'
import { IkigaiLogo } from './Logo'
import { SITE_URL } from '../config/site'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Professional Match', href: '#professional-match' },
  { label: 'Palestras', href: '#palestras' },
  { label: 'Contato', href: '#contato' },
]

const OVERLAY_ID = 'hero-overlay'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [overlayInView, setOverlayInView] = useState(true)

  useLayoutEffect(() => {
    const el = document.getElementById(OVERLAY_ID)
    if (!el) {
      setOverlayInView(false)
      return
    }
    const r = el.getBoundingClientRect()
    const inView = r.top < window.innerHeight && r.bottom > 0
    setOverlayInView(inView)

    const io = new IntersectionObserver(
      ([e]) => {
        setOverlayInView(e.isIntersecting)
      },
      { root: null, threshold: 0, rootMargin: '0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (overlayInView) setOpen(false)
  }, [overlayInView])

  const mainHidden = overlayInView

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
                className="text-sm font-medium text-primary-200/90 hover:text-mist transition-colors"
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
