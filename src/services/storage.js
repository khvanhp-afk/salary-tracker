/**
 * Обёртка для работы с localStorage
 * Предоставляет безопасные методы для чтения, записи и удаления данных
 */

/**
 * Получение данных из localStorage
 * @param {string} key - Ключ для получения данных
 * @param {*} defaultValue - Значение по умолчанию, если данные не найдены
 * @returns {*} Распарсенные данные или значение по умолчанию
 */
export const storageGet = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Ошибка при чтении из localStorage (ключ: ${key}):`, error);
    return defaultValue;
  }
};

/**
 * Сохранение данных в localStorage
 * @param {string} key - Ключ для сохранения данных
 * @param {*} value - Данные для сохранения (будут сериализованы в JSON)
 * @returns {boolean} true, если сохранение успешно
 */
export const storageSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Ошибка при записи в localStorage (ключ: ${key}):`, error);
    return false;
  }
};

/**
 * Удаление данных из localStorage
 * @param {string} key - Ключ для удаления
 * @returns {boolean} true, если удаление успешно
 */
export const storageRemove = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Ошибка при удалении из localStorage (ключ: ${key}):`, error);
    return false;
  }
};

/**
 * Очистка всего localStorage
 * @returns {boolean} true, если очистка успешна
 */
export const storageClear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Ошибка при очистке localStorage:', error);
    return false;
  }
};

/**
 * Генерация уникального идентификатора (UUID)
 * @returns {string} Уникальный идентификатор
 */
export const generateId = () => {
  // Используем crypto.randomUUID() если доступен (современные браузеры)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback для старых браузеров
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Получение всех ключей из localStorage
 * @returns {string[]} Массив ключей
 */
export const storageKeys = () => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Ошибка при получении ключей из localStorage:', error);
    return [];
  }
};