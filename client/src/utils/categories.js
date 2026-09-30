// Категории доходов
export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Зарплата' },
  { id: 'freelance', label: 'Подработка' },
  { id: 'bonus', label: 'Премия' },
  { id: 'debt_return', label: 'Возврат долга' },
  { id: 'deposit_interest', label: 'Проценты по вкладу' },
  { id: 'gift', label: 'Подарок' },
  { id: 'other', label: 'Прочее' },
];

// Категории расходов
export const EXPENSE_CATEGORIES = [
  { id: 'groceries', label: 'Продукты' },
  { id: 'utilities', label: 'Коммуналка' },
  { id: 'rent', label: 'Аренда' },
  { id: 'subscriptions', label: 'Подписки' },
  { id: 'transport', label: 'Транспорт' },
  { id: 'health', label: 'Здоровье' },
  { id: 'clothing', label: 'Одежда' },
  { id: 'entertainment', label: 'Развлечения' },
  { id: 'communication', label: 'Связь' },
  { id: 'other', label: 'Прочее' },
];

// Получение всех ID категорий доходов
export const INCOME_CATEGORY_IDS = INCOME_CATEGORIES.map((cat) => cat.id);

// Получение всех ID категорий расходов
export const EXPENSE_CATEGORY_IDS = EXPENSE_CATEGORIES.map((cat) => cat.id);

// Получение категории по ID
export const getCategoryById = (type, id) => {
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return categories.find((cat) => cat.id === id) || null;
};

// Получение всех категорий по типу
export const getCategoriesByType = (type) => {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
};