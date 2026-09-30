import { storageGet, storageSet, generateId } from './storage';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Сервис для работы с доходами
 * Предоставляет CRUD-операции для управления доходами в localStorage
 */

/**
 * Получение всех доходов
 * @returns {Array} Массив всех доходов
 */
export const getIncomes = () => {
  return storageGet(STORAGE_KEYS.INCOMES, []);
};

/**
 * Получение дохода по ID
 * @param {string} id - Идентификатор дохода
 * @returns {Object|null} Объект дохода или null, если не найден
 */
export const getIncomeById = (id) => {
  const incomes = getIncomes();
  return incomes.find((income) => income.id === id) || null;
};

/**
 * Добавление нового дохода
 * @param {Object} incomeData - Данные дохода (без id)
 * @param {string} incomeData.category - ID категории
 * @param {number} incomeData.amount - Сумма
 * @param {string} incomeData.date - Дата в формате ISO
 * @param {string} incomeData.comment - Комментарий
 * @returns {Object} Созданный объект дохода с id
 */
export const addIncome = (incomeData) => {
  const incomes = getIncomes();

  const newIncome = {
    id: generateId(),
    type: 'income',
    category: incomeData.category,
    amount: Number(incomeData.amount),
    date: incomeData.date,
    comment: incomeData.comment || '',
  };

  incomes.push(newIncome);
  storageSet(STORAGE_KEYS.INCOMES, incomes);

  return newIncome;
};

/**
 * Обновление существующего дохода
 * @param {string} id - Идентификатор дохода для обновления
 * @param {Object} incomeData - Новые данные дохода
 * @returns {Object|null} Обновлённый объект дохода или null, если не найден
 */
export const updateIncome = (id, incomeData) => {
  const incomes = getIncomes();
  const index = incomes.findIndex((income) => income.id === id);

  if (index === -1) return null;

  const updatedIncome = {
    ...incomes[index],
    category: incomeData.category,
    amount: Number(incomeData.amount),
    date: incomeData.date,
    comment: incomeData.comment || '',
  };

  incomes[index] = updatedIncome;
  storageSet(STORAGE_KEYS.INCOMES, incomes);

  return updatedIncome;
};

/**
 * Удаление дохода
 * @param {string} id - Идентификатор дохода для удаления
 * @returns {boolean} true, если удаление успешно
 */
export const deleteIncome = (id) => {
  const incomes = getIncomes();
  const filteredIncomes = incomes.filter((income) => income.id !== id);

  if (filteredIncomes.length === incomes.length) {
    return false; // Доход не найден
  }

  storageSet(STORAGE_KEYS.INCOMES, filteredIncomes);
  return true;
};

/**
 * Удаление всех доходов
 * @returns {boolean} true, если очистка успешна
 */
export const clearAllIncomes = () => {
  storageSet(STORAGE_KEYS.INCOMES, []);
  return true;
};