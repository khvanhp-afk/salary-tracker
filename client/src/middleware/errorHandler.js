/**
 * Централизованный обработчик ошибок Express
 * Форматирует все ошибки в единый формат ответа
 */

export const errorHandler = (err, req, res, next) => {
  // Логируем ошибку для отладки
  console.error('❌ Ошибка:', err.message);
  console.error(err.stack);

  // Определяем статус-код и сообщение
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || 'INTERNAL_ERROR';
  let message = err.message || 'Внутренняя ошибка сервера';

  // Обработка специфичных типов ошибок
  if (err.name === 'SyntaxError' && 'body' in err) {
    statusCode = 400;
    errorCode = 'INVALID_JSON';
    message = 'Некорректный формат JSON в теле запроса';
  }

  // Формируем ответ
  res.status(statusCode).json({
    error: {
      code: errorCode,
      message: message,
    },
  });
};

/**
 * Обработчик для несуществующих маршрутов (404)
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Маршрут ${req.method} ${req.path} не найден`,
    },
  });
};

/**
 * Создание кастомной ошибки с дополнительными свойствами
 * @param {string} message - Сообщение об ошибке
 * @param {number} statusCode - HTTP статус-код
 * @param {string} errorCode - Код ошибки для фронтенда
 */
export const createError = (message, statusCode = 500, errorCode = 'INTERNAL_ERROR') => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errorCode = errorCode;
  return error;
};