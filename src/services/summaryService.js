import { getIncomes } from './incomeService';
import { getExpenses } from './expenseService';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/constants';

/**
 * Сервис для агрегации и анализа финансовых данных
 * Предоставляет функции для получения сводной информации, статистики по категориям и периодам
 */

/**
 * Получение общего баланса (доходы минус расходы)
 * @returns {Object} Объект с общей суммой доходов, расходов и балансом
 */
export const getBalance = () => {
  const incomes = getIncomes();
  const expenses = getExpenses();

  const totalIncome = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const balance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    balance,
  };
};

/**
 * Получение сумм по категориям для круговой диаграммы
 * @param {string} type - Тип операции ('income' или 'expense')
 * @returns {Array} Массив объектов для графика [{ name: 'Категория', value: 1000 }, ...]
 */
export const getByCategory = (type = 'expense') => {
  const transactions = type === 'income' ? getIncomes() : getExpenses();
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Группируем суммы по категориям
  const categorySums = {};
  (transactions || []).forEach((transaction) => {
    const categoryId = transaction.category;
    if (!categorySums[categoryId]) {
      categorySums[categoryId] = 0;
    }
    categorySums[categoryId] += transaction.amount || 0;
  });

  // Преобразуем в формат для графика
  return categories
    .map((category) => ({
      name: category.label,
      value: categorySums[category.id] || 0,
    }))
    .filter((item) => item.value > 0)
    .sort((a, b) => b.value - a.value);
};

/**
 * Получение помесячной сводки для столбчатого графика
 * @param {number} monthsCount - Количество месяцев для отображения (по умолчанию 6)
 * @returns {Array} Массив объектов для графика [{ month: 'Янв', income: 50000, expense: 30000 }, ...]
 */
export const getMonthlySummary = (monthsCount = 6) => {
  const incomes = getIncomes();
  const expenses = getExpenses();

  // Создаём массив последних N месяцев
  const months = [];
  const now = new Date();

  for (let i = monthsCount - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    months.push({
      year,
      month,
      label: date.toLocaleDateString('ru-RU', { month: 'short' }),
      income: 0,
      expense: 0,
    });
  }

  // Суммируем доходы по месяцам
  (incomes || []).forEach((income) => {
    const date = new Date(income.date);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthData = months.find((m) => m.year === year && m.month === month);
    if (monthData) {
      monthData.income += income.amount || 0;
    }
  });

  // Суммируем расходы по месяцам
  (expenses || []).forEach((expense) => {
    const date = new Date(expense.date);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthData = months.find((m) => m.year === year && m.month === month);
    if (monthData) {
      monthData.expense += expense.amount || 0;
    }
  });

  // Возвращаем в формате для графика
  return months.map((m) => ({
    month: m.label,
    income: m.income,
    expense: m.expense,
  }));
};

/**
 * Получение последних транзакций (доходы + расходы)
 * @param {number} limit - Количество транзакций (по умолчанию 5)
 * @returns {Array} Массив последних транзакций, отсортированных по дате
 */
export const getRecentTransactions = (limit = 5) => {
  const incomes = getIncomes();
  const expenses = getExpenses();

  // Объединяем и сортируем по дате (новые первые)
  const allTransactions = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return allTransactions;
};

/**
 * Получение всех транзакций с фильтрацией
 * @param {Object} filters - Объект фильтров
 * @param {string} filters.type - Тип операции ('all', 'income', 'expense')
 * @param {string} filters.category - ID категории ('all' или конкретный ID)
 * @returns {Array} Отфильтрованный массив транзакций
 */
export const getFilteredTransactions = (filters = {}) => {
  const incomes = getIncomes();
  const expenses = getExpenses();

  let transactions = [];

  // Фильтрация по типу
  if (filters.type === 'income') {
    transactions = incomes;
  } else if (filters.type === 'expense') {
    transactions = expenses;
  } else {
    transactions = [...incomes, ...expenses];
  }

  // Фильтрация по категории
  if (filters.category && filters.category !== 'all') {
    transactions = transactions.filter((t) => t.category === filters.category);
  }

  // Сортировка по дате (новые первые)
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};