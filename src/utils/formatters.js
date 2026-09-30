/**
 * Форматирование суммы с разделителями тысяч и символом валюты
 * @param {number} amount - Сумма
 * @param {string} currency - Символ валюты (по умолчанию '₽')
 * @returns {string} Отформатированная строка
 */
export const formatAmount = (amount, currency = '₽') => {
  const formatted = new Intl.NumberFormat('ru-RU').format(amount ?? 0);
  return `${formatted} ${currency}`;
};

/**
 * Форматирование суммы с знаком (+ или -)
 * @param {number} amount - Сумма
 * @param {string} type - Тип операции ('income' или 'expense')
 * @returns {string} Отформатированная строка со знаком
 */
export const formatAmountWithSign = (amount, type) => {
  const formatted = new Intl.NumberFormat('ru-RU').format(amount ?? 0);
  const sign = type === 'income' ? '+' : '−';
  return `${sign}${formatted} ₽`;
};

/**
 * Форматирование даты в длинный читаемый формат
 * @param {string} dateString - Дата в формате ISO или timestamp
 * @returns {string} Отформатированная дата (например, "15 января 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/**
 * Форматирование даты в короткий формат
 * @param {string} dateString - Дата в формате ISO или timestamp
 * @returns {string} Отформатированная дата (например, "15.01.2024")
 */
export const formatShortDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Форматирование месяца для графиков
 * @param {string} dateString - Дата в формате ISO или timestamp
 * @returns {string} Отформатированный месяц (например, "Янв 2024")
 */
export const formatMonth = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Получение сегодняшней даты в формате YYYY-MM-DD
 * @returns {string} Дата в формате ISO (только дата)
 */
export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Проверка, является ли дата сегодня
 * @param {string} dateString - Дата для проверки
 * @returns {boolean} true, если дата сегодня
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};