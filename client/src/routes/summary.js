import { Router } from 'express';
import {
  getBalanceHandler,
  getByCategoryHandler,
  getByMonthHandler,
} from '../controllers/summaryController.js';

const router = Router();

/**
 * GET /api/v1/summary
 * Получение общего баланса (доходы, расходы, разница)
 * Query-параметры: startDate, endDate (опционально)
 */
router.get('/', getBalanceHandler);

/**
 * GET /api/v1/summary/by-category
 * Получение сумм по категориям для круговой диаграммы
 * Query-параметры: type ('income' | 'expense'), startDate, endDate
 */
router.get('/by-category', getByCategoryHandler);

/**
 * GET /api/v1/summary/by-month
 * Получение помесячной сводки доходов и расходов
 * Query-параметры: months (количество последних месяцев, от 1 до 24)
 */
router.get('/by-month', getByMonthHandler);

export default router;