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
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="26"
        fill="#45503B"
        fillOpacity="0.86"
        transform="rotate(0 50 50)"
      />
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="26"
        fill="#9A9C96"
        fillOpacity="0.76"
        transform="rotate(72 50 50)"
      />
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="26"
        fill="#B8A8B2"
        fillOpacity="0.73"
        transform="rotate(144 50 50)"
      />
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="26"
        fill="#B098A4"
        fillOpacity="0.78"
        transform="rotate(216 50 50)"
      />
      <ellipse
        cx="50"
        cy="24"
        rx="15"
        ry="26"
        fill="#828E78"
        fillOpacity="0.8"
        transform="rotate(288 50 50)"
      />
      <circle cx="50" cy="50" r="5.5" fill="white" />
    </svg>
  )
}

export function IkigaiLogo({ flowerSize = 44, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <IkigaiFlower size={flowerSize} />
      <div className="flex flex-col leading-none gap-[3px]">
        <span
          className="font-display font-bold text-mist tracking-[0.18em] uppercase"
          style={{ fontSize: flowerSize * 0.46 }}
        >
          IKIGAI
        </span>
        <span
          className="text-primary-200/80 tracking-[0.28em] uppercase font-medium"
          style={{ fontSize: flowerSize * 0.15 }}
        >
          PERFORMANCE
        </span>
      </div>
    </div>
  )
}
