import { Router } from 'express';
import {
  getExpenses,
  getExpense,
  addExpense,
  editExpense,
  removeExpense,
} from '../controllers/expenseController.js';
import { validateTransaction, validatePagination } from '../middleware/validate.js';

const router = Router();

/**
 * GET /api/v1/expenses
 * Получение списка всех расходов с фильтрами и пагинацией
 */
router.get('/', validatePagination, getExpenses);

/**
 * GET /api/v1/expenses/:id
 * Получение расхода по ID
 */
router.get('/:id', getExpense);

/**
 * POST /api/v1/expenses
 * Создание нового расхода
 */
router.post('/', validateTransaction('expense'), addExpense);

/**
 * PUT /api/v1/expenses/:id
 * Обновление существующего расхода
 */
router.put('/:id', validateTransaction('expense'), editExpense);

/**
 * DELETE /api/v1/expenses/:id
 * Удаление расхода
 */
router.delete('/:id', removeExpense);

export default router;