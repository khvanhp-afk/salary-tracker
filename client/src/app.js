import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import incomesRouter from './routes/incomes.js';
import expensesRouter from './routes/expenses.js';
import summaryRouter from './routes/summary.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware для CORS (разрешаем запросы с фронтенда)
app.use(cors(config.cors));

// Middleware для парсинга JSON в теле запросов
app.use(express.json());

// Базовый маршрут для проверки работоспособности
app.get('/', (req, res) => {
  res.json({
    message: 'Salary Tracker API работает',
    version: '1.0.0',
    endpoints: {
      incomes: '/api/v1/incomes',
      expenses: '/api/v1/expenses',
      summary: '/api/v1/summary',
    },
  });
});

// Подключаем роуты
app.use('/api/v1/incomes', incomesRouter);
app.use('/api/v1/expenses', expensesRouter);
app.use('/api/v1/summary', summaryRouter);

// Обработчик для несуществующих маршрутов (404)
app.use(notFoundHandler);

// Централизованный обработчик ошибок (должен быть последним)
app.use(errorHandler);

export default app;