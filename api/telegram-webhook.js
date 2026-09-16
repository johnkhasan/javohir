// Botga kelgan xabarlarni egasiga (TELEGRAM_CHAT_ID) uzatadi va
// egasining reply'ini asl yuboruvchiga qaytaradi.
// Telegram bu endpoint'ga POST qiladi — setWebhook orqali bir marta ro'yxatdan o'tkaziladi.

const HEADER_MARK = '🤖'
const ID_RE = /id:\s*(\d+)/

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

// Egasi qaysi xabarga reply qilgan bo'lsa, o'shandan asl yuboruvchini aniqlaymiz.
const resolveTarget = (replied) => {
  if (!replied) return null

  // 1) Forward'ning o'ziga reply — yuboruvchi forward'ni yopmagan bo'lsa ishlaydi.
  const origin = replied.forward_origin
  if (origin?.type === 'user' && origin.sender_user?.id) return origin.sender_user.id
  if (replied.forward_from?.id) return replied.forward_from.id

  // 2) Sarlavhaga reply — "id: 123" ni o'zimiz yozganmiz, shuning uchun ishonchli.
  //    Faqat bot yozgan va bizning belgimiz bilan boshlanadigan xabarni o'qiymiz,
  //    aks holda odamning matnidagi tasodifiy "id: 5" ni target deb olib qo'yamiz.
  const text = replied.text ?? ''
  if (replied.from?.is_bot && text.startsWith(HEADER_MARK)) {
    const m = text.match(ID_RE)
    if (m) return Number(m[1])
  }

  return null
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

  const fromOwner = String(msg.chat.id) === String(ownerId)

  try {
    if (fromOwner) {
      // Egasining reply'i — asl yuboruvchiga qaytaramiz. Oddiy xabari e'tiborsiz qoladi.
      if (!msg.reply_to_message) return res.status(200).json({ ok: true })

      const target = resolveTarget(msg.reply_to_message)
      if (!target) {
        await api(token, 'sendMessage', {
          chat_id: ownerId,
          text: '⚠️ Kimga yuborishni aniqlay olmadim — bu odam forward\'ni yopib qo\'ygan. Yuqoridagi 🤖 sarlavha xabariga reply qiling.',
          reply_to_message_id: msg.message_id,
        })
        return res.status(200).json({ ok: true })
      }

      // copyMessage — xabar botdan kelganday ko'rinadi, sizning profilingiz ochilmaydi.
      const copy = await api(token, 'copyMessage', {
        chat_id: target,
        from_chat_id: ownerId,
        message_id: msg.message_id,
      })

      if (!copy.ok) {
        console.error('copyMessage to user failed', copy.status, await copy.text())
        await api(token, 'sendMessage', {
          chat_id: ownerId,
          text: '❌ Yuborilmadi — foydalanuvchi botni bloklagan yoki o\'chirgan bo\'lishi mumkin.',
          reply_to_message_id: msg.message_id,
        })
      } else {
        // Yetib borgani bilinsin — ortiqcha xabarsiz.
        await api(token, 'setMessageReaction', {
          chat_id: ownerId,
          message_id: msg.message_id,
          reaction: [{ type: 'emoji', emoji: '👍' }],
        })
      }

      return res.status(200).json({ ok: true })
    }

    // Begona odamdan kelgan xabar — egasiga uzatamiz.
    await api(token, 'sendMessage', {
      chat_id: ownerId,
      text: `${HEADER_MARK} <b>Botga yangi xabar</b>\n${describeSender(msg.from, msg.chat)}`,
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
