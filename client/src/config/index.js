import path from 'path';
import { fileURLToPath } from 'url';

// Получаем директорию текущего модуля (аналог __dirname в CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  // Порт, на котором будет запущен сервер
  port: process.env.PORT || 3001,
  
  // Настройки CORS для разрешения запросов с фронтенда
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Стандартный порт Vite
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },

  // Путь к файлу базы данных SQLite
  dbPath: path.resolve(__dirname, '../../data/database.sqlite'),
};