import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from '../services/expenseService.js';
import { createError } from '../middleware/errorHandler.js';

/**
 * Получение списка всех расходов с фильтрами и пагинацией
 * GET /api/v1/expenses
 */
export const getExpenses = async (req, res, next) => {
  try {
    const { category, startDate, endDate, isRecurring, page = 1, limit = 20 } = req.query;

    const result = await getAllExpenses({
      category,
      startDate,
      endDate,
      isRecurring: isRecurring !== undefined ? isRecurring === 'true' : undefined,
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
 * Получение расхода по ID
 * GET /api/v1/expenses/:id
 */
export const getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await getExpenseById(id);

    if (!expense) {
      return next(createError('Расход не найден', 404, 'NOT_FOUND'));
    }

    res.json({ data: expense });
  } catch (error) {
    next(error);
  }
};

/**
 * Создание нового расхода
 * POST /api/v1/expenses
 */
export const addExpense = async (req, res, next) => {
  try {
    const { amount, date, category, comment, isRecurring } = req.body;

    const newExpense = await createExpense({
      amount,
      date,
      category,
      comment,
      isRecurring,
    });

    res.status(201).json({
      data: newExpense,
      message: 'Расход успешно создан',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Обновление существующего расхода
 * PUT /api/v1/expenses/:id
 */
export const editExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, date, category, comment, isRecurring } = req.body;

    const updatedExpense = await updateExpense(id, {
      amount,
      date,
      category,
      comment,
      isRecurring,
    });

    if (!updatedExpense) {
      return next(createError('Расход не найден', 404, 'NOT_FOUND'));
    }

    res.json({
      data: updatedExpense,
      message: 'Расход успешно обновлён',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Удаление расхода
 * DELETE /api/v1/expenses/:id
 */
export const removeExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await deleteExpense(id);

    if (!success) {
      return next(createError('Расход не найден', 404, 'NOT_FOUND'));
    }

    res.json({
      message: 'Расход успешно удалён',
    });
  } catch (error) {
    next(error);
  }
};