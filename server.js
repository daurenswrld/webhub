import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup CORS so the React frontend (running on port 5173 or deployed elsewhere) can make requests to the backend
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, company, message, service } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Пожалуйста, заполните все обязательные поля.' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('SERVER ERROR: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in .env');
    return res.status(500).json({ error: 'Внутренняя ошибка сервера: бот не сконфигурирован.' });
  }

  // Format the Telegram message
  const serviceText = service || 'Не указана';
  const textMsg = `📩 <b>Новая заявка на WebHub</b>\n\n` +
    `👤 <b>Имя:</b> ${name.trim()}\n` +
    `📧 <b>Email:</b> ${email.trim()}\n` +
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
});

app.listen(PORT, () => {
  console.log(`WebHub Secure Backend running on port ${PORT}`);
});
