import {
  siAntdesign,
  siApacheecharts,
  siDocker,
  siFastapi,
  siGithub,
  siJavascript,
  siMaplibre,
  siNextdotjs,
  siNuxt,
  siOpenapiinitiative,
  siPinia,
  siPostgresql,
  siPrisma,
  siPwa,
  siReact,
  siSass,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVite,
  siVuedotjs,
} from 'simple-icons'

// Official brand marks — simple-icons ships both the path and the brand hex.
const BRAND = {
  antdesign: siAntdesign,
  apacheecharts: siApacheecharts,
  docker: siDocker,
  fastapi: siFastapi,
  github: siGithub,
  javascript: siJavascript,
  maplibre: siMaplibre,
  nextdotjs: siNextdotjs,
  nuxt: siNuxt,
  openapiinitiative: siOpenapiinitiative,
  pinia: siPinia,
  postgresql: siPostgresql,
  prisma: siPrisma,
  pwa: siPwa,
  react: siReact,
  sass: siSass,
  tailwindcss: siTailwindcss,
  telegram: siTelegram,
  typescript: siTypescript,
  vite: siVite,
  vuedotjs: siVuedotjs,
}

// Concepts (REST, RBAC, …) plus the brands simple-icons doesn't carry —
// LinkedIn and Element Plus among them — drawn as stroked 24×24 glyphs.
const CUSTOM = {
  elementplus: {
    hex: '409EFF',
    paths: [
      'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z',
      'M12 8v8',
      'M8 12h8',
    ],
  },
  zustand: {
    hex: '433E38',
    paths: ['M12 3l9 4.5-9 4.5-9-4.5z', 'M3 12l9 4.5 9-4.5', 'M3 16.5l9 4.5 9-4.5'],
  },
  context: {
    hex: '61DAFB',
    paths: [
      'M6.5 2.5h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4z',
      'M9.5 7.5h5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2z',
    ],
  },
  restapi: {
    hex: 'FF2D78',
    paths: ['M8.5 6.5 3 12l5.5 5.5', 'M15.5 6.5 21 12l-5.5 5.5', 'M13.5 4.5l-3 15'],
  },
  rbac: {
    hex: '7C3AED',
    paths: ['M12 2.5l7.5 3v6c0 4.5-3.2 8.6-7.5 10-4.3-1.4-7.5-5.5-7.5-10v-6z', 'M12 12.6v2.9'],
    circles: [[12, 10.6, 1.6]],
  },
  websocket: {
    hex: '00A99E',
    paths: ['M4 9h13', 'M13 5l4 4-4 4', 'M20 15H7', 'M11 19l-4-4 4-4'],
  },
  apexcharts: {
    hex: '008FFB',
    paths: ['M3 20h18', 'M7 20v-6', 'M12 20v-10', 'M17 20v-4'],
  },
  linkedin: {
    hex: '0A66C2',
    paths: [
      'M6.5 2.5h11a4 4 0 0 1 4 4v11a4 4 0 0 1-4 4h-11a4 4 0 0 1-4-4v-11a4 4 0 0 1 4-4z',
      'M7.6 10.6v6',
      'M11.6 16.6v-6',
      'M11.6 13.2a2.6 2.6 0 0 1 5.2 0v3.4',
    ],
    circles: [[7.6, 7.5, 0.5]],
  },
  email: {
    hex: 'EA4335',
    paths: [
      'M5 5.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z',
      'm3.4 7.6 8.6 6 8.6-6',
    ],
  },
}

/**
 * `tone="brand"` paints each mark in its own brand colour (the skill grid).
 * `tone="current"` inherits the parent's `color`, so buttons that recolour on
 * hover keep working.
 */
export default function Icon({ name, size = 40, tone = 'brand' }) {
  const brand = BRAND[name]

  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={tone === 'current' ? 'currentColor' : `#${brand.hex}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={brand.path} />
      </svg>
    )
  }

  const custom = CUSTOM[name]
  if (!custom) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={tone === 'current' ? 'currentColor' : `#${custom.hex}`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {custom.paths.map((d) => (
        <path key={d} d={d} />
      ))}
      {custom.circles?.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </svg>
  )
}
