import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { getDb } from '../db/connection.js';

/**
 * Регистрация нового пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль (в открытом виде)
 * @param {string} name - Имя пользователя
 * @returns {Promise<Object>} Созданный пользователь (без пароля)
 */
export const createUser = async (email, password, name) => {
  const db = getDb();
  
  // Проверяем, существует ли пользователь с таким email
  const existingUser = db.data.users.find((u) => u.email === email);
  if (existingUser) {
    const error = new Error('Пользователь с таким email уже существует');
    error.code = 'USER_EXISTS';
    throw error;
  }

  // Хешируем пароль
  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date().toISOString();

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    name,
    createdAt: now,
    updatedAt: now,
  };

  db.data.users.push(newUser);
  await db.write();

  // Возвращаем пользователя без пароля
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Получение пользователя по email
 * @param {string} email - Email пользователя
 * @returns {Promise<Object|null>} Пользователь или null
 */
export const getUserByEmail = async (email) => {
  const db = getDb();
  return db.data.users.find((u) => u.email === email) || null;
};

/**
 * Получение пользователя по ID
 * @param {string} id - ID пользователя
 * @returns {Promise<Object|null>} Пользователь или null
 */
export const getUserById = async (id) => {
  const db = getDb();
  const user = db.data.users.find((u) => u.id === id);
  if (!user) return null;
  
  // Возвращаем без пароля
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Проверка пароля
 * @param {Object} user - Объект пользователя (с хешированным паролем)
 * @param {string} password - Пароль для проверки
 * @returns {Promise<boolean>} true, если пароль верный
 */
export const validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};