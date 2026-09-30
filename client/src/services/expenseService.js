import { get, post, put, del } from './api';

/**
 * Получение всех расходов
 * @returns {Promise<Array>} Массив расходов
 */
export const getExpenses = async () => {
  const response = await get('/expenses');
  return response.data || [];
};

/**
 * Получение расхода по ID
 * @param {string} id - Идентификатор расхода
 * @returns {Promise<Object|null>} Объект расхода или null
 */
export const getExpenseById = async (id) => {
  try {
    const response = await get(`/expenses/${id}`);
    return response.data || null;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return null;
    }
    throw error;
  }
};

/**
 * Добавление нового расхода
 * @param {Object} expenseData - Данные расхода
 * @returns {Promise<Object>} Созданный объект расхода
 */
export const addExpense = async (expenseData) => {
  const response = await post('/expenses', expenseData);
  return response.data;
};

/**
 * Обновление существующего расхода
 * @param {string} id - Идентификатор расхода
 * @param {Object} expenseData - Новые данные
 * @returns {Promise<Object|null>} Обновлённый объект расхода или null
 */
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await put(`/expenses/${id}`, expenseData);
    return response.data;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return null;
    }
    throw error;
  }
};

/**
 * Удаление расхода
 * @param {string} id - Идентификатор расхода
 * @returns {Promise<boolean>} true, если удаление успешно
 */
export const deleteExpense = async (id) => {
  try {
    await del(`/expenses/${id}`);
    return true;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return false;
    }
    throw error;
  }
};