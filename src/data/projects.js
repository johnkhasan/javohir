// liveLink: null bo'lgan joylarga o'zingiz web (demo) linkini qo'yasiz.
export const projects = [
  {
    id: 11,
    title: "Davradosh — Multiplayer Party Games",
    titleUz: "Davradosh — Do'stlar Davrasida Onlayn O'yinlar",
    description:
      "Real-time multiplayer games for a circle of friends, no sign-up — share a link and play. Puzzle: up to 5 people assemble one jigsaw together on a PixiJS canvas with Figma-style named live cursors. Mafia: 6–12 player sport mafia with LiveKit voice chat, an automatic host, timed phases, fouls and game history; hidden roles never leave the server. Fastify + Socket.IO game server with Prisma/PostgreSQL in a pnpm + Turborepo monorepo, shared types and logic, Vitest suite, Docker Compose on a VPS.",
    descriptionUz:
      "Do'stlar davrasida o'ynaladigan real vaqtdagi onlayn o'yinlar, ro'yxatdan o'tmasdan — havolani ulashing va o'ynang. Puzzle: 5 kishigacha bitta puzzle'ni PixiJS canvas'da birga yig'adi, har kimning kursori Figmadagidek ismi bilan ko'rinadi. Mafia: 6–12 kishilik sport mafiasi — LiveKit ovozli chat, avtomatik boshlovchi, taymerli fazalar, fol va o'yin tarixi; yashirin rollar serverdan tashqariga chiqmaydi. Fastify + Socket.IO o'yin serveri, Prisma/PostgreSQL, pnpm + Turborepo monorepo, umumiy tip va mantiq, Vitest testlari, VPS'da Docker Compose.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "PixiJS",
      "Socket.IO",
      "LiveKit",
      "Fastify",
      "PostgreSQL",
      "WebSocket",
    ],
    link: null,
    liveLink: "https://davradosh.uz/",
    featured: true,
    color: "#A855F7",
    rotation: -1.8,
  },
  {
    id: 10,
    title: "Zareen Travel — Travel Agency Platform",
    titleUz: "Zareen Travel — Turizm Agentligi Platformasi",
    description:
      "Trilingual (uz/ru/en) site for an Uzbek travel agency: 90 statically generated pages, tour, visa and destination clusters, JSON-LD graph, hreflang and a generated sitemap. Lead pipeline runs as a server action forwarded to a self-hosted ingest service that writes to PostgreSQL and notifies Telegram. Scroll motion is pure CSS scroll-timeline (0 kB JS) and the WebGL globe loads only on approach; a CI budget keeps critical JS under 30 kB gz.",
    descriptionUz:
      "O'zbek turizm agentligi uchun uch tilli (uz/ru/en) sayt: 90 ta statik generatsiya qilingan sahifa, tur, viza va yo'nalish klasterlari, JSON-LD grafi, hreflang va generatsiya qilinadigan sitemap. Ariza oqimi server action orqali o'z serverdagi ingest xizmatiga uzatiladi — u PostgreSQL ga yozadi va Telegram ga xabar beradi. Skroll animatsiyalari sof CSS scroll-timeline (0 kB JS), WebGL globus esa faqat ekranga yaqinlashganda yuklanadi; CI byudjeti kritik JS ni 30 kB gz dan pastda ushlab turadi.",
    tags: [
      "Next.js 16",
      "TypeScript",
      "SSG",
      "i18n",
      "SEO",
      "PostgreSQL",
      "Telegram Bot",
      "three.js",
    ],
    link: null,
    liveLink: "https://zareentravel.javohir.ru/",
    featured: true,
    color: "#FF7810",
    rotation: 1.7,
  },
  {
    id: 1,
    title: "Enterprise Platform · DAS UTY",
    titleUz: "Enterprise Platforma · DAS UTY",
    description:
      "Large-scale enterprise system for Uzbekistan Railways — contact management, device administration, call campaigns, RBAC auth, and real-time WebSocket dashboards.",
    descriptionUz:
      "O'zbekiston Temir Yo'llari uchun katta ko'lamdagi enterprise tizim — kontakt boshqaruvi, qurilma administratsiyasi, chaqiruv kampaniyalari, RBAC va real-vaqt WebSocket panellari.",
    tags: ["Nuxt 3", "Vue 3", "TypeScript", "Pinia", "WebSocket"],
    link: null,
    liveLink: null,
    featured: true,
    color: "#FF2D78",
    rotation: -1.5,
  },
  {
    id: 2,
    title: "Hisobchi — AI Bill Splitter",
    titleUz: "Hisobchi — AI Hisob Bo'luvchi",
    description:
      "Telegram Mini App that reads a restaurant receipt with AI vision, lets everyone claim their own items in a live shared session, and splits tax & tip fairly. FastAPI + PostgreSQL backend, WebSocket host screen, Telegram auth and subscription payments.",
    descriptionUz:
      "Telegram Mini App: restoran chekini AI vision orqali o'qiydi, jonli umumiy sessiyada har kim o'z taomini belgilaydi, soliq va chaevoy adolatli bo'linadi. FastAPI + PostgreSQL backend, WebSocket host ekrani, Telegram auth va obuna to'lovlari.",
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Telegram Bot",
      "AI / LLM",
      "WebSocket",
    ],
    link: "https://github.com/jamshid17/hsbch",
    liveLink: "https://hsbch.uz/",
    featured: true,
    color: "#22C55E",
    rotation: 1.4,
  },
  {
    id: 3,
    title: "Nasiya — Debt Tracking SaaS",
    titleUz: "Nasiya — Qarz Kuzatuv SaaS",
    description:
      "Multi-tenant SaaS for shops that sell on credit: customers, debts, payment history, staff roles, Telegram reminder bot, Excel reports and Recharts dashboards. Next.js App Router with Prisma, NextAuth and Dockerised CI/CD.",
    descriptionUz:
      "Nasiyaga savdo qiladigan do'konlar uchun multi-tenant SaaS: mijozlar, qarzlar, to'lov tarixi, xodim rollari, Telegram eslatma boti, Excel hisobotlar va Recharts panellari. Next.js App Router, Prisma, NextAuth va Docker CI/CD.",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Telegram Bot",
    ],
    link: "https://github.com/johnkhasan/nasiya",
    liveLink: "https://nasiya.hsbch.uz/",
    featured: true,
    color: "#00D4C8",
    rotation: -1.1,
  },
  {
    id: 4,
    title: "Kartograf — Map Poster Studio",
    titleUz: "Kartograf — Xarita Poster Studiyasi",
    description:
      "Turn any city or coordinate into a styled map poster or wallpaper. 10 themes, print (A3–A5) and screen formats, toggleable OSM layers, custom markers and hand-drawn routes, exported up to 300 DPI from an off-screen high-resolution render.",
    descriptionUz:
      "Istalgan shahar yoki koordinatani uslubli xarita posteri yoki oboyiga aylantiradi. 10 ta mavzu, bosma (A3–A5) va ekran formatlari, OSM qatlamlari, belgilar va marshrutlar, 300 DPI gacha eksport.",
    tags: ["React", "TypeScript", "MapLibre", "Zustand", "Vite"],
    link: "https://github.com/johnkhasan/kartograf",
    liveLink: 'https://map.javohir.ru',
    featured: true,
    color: "#3B82F6",
    rotation: 1.9,
  },
  {
    id: 5,
    title: "Duel.uz — Social Voting",
    titleUz: "Duel.uz — Ijtimoiy Ovoz Berish",
    description:
      "Two options, one question, one tap. A social voting platform with Telegram-only sign-in, anonymous voting, shareable duel pages, an admin analytics dashboard, Redis rate limiting and a Vitest + Playwright test suite in a pnpm monorepo.",
    descriptionUz:
      "Ikki variant, bitta savol, bitta bosish. Telegram orqali kirish, anonim ovoz berish, ulashiladigan duel sahifalari, admin analitika paneli, Redis rate-limit va Vitest + Playwright testlari — pnpm monorepo'da.",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Telegram Bot",
      "i18n",
    ],
    link: "https://github.com/johnkhasan/dueluz",
    liveLink: 'https://duel.hsbch.uz/',
    featured: false,
    color: "#EC4899",
    rotation: -2,
  },
  {
    id: 6,
    title: "Aziz Rahimov — Digital Garden",
    titleUz: "Aziz Rahimov — Raqamli Bog'",
    description:
      "An Obsidian vault compiled into a Vue 3 knowledge site: markdown-it build pipeline, an interactive Cytoscape graph of linked notes, Fuse.js instant search, table of contents, reading progress, PWA and generated OG images.",
    descriptionUz:
      "Obsidian vault'i Vue 3 bilim saytiga aylantirilgan: markdown-it build pipeline, bog'langan qaydlarning Cytoscape grafi, Fuse.js tezkor qidiruv, mundarija, o'qish progressi, PWA va avtomatik OG rasmlar.",
    tags: ["Vue 3", "TypeScript", "Pinia", "Tailwind CSS", "i18n", "Vite"],
    link: "https://github.com/johnkhasan/aziz-rakhimov",
    liveLink: 'https://azizrakhimov.uz',
    featured: false,
    color: "#F59E0B",
    rotation: 1.2,
  },
  {
    id: 7,
    title: "Birthday Invitation",
    titleUz: "Tug'ilgan Kun Taklifnomasi",
    description:
      "Event invitation platform built on Fiverr: JWT authentication, event creation with media uploads, shareable invite links, and a guest greeting board with reviews. Reusable React components and an optimized client-side flow.",
    descriptionUz:
      "Fiverr uchun yaratilgan tadbir taklifnoma platformasi: JWT autentifikatsiya, media yuklash bilan tadbir yaratish, ulashiladigan taklif havolalari va mehmonlar tabrik doskasi. Qayta ishlatiladigan React komponentlari.",
    tags: ["React", "REST API", "Vite"],
    link: "https://github.com/johnkhasan/birthday-invitation",
    liveLink: null,
    featured: false,
    color: "#7C3AED",
    rotation: -1.6,
  },
  {
    id: 8,
    title: "UzToz Platform",
    titleUz: "UzToz Platformasi",
    description:
      "Contributed to frontend feature development — file upload/download workflows, REST API integration, and GitLab-based team collaboration.",
    descriptionUz:
      "Frontend funksiya ishlab chiqish — fayl yuklash/yuklab olish, REST API integratsiyasi va GitLab asosidagi jamoa hamkorligi.",
    tags: ["React", "REST API", "i18n"],
    link: null,
    liveLink: null,
    featured: false,
    color: "#FACC15",
    rotation: 2,
  },
  {
    id: 9,
    title: "Portfolio Website",
    titleUz: "Portfolio Sayti",
    description:
      "This very site — retro-futuristic synthwave portfolio built with React, GSAP, Framer Motion, and Styled-Components. Full i18n, dark mode, PWA.",
    descriptionUz:
      "Ana shu sayt — React, GSAP, Framer Motion va Styled-Components bilan qurilgan retro-futuristik synthwave portfolio. To'liq i18n, dark mode, PWA.",
    tags: ["React", "GSAP", "i18n", "Vite"],
    link: "https://github.com/johnkhasan/javohir",
    liveLink: "https://javohir.ru/",
    featured: false,
    color: "#FF2D78",
    rotation: -1.3,
  },
];
