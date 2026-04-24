import { useEffect, useRef } from 'react'
import { IkigaiFlower } from './Logo'
import { LANDING_PARALLAX_FACTOR } from '../constants/parallax'

const HERO_BG =
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1920&q=80'

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let rafId = 0

    const tick = () => {
      rafId = 0
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        el.style.setProperty('--hero-parallax-y', '0px')
        return
      }
      const rect = el.getBoundingClientRect()
      const viewportHalf = window.innerHeight / 2
      const sectionHalf = rect.top + rect.height / 2
      const offset = viewportHalf - sectionHalf
      const y = offset * LANDING_PARALLAX_FACTOR
      const clampedY = Math.max(-72, Math.min(72, y))
      el.style.setProperty('--hero-parallax-y', `${clampedY.toFixed(2)}px`)
    }

    const onFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onFrame, { passive: true })
    window.addEventListener('resize', onFrame)
    return () => {
      window.removeEventListener('scroll', onFrame)
      window.removeEventListener('resize', onFrame)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center py-20 px-8 lg:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 h-[130%] w-[130%] blur-md sm:blur-lg"
          style={{
            transform: 'translate3d(-50%, calc(-50% + var(--hero-parallax-y, 0px)), 0)',
          }}
        >
          <img
            src={HERO_BG}
            alt=""
            className="h-full w-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </div>
      <div
        id="hero-overlay"
        className="absolute inset-0"
        style={{ background: 'rgba(4, 4, 4, 0.5)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <IkigaiFlower size={72} className="mx-auto mb-6 opacity-95" />
        <h1
          className="font-display font-bold text-mist tracking-[0.22em] uppercase leading-none mb-2 drop-shadow-sm"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          IKIGAI
        </h1>
        <p
          className="text-mist tracking-[0.45em] uppercase font-medium mb-10"
          style={{ fontSize: 'clamp(0.7rem, 1.8vw, 1rem)' }}
        >
          PERFORMANCE
        </p>
        <div className="max-w-2xl mx-auto mb-4">
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-mist leading-snug font-medium">
            Sua equipe não precisa de mais conteúdo —
            <span className="text-accent-300"> precisa de transformação.</span>
          </p>
        </div>
        <p className="text-base md:text-lg text-mist max-w-xl mx-auto mb-12 leading-relaxed">
          Palestras corporativas em{' '}
          <strong className="text-mist">vendas</strong>,{' '}
          <strong className="text-mist">comportamento</strong>,{' '}
          <strong className="text-mist">acolhimento</strong> e{' '}
          <strong className="text-mist">cultura</strong> que geram mudanças reais.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-4 max-w-2xl mx-auto w-full sm:w-auto">
          <a
            href="#professional-match"
            className="hero-pm-cta inline-flex w-full sm:w-auto sm:min-w-[14rem] sm:flex-[1_1_100%] justify-center rounded-full px-8 py-4 text-lg font-semibold text-center"
          >
            Conhecer o Professional Match
          </a>
          <a
            href="#contato"
            className="glass-btn-primary rounded-full px-8 py-4 text-lg font-semibold w-full sm:min-w-[12rem] sm:w-auto text-center"
          >
            Quero Transformar Minha Equipe
          </a>
          <a
            href="#palestras"
            className="glass-btn rounded-full px-8 py-4 text-lg font-semibold text-mist border border-mist/35 w-full sm:min-w-[12rem] sm:w-auto text-center"
          >
            Conhecer Palestras
          </a>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-xl mx-auto px-2">
          {[
            { value: '10+', label: 'Anos de experiência' },
            { value: '50+', label: 'Palestras realizadas' },
            { value: '5K+', label: 'Vidas impactadas' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-200">{stat.value}</div>
              <div className="text-xs md:text-sm text-mist mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
