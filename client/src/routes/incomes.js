import { Router } from 'express';
import {
  getIncomes,
  getIncome,
  addIncome,
  editIncome,
  removeIncome,
} from '../controllers/incomeController.js';
import { validateTransaction, validatePagination } from '../middleware/validate.js';

const router = Router();

/**
 * GET /api/v1/incomes
 * Получение списка всех доходов с фильтрами и пагинацией
 */
router.get('/', validatePagination, getIncomes);

/**
 * GET /api/v1/incomes/:id
 * Получение дохода по ID
 */
router.get('/:id', getIncome);

/**
 * POST /api/v1/incomes
 * Создание нового дохода
 */
router.post('/', validateTransaction('income'), addIncome);

/**
 * PUT /api/v1/incomes/:id
 * Обновление существующего дохода
 */
router.put('/:id', validateTransaction('income'), editIncome);

/**
 * DELETE /api/v1/incomes/:id
 * Удаление дохода
 */
router.delete('/:id', removeIncome);

export default router;