import { get } from './api';

/**
 * Получение общего баланса (доходы минус расходы)
 * @returns {Promise<Object>} Объект с totalIncome, totalExpense, balance
 */
export const getBalance = async () => {
  const response = await get('/summary');
  return response.data;
};

/**
 * Получение сумм по категориям для круговой диаграммы
 * @param {string} type - Тип операции ('income' или 'expense')
 * @returns {Promise<Array>} Массив объектов для графика
 */
export const getByCategory = async (type = 'expense') => {
  const response = await get('/summary/by-category', { type });
  return response.data || [];
};

/**
 * Получение помесячной сводки для столбчатого графика
 * @param {number} monthsCount - Количество месяцев для отображения
 * @returns {Promise<Array>} Массив объектов для графика
 */
export const getMonthlySummary = async (monthsCount = 6) => {
  const response = await get('/summary/by-month', { months: monthsCount });
  return response.data || [];
};

/**
 * Получение последних транзакций (доходы + расходы)
 * @param {number} limit - Количество транзакций
 * @returns {Promise<Array>} Массив последних транзакций
 */
export const getRecentTransactions = async (limit = 5) => {
  // Получаем последние доходы и расходы отдельно, затем объединяем
  const [incomesResponse, expensesResponse] = await Promise.all([
    get('/incomes', { limit }),
    get('/expenses', { limit }),
  ]);

  const incomes = incomesResponse.data || [];
  const expenses = expensesResponse.data || [];

  // Объединяем и сортируем по дате (новые первые)
  const allTransactions = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return allTransactions;
};

/**
 * Получение всех транзакций с фильтрацией
 * @param {Object} filters - Объект фильтров
 * @returns {Promise<Array>} Отфильтрованный массив транзакций
 */
export const getFilteredTransactions = async (filters = {}) => {
  const { type = 'all', category = 'all' } = filters;

  let transactions = [];

  if (type === 'income') {
    const response = await get('/incomes', { category: category !== 'all' ? category : undefined });
    transactions = response.data || [];
  } else if (type === 'expense') {
    const response = await get('/expenses', { category: category !== 'all' ? category : undefined });
    transactions = response.data || [];
  } else {
    // Получаем и доходы, и расходы
    const [incomesResponse, expensesResponse] = await Promise.all([
      get('/incomes', { category: category !== 'all' ? category : undefined }),
      get('/expenses', { category: category !== 'all' ? category : undefined }),
    ]);

    const incomes = incomesResponse.data || [];
    const expenses = expensesResponse.data || [];
    transactions = [...incomes, ...expenses];
  }

  // Сортировка по дате (новые первые)
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};