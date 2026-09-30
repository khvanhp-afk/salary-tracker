import app from './src/app.js';
import { config } from './src/config/index.js';
import { initializeDatabase } from './src/db/connection.js';

const PORT = config.port;

// Функция запуска сервера
const startServer = async () => {
  try {
    // Дожидаемся инициализации JSON-базы данных
    await initializeDatabase();
    
    // Запускаем сервер
    app.listen(PORT, () => {
      console.log('🚀 ==================================');
      console.log(`✅ Salary Tracker API запущен`);
      console.log(`📍 Порт: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📚 API: http://localhost:${PORT}/api/v1`);
      console.log('🚀 ==================================');
    });
  } catch (error) {
    console.error('❌ Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

// Запускаем сервер
startServer();

// Обработка необработанных исключений
process.on('uncaughtException', (error) => {
  console.error('❌ Необработанное исключение:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Необработанный отказ промиса:', reason);
  process.exit(1);
});