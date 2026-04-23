/**
 * IkigaiFlower — SVG vetorizado da flor Ikigai Performance
 * 5 pétalas elípticas sobrepostas e semi-transparentes, ponto branco no centro
 */
export function IkigaiFlower({ size = 60, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-5 -5 110 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ikigai Performance — flor"
    >
      {/* Pétala 1 — topo — olive escuro */}
      <ellipse cx="50" cy="24" rx="15" ry="26"
        fill="#45503B" fillOpacity="0.86"
        transform="rotate(0 50 50)" />

      {/* Pétala 2 — superior direita — cinza-quente */}
      <ellipse cx="50" cy="24" rx="15" ry="26"
        fill="#9A9C96" fillOpacity="0.76"
        transform="rotate(72 50 50)" />

      {/* Pétala 3 — inferior direita — mauve claro */}
      <ellipse cx="50" cy="24" rx="15" ry="26"
        fill="#B8A8B2" fillOpacity="0.73"
        transform="rotate(144 50 50)" />

      {/* Pétala 4 — inferior esquerda — mauve */}
      <ellipse cx="50" cy="24" rx="15" ry="26"
        fill="#B098A4" fillOpacity="0.78"
        transform="rotate(216 50 50)" />

      {/* Pétala 5 — superior esquerda — sage verde */}
      <ellipse cx="50" cy="24" rx="15" ry="26"
        fill="#828E78" fillOpacity="0.80"
        transform="rotate(288 50 50)" />

      {/* Ponto central branco */}
      <circle cx="50" cy="50" r="5.5" fill="white" />
    </svg>
  )
}

/**
 * IkigaiLogo — flor + texto "IKIGAI / PERFORMANCE" lado a lado
 */
export function IkigaiLogo({ flowerSize = 44, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IkigaiFlower size={flowerSize} />
      <div className="flex flex-col leading-none gap-[3px]">
        <span
          className="font-display font-bold text-primary-900 dark:text-mist tracking-[0.18em] uppercase"
          style={{ fontSize: flowerSize * 0.46 }}
        >
          IKIGAI
        </span>
        <span
          className="text-neutral-700 dark:text-primary-200/80 tracking-[0.28em] uppercase font-medium"
          style={{ fontSize: flowerSize * 0.15 }}
        >
          PERFORMANCE
        </span>
      </div>
    </div>
  )
}
