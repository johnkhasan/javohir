// Botga kelgan xabarlarni egasiga (TELEGRAM_CHAT_ID) uzatadi.
// Telegram bu endpoint'ga POST qiladi — setWebhook orqali bir marta ro'yxatdan o'tkaziladi.

const api = (token, method, payload) =>
  fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

// Telegram HTML parse_mode faqat shu uchtasini escape qilishni talab qiladi.
const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// "Ism Familiya (@username) · id: 123" ko'rinishidagi sarlavha.
const describeSender = (from, chat) => {
  const name = [from?.first_name, from?.last_name].filter(Boolean).join(' ') || chat?.title || 'Noma'
  const parts = [`<b>${escapeHtml(name)}</b>`]
  if (from?.username) parts.push(`@${escapeHtml(from.username)}`)
  if (from?.id) parts.push(`<a href="tg://user?id=${from.id}">id: ${from.id}</a>`)
  return parts.join(' · ')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const ownerId = process.env.TELEGRAM_CHAT_ID
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET
  if (!token || !ownerId || !secret) {
    console.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID / TELEGRAM_WEBHOOK_SECRET sozlanmagan')
    return res.status(500).json({ error: 'Not configured' })
  }

  // Faqat Telegram chaqira olishi uchun — setWebhook'dagi secret_token bilan solishtiramiz.
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  let update = req.body
  if (typeof update === 'string') {
    try {
      update = JSON.parse(update)
    } catch {
      return res.status(200).json({ ok: true })
    }
  }
  update = update ?? {}

  const msg = update.message ?? update.edited_message ?? update.channel_post
  // Telegram xatoda qayta-qayta urinadi — shuning uchun doim 200 qaytaramiz.
  if (!msg?.chat?.id) return res.status(200).json({ ok: true })

  // O'zimiz yozgan xabarni o'zimizga qaytarmaymiz (cheksiz halqa bo'lmasin).
  if (String(msg.chat.id) === String(ownerId)) return res.status(200).json({ ok: true })

  try {
    await api(token, 'sendMessage', {
      chat_id: ownerId,
      text: `🤖 <b>Botga yangi xabar</b>\n${describeSender(msg.from, msg.chat)}`,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    })

    // Forward — matn, rasm, fayl, ovoz… hammasi asl holida keladi.
    const fwd = await api(token, 'forwardMessage', {
      chat_id: ownerId,
      from_chat_id: msg.chat.id,
      message_id: msg.message_id,
    })

    // Foydalanuvchi forward'ni yopib qo'ygan bo'lsa — matnni oddiy nusxa qilib yuboramiz.
    if (!fwd.ok) {
      console.error('forwardMessage failed', fwd.status, await fwd.text())
      await api(token, 'copyMessage', {
        chat_id: ownerId,
        from_chat_id: msg.chat.id,
        message_id: msg.message_id,
      })
    }

    // Yozgan odamga qisqa javob — xabar yetib borganini bilsin.
    if (msg.text === '/start') {
      await api(token, 'sendMessage', {
        chat_id: msg.chat.id,
        text: 'Salom! 👋 Xabaringizni shu yerga yozing — Javohirga yetkazaman.',
      })
    }
  } catch (err) {
    console.error('Telegram relay threw', err)
  }

  return res.status(200).json({ ok: true })
}
