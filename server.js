
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');

// Загрузка переменных окружения
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware для безопасности и производительности
app.use(helmet({
  contentSecurityPolicy: false, // Отключаем CSP для упрощения (в production лучше настроить)
}));
app.use(compression()); // Сжатие ответов

// Статические файлы из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

// Для SPA: отправляем index.html для всех путей
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`TESA Fun запущена на порту ${PORT}`);
});
