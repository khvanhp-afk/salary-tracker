import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, validatePassword } from '../services/userService.js';
import { createError } from '../middleware/errorHandler.js';

// Секретный ключ для JWT (в продакшене использовать переменную окружения)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

/**
 * Регистрация нового пользователя
 * POST /api/v1/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Валидация входных данных
    if (!email || !password || !name) {
      return next(createError('Все поля обязательны: email, password, name', 400, 'VALIDATION_ERROR'));
    }

    if (password.length < 6) {
      return next(createError('Пароль должен содержать минимум 6 символов', 400, 'VALIDATION_ERROR'));
    }

    // Создаём пользователя
    const user = await createUser(email, password, name);

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      data: {
        user,
        token,
      },
      message: 'Регистрация успешна',
    });
  } catch (error) {
    if (error.code === 'USER_EXISTS') {
      return next(createError(error.message, 409, 'USER_EXISTS'));
    }
    next(error);
  }
};

/**
 * Вход в систему
 * POST /api/v1/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Валидация входных данных
    if (!email || !password) {
      return next(createError('Email и пароль обязательны', 400, 'VALIDATION_ERROR'));
    }

    // Ищем пользователя
    const user = await getUserByEmail(email);
    if (!user) {
      return next(createError('Неверный email или пароль', 401, 'INVALID_CREDENTIALS'));
    }

    // Проверяем пароль
    const isValidPassword = await validatePassword(user, password);
    if (!isValidPassword) {
      return next(createError('Неверный email или пароль', 401, 'INVALID_CREDENTIALS'));
    }

    // Генерируем JWT токен
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Возвращаем пользователя без пароля
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      data: {
        user: userWithoutPassword,
        token,
      },
      message: 'Вход выполнен успешно',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Получение текущего пользователя (по токену)
 * GET /api/v1/auth/me
 */
export const getMe = async (req, res, next) => {
  try {
    // userId добавляется middleware authenticate
    const user = await getUserById(req.userId);
    
    if (!user) {
      return next(createError('Пользователь не найден', 404, 'NOT_FOUND'));
    }

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};