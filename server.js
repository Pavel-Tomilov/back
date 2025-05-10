const express = require('express');
const cors = require('cors');
const axios = require('axios'); // или используйте fetch
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Разрешаем запросы с фронта
app.use(express.json()); // Для парсинга JSON

// Токен бота (хранится ТОЛЬКО на сервере)
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

// Роут для отправки сообщения в Telegram
app.post('/api/send-message', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Формируем текст сообщения
        const text = `📌 Новая заявка:\n\n👤 Имя: ${name}\n📧 Email: ${email}\n📝 Сообщение: ${message}`;

        // Отправляем в Telegram
        const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text,
            parse_mode: "Markdown"
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Ошибка:", error);
        res.status(500).json({ success: false, error: "Ошибка отправки" });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});