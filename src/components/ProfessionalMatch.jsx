import { useEffect, useRef } from 'react'

const painPoints = [
  'Horas improdutivas em entrevista',
  'Contratações desalinhadas',
  'Equipes desmotivadas',
  'Perda financeira constante',
]

const costByRole = [
  { role: 'Estagiário', line: 'R$ 3 mil+ benefícios' },
  { role: 'Vendedor', line: 'R$ 15 mil+ benefícios' },
  { role: 'Gerente', line: 'R$ 45 mil mais benefícios' },
  { role: 'Diretor', line: 'R$ 60 mil+ benefícios' },
]

const comparison = [
  {
    title: 'Processo tradicional',
    tagline: 'Lento, caro e incerto',
    negative: true,
  },
  {
    title: 'Professional Match',
    tagline: 'Rápido, assertivo e econômico',
    negative: false,
  },
]

const PARALLAX_PX = 0.1

function useProfessionalMatchParallax() {
  const sectionRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tick = () => {
      rafRef.current = 0
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) {
        el.style.setProperty('--pm-parallax-y', '0px')
        return
      }
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const off = h / 2 - (r.top + r.height / 2)
      const y = off * PARALLAX_PX
      const c = Math.max(-56, Math.min(56, y))
      el.style.setProperty('--pm-parallax-y', `${c.toFixed(2)}px`)
    }

    const onFrame = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onFrame, { passive: true })
    window.addEventListener('resize', onFrame)
    return () => {
      window.removeEventListener('scroll', onFrame)
      window.removeEventListener('resize', onFrame)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return sectionRef
}

export default function ProfessionalMatch() {
  const sectionRef = useProfessionalMatchParallax()

  return (
    <section
      ref={sectionRef}
      id="professional-match"
      className="section-professional-match relative overflow-x-hidden py-20 px-8 lg:px-12"
      aria-labelledby="professional-match-heading"
    >
      <div className="pm-parallax-wrap pointer-events-none" aria-hidden>
        <div className="pm-parallax-bg">
          <img
            className="pm-section-bg-img"
            src="/pm-section-bg.jpg"
            alt=""
            width={1024}
            height={682}
            fetchPriority="low"
            decoding="async"
          />
        </div>
      </div>
      <div
        className="pm-degrade pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2
            id="professional-match-heading"
            className="pm-glow-title font-display text-3xl md:text-4xl lg:text-5xl font-bold inline-flex flex-wrap items-baseline justify-center gap-x-1.5"
          >
            <span className="pm-title">Professional</span>
            <span className="pm-title-match">Match</span>
            <sup
              className="pm-r text-base md:text-xl font-normal leading-none -translate-y-0.5 md:-translate-y-1 ml-0.5"
              title="Marca registrada"
            >
              ®
            </sup>
          </h2>
          <p className="pm-narr text-lg font-medium mt-4">
            Encontro de empresas estratégicas que atraem talentos
          </p>
          <p className="pm-credit mt-2 text-sm">
            Com <strong className="pm-name font-medium">Karina Rodrigues</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 mb-10">
          <div className="glass-card pm-card p-8 md:p-10">
            <h3 className="pm-h3 font-display text-xl font-bold mb-4">
              Turnover alto não é acaso: é falta de estratégia
            </h3>
            <p className="pm-body text-sm leading-relaxed md:text-base">
              Contratar exige tempo, treinamento e adaptação. Quando o processo não é assertivo, o custo
              fica invisível — e segue crescendo.
            </p>
            <ul className="mt-6 space-y-3">
              {painPoints.map((item) => (
                <li key={item} className="pm-body flex items-start gap-3 text-sm">
                  <span className="pm-bullet mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card pm-card p-8 md:p-10">
            <h3 className="pm-h3 font-display text-xl font-bold mb-2">Contratações erradas têm preço</h3>
            <p className="pm-body text-sm mb-6">
              Referência aproximada de impacto <strong className="pm-body-strong">por cargo</strong> para a
              empresa — sem contar a rotatividade em cascata.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {costByRole.map(({ role, line }) => (
                <div key={role} className="pm-pill rounded-xl px-4 py-3">
                  <p className="pm-label text-xs font-semibold uppercase tracking-wide">{role}</p>
                  <p className="pm-value text-base md:text-lg font-bold tabular-nums">{line}</p>
                </div>
              ))}
            </div>
            <p className="pm-callout text-center font-medium mt-6 text-sm">
              Percebe que o vazamento de talento só aumenta?
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
          {comparison.map((col) => (
            <div
              key={col.title}
              className={
                col.negative
                  ? 'glass-card pm-card pm-compare-neg p-6 md:p-8'
                  : 'glass-card pm-card pm-compare-pos p-6 md:p-8'
              }
            >
              <p className="pm-compare-label text-xs font-semibold uppercase tracking-wider mb-1">
                {col.title}
              </p>
              <p
                className={
                  col.negative
                    ? 'pm-compare-line font-display text-lg md:text-xl'
                    : 'pm-compare-line font-display text-lg md:text-xl font-bold'
                }
              >
                {col.tagline}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <div className="glass-card pm-card pm-card-highlight p-8 md:p-10">
            <p className="pm-sol-title font-display text-2xl md:text-3xl font-bold">Apresento a solução</p>
            <p className="pm-sol mt-4 leading-relaxed">
              Você não precisa de mais currículo. <strong className="pm-em">Invista</strong> na assertividade
              das conexões — pessoas certas, no contexto certo, com menos fricção.
            </p>
            <a
              href="#contato"
              className="inline-flex glass-btn-primary rounded-full px-8 py-3.5 text-base font-semibold mt-8"
            >
              Falar sobre o seminário
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

