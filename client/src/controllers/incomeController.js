import {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
} from '../services/incomeService.js';
import { createError } from '../middleware/errorHandler.js';

/**
 * Получение списка всех доходов с фильтрами и пагинацией
 * GET /api/v1/incomes
 */
export const getIncomes = async (req, res, next) => {
  try {
    const { category, startDate, endDate, page = 1, limit = 20 } = req.query;

    const result = await getAllIncomes({
      category,
      startDate,
      endDate,
      page: Number(page),
      limit: Number(limit),
    });

    res.json({
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение дохода по ID
 * GET /api/v1/incomes/:id
 */
export const getIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const income = await getIncomeById(id);

    if (!income) {
      return next(createError('Доход не найден', 404, 'NOT_FOUND'));
    }

    res.json({ data: income });
  } catch (error) {
    next(error);
  }
};

/**
 * Создание нового дохода
 * POST /api/v1/incomes
 */
export const addIncome = async (req, res, next) => {
  try {
    const { amount, date, category, comment } = req.body;

    const newIncome = await createIncome({
      amount,
      date,
      category,
      comment,
    });

    res.status(201).json({
      data: newIncome,
      message: 'Доход успешно создан',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Обновление существующего дохода
 * PUT /api/v1/incomes/:id
 */
export const editIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, date, category, comment } = req.body;

    const updatedIncome = await updateIncome(id, {
      amount,
      date,
      category,
      comment,
    });

    if (!updatedIncome) {
      return next(createError('Доход не найден', 404, 'NOT_FOUND'));
    }

    res.json({
      data: updatedIncome,
      message: 'Доход успешно обновлён',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Удаление дохода
 * DELETE /api/v1/incomes/:id
 */
export const removeIncome = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await deleteIncome(id);

    if (!success) {
      return next(createError('Доход не найден', 404, 'NOT_FOUND'));
    }

    res.json({
      message: 'Доход успешно удалён',
    });
  } catch (error) {
    next(error);
  }
};