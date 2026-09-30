import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем директорию текущего модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к JSON файлу базы данных
const dbPath = path.resolve(__dirname, '../../data/db.json');

// Дефолтная структура базы данных
const defaultData = { incomes: [], expenses: [] };

// Переменная для хранения инстанса базы данных
let db = null;

/**
 * Инициализация базы данных (создаёт файл, если его нет)
 */
export const initializeDatabase = async () => {
  if (!db) {
    db = await JSONFilePreset(dbPath, defaultData);
    console.log('✅ База данных (JSON) инициализирована успешно');
  }
  return db;
};

/**
 * Получение инстанса базы данных для использования в сервисах
 */
export const getDb = () => {
  if (!db) {
    throw new Error('База данных не инициализирована. Вызовите initializeDatabase() перед использованием.');
  }
  return db;
};