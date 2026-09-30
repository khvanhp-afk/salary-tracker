import { get, post, put, del } from './api';

/**
 * Получение всех доходов
 * @returns {Promise<Array>} Массив доходов
 */
export const getIncomes = async () => {
  const response = await get('/incomes');
  return response.data || [];
};

/**
 * Получение дохода по ID
 * @param {string} id - Идентификатор дохода
 * @returns {Promise<Object|null>} Объект дохода или null
 */
export const getIncomeById = async (id) => {
  try {
    const response = await get(`/incomes/${id}`);
    return response.data || null;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return null;
    }
    throw error;
  }
};

/**
 * Добавление нового дохода
 * @param {Object} incomeData - Данные дохода
 * @returns {Promise<Object>} Созданный объект дохода
 */
export const addIncome = async (incomeData) => {
  const response = await post('/incomes', incomeData);
  return response.data;
};

/**
 * Обновление существующего дохода
 * @param {string} id - Идентификатор дохода
 * @param {Object} incomeData - Новые данные
 * @returns {Promise<Object|null>} Обновлённый объект дохода или null
 */
export const updateIncome = async (id, incomeData) => {
  try {
    const response = await put(`/incomes/${id}`, incomeData);
    return response.data;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return null;
    }
    throw error;
  }
};

/**
 * Удаление дохода
 * @param {string} id - Идентификатор дохода
 * @returns {Promise<boolean>} true, если удаление успешно
 */
export const deleteIncome = async (id) => {
  try {
    await del(`/incomes/${id}`);
    return true;
  } catch (error) {
    if (error.code === 'NOT_FOUND') {
      return false;
    }
    throw error;
  }
};