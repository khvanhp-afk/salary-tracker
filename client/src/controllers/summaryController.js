import { getBalance, getByCategory, getByMonth } from '../services/summaryService.js';

/**
 * Получение общего баланса
 * GET /api/v1/summary
 */
export const getBalanceHandler = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const balance = await getBalance(startDate, endDate);

    res.json({
      data: balance,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение сумм по категориям
 * GET /api/v1/summary/by-category
 */
export const getByCategoryHandler = async (req, res, next) => {
  try {
    const { type = 'expense', startDate, endDate } = req.query;

    // Валидация типа
    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Параметр type должен быть "income" или "expense"',
        },
      });
    }

    const categoryData = await getByCategory(type, startDate, endDate);

    res.json({
      data: categoryData,
      type,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение помесячной сводки
 * GET /api/v1/summary/by-month
 */
export const getByMonthHandler = async (req, res, next) => {
  try {
    const { months = 6 } = req.query;

    // Валидация количества месяцев
    const monthsCount = Number(months);
    if (isNaN(monthsCount) || monthsCount < 1 || monthsCount > 24) {
      return res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Параметр months должен быть числом от 1 до 24',
        },
      });
    }

    const monthlyData = await getByMonth(monthsCount);

    res.json({
      data: monthlyData,
      monthsCount,
    });
  } catch (error) {
    next(error);
  }
};