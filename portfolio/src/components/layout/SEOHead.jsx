import { Helmet } from 'react-helmet-async'

export default function SEOHead({
  title = 'Javohir — Frontend Developer',
  description = 'Retro-futuristik dizayn va zamonaviy texnologiyalar bilan qurilgan portfolio.',
  image = '/og-image.png',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href="https://justsun.io" />
    </Helmet>
  )
}
