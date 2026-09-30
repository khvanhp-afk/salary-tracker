import { storageGet, storageSet, generateId } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Сервис для работы с расходами
 * Предоставляет CRUD-операции для управления расходами в localStorage
 */

/**
 * Получение всех расходов
 * @returns {Array} Массив всех расходов
 */
export const getExpenses = () => {
  return storageGet(STORAGE_KEYS.EXPENSES, []);
};

/**
 * Получение расхода по ID
 * @param {string} id - Идентификатор расхода
 * @returns {Object|null} Объект расхода или null, если не найден
 */
export const getExpenseById = (id) => {
  const expenses = getExpenses();
  return expenses.find((expense) => expense.id === id) || null;
};

/**
 * Добавление нового расхода
 * @param {Object} expenseData - Данные расхода (без id)
 * @param {string} expenseData.category - ID категории
 * @param {number} expenseData.amount - Сумма
 * @param {string} expenseData.date - Дата в формате ISO
 * @param {string} expenseData.comment - Комментарий
 * @returns {Object} Созданный объект расхода с id
 */
export const addExpense = (expenseData) => {
  const expenses = getExpenses();

  const newExpense = {
    id: generateId(),
    type: 'expense',
    category: expenseData.category,
    amount: Number(expenseData.amount),
    date: expenseData.date,
    comment: expenseData.comment || '',
  };

  expenses.push(newExpense);
  storageSet(STORAGE_KEYS.EXPENSES, expenses);

  return newExpense;
};

/**
 * Обновление существующего расхода
 * @param {string} id - Идентификатор расхода для обновления
 * @param {Object} expenseData - Новые данные расхода
 * @returns {Object|null} Обновлённый объект расхода или null, если не найден
 */
export const updateExpense = (id, expenseData) => {
  const expenses = getExpenses();
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return null;

  const updatedExpense = {
    ...expenses[index],
    category: expenseData.category,
    amount: Number(expenseData.amount),
    date: expenseData.date,
    comment: expenseData.comment || '',
  };

  expenses[index] = updatedExpense;
  storageSet(STORAGE_KEYS.EXPENSES, expenses);

  return updatedExpense;
};

/**
 * Удаление расхода
 * @param {string} id - Идентификатор расхода для удаления
 * @returns {boolean} true, если удаление успешно
 */
export const deleteExpense = (id) => {
  const expenses = getExpenses();
  const filteredExpenses = expenses.filter((expense) => expense.id !== id);

  if (filteredExpenses.length === expenses.length) {
    return false; // Расход не найден
  }

  storageSet(STORAGE_KEYS.EXPENSES, filteredExpenses);
  return true;
};

/**
 * Удаление всех расходов
 * @returns {boolean} true, если очистка успешна
 */
export const clearAllExpenses = () => {
  storageSet(STORAGE_KEYS.EXPENSES, []);
  return true;
};