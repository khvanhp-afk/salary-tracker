import { INCOME_CATEGORY_IDS, EXPENSE_CATEGORY_IDS } from '../utils/categories.js';
import { createError } from './errorHandler.js';

/**
 * Middleware для валидации данных транзакции
 * @param {string} type - Тип транзакции ('income' или 'expense')
 * @returns {Function} Express middleware
 */
export const validateTransaction = (type) => {
  return (req, res, next) => {
    const { amount, date, category, comment } = req.body;

    // Проверка обязательных полей
    if (amount === undefined || amount === null) {
      return next(createError('Поле amount обязательно', 400, 'VALIDATION_ERROR'));
    }

    if (!date) {
      return next(createError('Поле date обязательно', 400, 'VALIDATION_ERROR'));
    }

    if (!category) {
      return next(createError('Поле category обязательно', 400, 'VALIDATION_ERROR'));
    }

    // Проверка типа amount
    if (typeof amount !== 'number' || isNaN(amount)) {
      return next(createError('Поле amount должно быть числом', 400, 'VALIDATION_ERROR'));
    }

    // Проверка amount > 0
    if (amount <= 0) {
      return next(createError('Поле amount должно быть больше 0', 400, 'VALIDATION_ERROR'));
    }

    // Проверка формата даты (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return next(createError('Поле date должно быть в формате YYYY-MM-DD', 400, 'VALIDATION_ERROR'));
    }

    // Проверка валидности даты
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return next(createError('Некорректная дата', 400, 'VALIDATION_ERROR'));
    }

    // Проверка категории
    const validCategories = type === 'income' ? INCOME_CATEGORY_IDS : EXPENSE_CATEGORY_IDS;
    if (!validCategories.includes(category)) {
      return next(
        createError(
          `Некорректная категория. Допустимые значения: ${validCategories.join(', ')}`,
          400,
          'VALIDATION_ERROR'
        )
      );
    }

    // Проверка comment (если передан)
    if (comment !== undefined && typeof comment !== 'string') {
      return next(createError('Поле comment должно быть строкой', 400, 'VALIDATION_ERROR'));
    }

    // Всё валидно — передаём управление дальше
    next();
  };
};

/**
 * Middleware для валидации параметров пагинации
 */
export const validatePagination = (req, res, next) => {
  const { page, limit } = req.query;

  if (page !== undefined) {
    const pageNum = parseInt(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return next(createError('Параметр page должен быть положительным числом', 400, 'VALIDATION_ERROR'));
    }
    req.query.page = pageNum;
  }

  if (limit !== undefined) {
    const limitNum = parseInt(limit);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return next(createError('Параметр limit должен быть числом от 1 до 100', 400, 'VALIDATION_ERROR'));
    }
    req.query.limit = limitNum;
  }

  next();
};