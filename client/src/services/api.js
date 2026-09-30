// Базовый URL из .env (Vite подхватывает автоматически)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

/**
 * Универсальная функция для выполнения HTTP-запросов
 * @param {string} path - Путь эндпоинта (например, '/incomes')
 * @param {Object} options - Опции запроса (method, body, params)
 * @returns {Promise<Object>} Распарсенный ответ от сервера
 */
const request = async (path, options = {}) => {
  const { method = 'GET', body = null, params = null } = options;

  // Формируем полный URL
  let url = `${BASE_URL}${path}`;

  // Добавляем query-параметры, если они есть
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Формируем заголовки
  const headers = {
    'Content-Type': 'application/json',
  };

  // Формируем тело запроса
  const fetchOptions = {
    method,
    headers,
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    // Выполняем запрос
    const response = await fetch(url, fetchOptions);

    // Парсим JSON-ответ
    const data = await response.json();

    // Проверяем, есть ли ошибка в ответе
    if (data.error) {
      const error = new Error(data.error.message || 'Ошибка сервера');
      error.code = data.error.code || 'UNKNOWN_ERROR';
      error.status = response.status;
      throw error;
    }

    // Проверяем HTTP-статус
    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }

    // Возвращаем данные (если есть поле data)
    return data.data !== undefined ? data : data;
  } catch (error) {
    // Обработка ошибок сети
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Не удалось подключиться к серверу. Проверьте, запущен ли бэкенд.');
    }
    throw error;
  }
};

/**
 * GET-запрос
 * @param {string} path - Путь эндпоинта
 * @param {Object} params - Query-параметры
 */
export const get = (path, params = null) => {
  return request(path, { method: 'GET', params });
};

/**
 * POST-запрос
 * @param {string} path - Путь эндпоинта
 * @param {Object} body - Тело запроса
 */
export const post = (path, body) => {
  return request(path, { method: 'POST', body });
};

/**
 * PUT-запрос
 * @param {string} path - Путь эндпоинта
 * @param {Object} body - Тело запроса
 */
export const put = (path, body) => {
  return request(path, { method: 'PUT', body });
};

/**
 * DELETE-запрос
 * @param {string} path - Путь эндпоинта
 */
export const del = (path) => {
  return request(path, { method: 'DELETE' });
};

export default { get, post, put, del };