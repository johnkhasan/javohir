import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

/**
 * Title, description, Open Graph, Twitter and JSON-LD live statically in
 * index.html — social preview crawlers don't run JavaScript, so tags injected
 * from React never reach them. The only thing that genuinely changes at
 * runtime is the document language, which follows the i18n switcher.
 */
export default function SEOHead() {
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('uz') ? 'uz' : 'en'

  return <Helmet htmlAttributes={{ lang }} />
}
