import { useEffect, useRef } from 'react'
import { LANDING_PARALLAX_FACTOR } from '../constants/parallax'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    title: 'Palestra de Vendas',
    description:
      'Técnicas que conectam vendedor e cliente através de empatia e propósito. Venda mais ao criar relações verdadeiras.',
    highlights: ['Conexão com o cliente', 'Técnicas de persuasão ética', 'Mindset de resultados'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: 'Comportamento & Cultura',
    description:
      'Transforme a cultura organizacional da sua empresa. Equipes alinhadas, engajadas e comprometidas com resultados.',
    highlights: ['Engajamento de equipe', 'Comunicação assertiva', 'Liderança humanizada'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
    title: 'Acolhimento',
    description:
      'Crie um ambiente onde cada colaborador se sente visto, ouvido e valorizado. O acolhimento é a base da alta performance.',
    highlights: ['Escuta ativa', 'Diversidade e inclusão', 'Bem-estar no trabalho'],
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
    title: 'E-book Exclusivo',
    description:
      'Material digital com as principais estratégias e ferramentas abordadas nas palestras. Leitura prática e transformadora.',
    highlights: ['Conteúdo aprofundado', 'Exercícios práticos', 'Acesso imediato'],
  },
]

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let rafId = 0

    const tick = () => {
      rafId = 0
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        el.style.setProperty('--services-parallax-y', '0px')
        return
      }
      const rect = el.getBoundingClientRect()
      const sectionTravel = window.innerHeight + rect.height
      const progress = (window.innerHeight - rect.top) / sectionTravel
      const centeredProgress = progress - 0.5
      const y = centeredProgress * 112 * LANDING_PARALLAX_FACTOR
      const clampedY = Math.max(-42, Math.min(42, y))
      el.style.setProperty('--services-parallax-y', `${clampedY.toFixed(2)}px`)
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
      id="palestras"
      className="section-services relative py-20 px-8 lg:px-12 overflow-hidden text-mist/95"
    >
      <div className="services-parallax-wrap pointer-events-none" aria-hidden>
        <div className="services-parallax-bg">
          <img
            src={`${import.meta.env.BASE_URL}karina-rodrigues.jpg`}
            alt=""
            className="services-bg-img"
            width={768}
            height={1024}
            fetchPriority="low"
            decoding="async"
          />
        </div>
      </div>
      <div className="services-degrade pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent-500 uppercase tracking-wider">
            O que Ofereço
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-mist mt-3">
            Palestras que geram{' '}
            <span className="bg-gradient-to-r from-primary-200 to-accent-500 bg-clip-text text-transparent">
              resultados reais
            </span>
          </h2>
          <p className="text-primary-200/90 mt-4 max-w-2xl mx-auto">
            Cada palestra é uma experiência única, desenhada para o contexto da sua empresa
            e focada em mudanças concretas.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-2 px-1">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-card p-6 flex flex-col group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-800/50 to-primary-900/60 flex items-center justify-center text-primary-200 mb-5">
                {service.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-mist mb-3">{service.title}</h3>
              <p className="text-sm text-primary-200/85 mb-5 flex-1">{service.description}</p>
              <ul className="space-y-2">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-primary-200/80">
                    <svg className="w-4 h-4 text-accent-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
