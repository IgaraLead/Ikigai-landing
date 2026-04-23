import { useMemo, useState } from 'react'

const CONTACT_EMAIL = 'karina.rodrigues@ikigaiperformance.com.br'
const INSTAGRAM_URL = 'https://instagram.com/ikigaiperformance_'
const WHATSAPP_NUMBER = '5511994782908'

const INTEREST_OPTIONS = [
  { value: 'palestra-vendas', label: 'Palestra de Vendas' },
  { value: 'palestra-comportamento', label: 'Comportamento & Cultura' },
  { value: 'palestra-acolhimento', label: 'Acolhimento' },
  { value: 'seminario-professional-match', label: 'Seminário Professional Match' },
  { value: 'ebook', label: 'E-book' },
  { value: 'outro', label: 'Outro' },
]

const MAX_MESSAGE_TEXT = 1600

function buildWhatsAppMessage(fields) {
  const name = (fields.name || '').trim()
  const company = (fields.company || '').trim()
  const email = (fields.email || '').trim()
  const interest = (fields.interest || '').trim()
  const rawMessage = (fields.message || '').trim()
  const interestLabel =
    INTEREST_OPTIONS.find((o) => o.value === interest)?.label || (interest || '—')
  const head = [
    `*Nome:* ${name}`,
    `*Empresa:* ${company}`,
    `*E-mail:* ${email}`,
    `*Interesse:* ${interestLabel}`,
  ].join('\n')
  const text = rawMessage ? `${head}\n\n${rawMessage}` : head
  if (text.length > MAX_MESSAGE_TEXT) {
    const cut = MAX_MESSAGE_TEXT - 40
    return `${text.slice(0, cut)}\n\n…(texto encurtado; limite do link do WhatsApp)`
  }
  return text
}

function buildWhatsAppUrl(plainText) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plainText)}`
}

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    interest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('')
  const [whatsappOpenBlocked, setWhatsappOpenBlocked] = useState(false)
  const messagePreview = useMemo(() => buildWhatsAppMessage(form), [form])
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const text = buildWhatsAppMessage(form)
    const url = buildWhatsAppUrl(text)
    setLastWhatsappUrl(url)
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    if (win) {
      try {
        win.opener = null
      } catch {
        // ignore
      }
    }
    setWhatsappOpenBlocked(!win)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contato" className="py-20 px-8 lg:px-12 text-mist/90">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-mist" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-mist mb-3">Abra o WhatsApp</h3>
            <p className="text-primary-200/85 mb-4">
              Sua mensagem foi montada com os dados do formulário. O WhatsApp deve abrir noutro separador: confira o
              texto e toque em <span className="text-mist font-medium">Enviar</span> na conversa.
            </p>
            {whatsappOpenBlocked && (
              <p className="text-sm text-amber-200/90 bg-amber-950/50 rounded-lg px-4 py-2 mb-4">
                O navegador bloqueou a janela nova. Use o botão abaixo para abrir o WhatsApp com a mesma mensagem.
              </p>
            )}
            {lastWhatsappUrl && (
              <a
                href={lastWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center glass-btn-primary rounded-full px-8 py-3.5 text-base font-semibold mb-6 w-full sm:w-auto"
              >
                Abrir WhatsApp com a mensagem
              </a>
            )}
            <p className="text-primary-200/80 text-sm mb-6">Obrigada pelo interesse! Responderei assim que puder.</p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false)
                setWhatsappOpenBlocked(false)
                setLastWhatsappUrl('')
                setForm({ name: '', email: '', company: '', interest: '', message: '' })
              }}
              className="glass-btn rounded-full px-6 py-3 text-sm font-semibold text-mist"
            >
              Enviar nova mensagem
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contato" className="py-20 px-8 lg:px-12 overflow-visible text-mist/90">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <span className="text-sm font-semibold text-accent-500 uppercase tracking-wider">Vamos Conversar</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-mist mt-3 mb-6">Pronto para transformar sua equipe?</h2>
            <p className="text-primary-200/90 leading-relaxed mb-8">
              Preencha os campos e toque em enviar: vamos abrir o WhatsApp com a mensagem já pronta (veja a prévia ao
              lado). Só resta enviar a conversa na aplicação.
            </p>
            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-800/50 flex items-center justify-center text-primary-200 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-mist">(11) 99478-2908</div>
                  <div className="text-xs text-primary-200/50">WhatsApp</div>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/company/ikigaiperformance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-800/30 flex items-center justify-center text-accent-300 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-mist">LinkedIn</div>
                  <div className="text-xs text-primary-200/50">/company/ikigaiperformance</div>
                </div>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-800/30 flex items-center justify-center text-accent-300 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-mist">Instagram</div>
                  <div className="text-xs text-primary-200/50">@ikigaiperformance_</div>
                </div>
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-4 glass-card p-4 group hover:scale-[1.02] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800/60 flex items-center justify-center text-primary-200 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-mist">E-mail</div>
                  <div className="text-xs text-primary-200/50 break-all leading-snug">{CONTACT_EMAIL}</div>
                </div>
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary-200/80 mb-2">
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm text-mist placeholder:text-primary-200/40"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary-200/80 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm text-mist placeholder:text-primary-200/40"
                    autoComplete="email"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-primary-200/80 mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="glass-input w-full rounded-xl px-4 py-3 text-sm text-mist placeholder:text-primary-200/40"
                    autoComplete="organization"
                  />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="interest" className="block text-sm font-medium text-primary-200/80 mb-2">
                  Interesse *
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={form.interest}
                  onChange={handleChange}
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm text-mist appearance-none"
                >
                  <option value="">Selecione seu interesse</option>
                  {INTEREST_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label htmlFor="message" className="block text-sm font-medium text-primary-200/80 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Conte um pouco sobre o que você busca..."
                  className="glass-input w-full rounded-xl px-4 py-3 text-sm text-mist placeholder:text-primary-200/40 resize-none"
                  aria-describedby="wa-message-preview"
                />
              </div>
              <div className="mt-6" id="wa-message-preview" aria-label="Prévia da mensagem do WhatsApp">
                <p className="text-xs font-medium text-primary-200/70 uppercase tracking-wider mb-2">
                  Prévia (texto que abrirá no WhatsApp)
                </p>
                <pre
                  className="glass-input w-full max-h-52 overflow-y-auto rounded-xl p-4 text-left text-sm text-mist whitespace-pre-wrap break-words font-sans"
                  role="status"
                >
                  {messagePreview}
                </pre>
              </div>
              <button
                type="submit"
                className="glass-btn-primary w-full rounded-xl px-6 py-4 text-base font-semibold mt-6 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
