export default function About() {
  return (
    <section id="sobre" className="py-20 px-8 lg:px-12 overflow-visible text-neutral-900 dark:text-mist/95">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card p-8 md:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-lg ring-1 ring-primary-900/5">
                <img
                  src={`${import.meta.env.BASE_URL}karina-rodrigues.jpg`}
                  alt="Karina Rodrigues"
                  className="block h-full w-full min-h-0 object-cover object-top"
                />
              </div>
            </div>

            {/* Text content */}
            <div>
              <span className="text-sm font-semibold text-accent-700 dark:text-accent-500 uppercase tracking-wider">
                Sobre Mim
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-950 dark:text-mist mt-3 mb-6">
                Transformando equipes através de conexão humana
              </h2>
              <div className="space-y-4 text-neutral-700 dark:text-primary-200/90 leading-relaxed">
                <p>
                  Sou palestrante corporativa apaixonada por despertar o melhor das pessoas e das equipes.
                  Acredito que resultados extraordinários nascem de ambientes onde as pessoas se sentem
                  acolhidas, valorizadas e inspiradas a dar o seu melhor.
                </p>
                <p>
                  Minha abordagem combina experiência prática em vendas e gestão com técnicas de
                  desenvolvimento humano, criando experiências que vão além de conteúdo — geram
                  <strong className="text-neutral-950 dark:text-mist"> verdadeira transformação</strong>.
                </p>
                <p>
                  Cada palestra é personalizada para a cultura e os desafios da sua empresa,
                  garantindo impacto real e duradouro.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {['Vendas', 'Comportamento', 'Acolhimento', 'Cultura'].map((tag) => (
                  <span
                    key={tag}
                    className="glass-btn rounded-full px-5 py-2 text-sm font-medium text-neutral-950 dark:text-mist"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
