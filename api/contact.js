export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, phone, email, company, message, service } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Пожалуйста, заполните обязательные поля: Имя, Номер и Сообщение.' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('SERVER ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured');
    return res.status(500).json({ error: 'Внутренняя ошибка сервера: бот не сконфигурирован.' });
  }

  // Format the Telegram message
  const serviceText = service || 'Не указана';
  const textMsg = `📩 <b>Новая заявка на WebHub</b>\n\n` +
    `👤 <b>Имя:</b> ${name.trim()}\n` +
    `📞 <b>Телефон:</b> ${phone.trim()}\n` +
    `📧 <b>Email:</b> ${email ? email.trim() : 'Не указан'}\n` +
    `🏢 <b>Компания:</b> ${company ? company.trim() : 'Не указана'}\n` +
    `🛠 <b>Услуга:</b> ${serviceText}\n\n` +
    `💬 <b>Сообщение:</b>\n${message.trim()}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textMsg,
        parse_mode: 'HTML',
      }),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('Telegram API error:', data);
      return res.status(502).json({ error: `Telegram API error: ${data.description || 'Unknown error'}` });
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return res.status(500).json({ error: 'Не удалось отправить сообщение в Telegram.' });
  }
}
