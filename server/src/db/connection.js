import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем директорию текущего модуля
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь к JSON файлу базы данных
const dbPath = path.resolve(__dirname, '../../data/db.json');

// Дефолтная структура базы данных (добавлена коллекция users)
const defaultData = { 
  users: [],
  incomes: [], 
  expenses: [] 
};

// Переменная для хранения инстанса базы данных
let db = null;

/**
 * Инициализация базы данных (создаёт файл, если его нет)
 */
export const initializeDatabase = async () => {
  if (!db) {
    db = await JSONFilePreset(dbPath, defaultData);
    
    // Если коллекция users не существует (старая база), добавляем её
    if (!db.data.users) {
      db.data.users = [];
      await db.write();
    }
    
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