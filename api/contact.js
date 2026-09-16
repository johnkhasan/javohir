// Contact formasini Telegram botga uzatadi.
// Token faqat shu yerda — Vercel env var'idan o'qiladi, bundle'ga hech qachon tushmaydi.

const LIMITS = { name: 80, email: 120, message: 2000 }
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

// Telegram HTML parse_mode faqat shu uchtasini escape qilishni talab qiladi.
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID sozlanmagan')
    return res.status(500).json({ error: 'Not configured' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'Invalid JSON' })
    }
  }
  body = body ?? {}

  // Honeypot: odam bu maydonni ko'rmaydi, bot to'ldiradi. Jimgina tashlab yuboramiz.
  if (clean(body.website, 100)) return res.status(200).json({ ok: true })

  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const message = clean(body.message, LIMITS.message)

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const text = [
    '<b>📬 Portfolio — yangi xabar</b>',
    '',
    `<b>Ism:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    '',
    escapeHtml(message),
  ].join('\n')

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })

    if (!tg.ok) {
      console.error('Telegram sendMessage failed', tg.status, await tg.text())
      return res.status(502).json({ error: 'Delivery failed' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Telegram request threw', err)
    return res.status(502).json({ error: 'Delivery failed' })
  }
}
