import React, { useState, useEffect } from "react";
import styles from "./TransactionForm.module.css";

// Fallback-категории — будут заменены на импорты из констант в фазе E
const FALLBACK_INCOME_CATEGORIES = [
  { id: "salary", label: "Зарплата" },
  { id: "freelance", label: "Подработка" },
  { id: "bonus", label: "Премия" },
  { id: "debt_return", label: "Возврат долга" },
  { id: "deposit_interest", label: "Проценты по вкладу" },
  { id: "gift", label: "Подарок" },
  { id: "other", label: "Прочее" },
];

const FALLBACK_EXPENSE_CATEGORIES = [
  { id: "groceries", label: "Продукты" },
  { id: "utilities", label: "Коммуналка" },
  { id: "rent", label: "Аренда" },
  { id: "subscriptions", label: "Подписки" },
  { id: "transport", label: "Транспорт" },
  { id: "health", label: "Здоровье" },
  { id: "clothing", label: "Одежда" },
  { id: "entertainment", label: "Развлечения" },
  { id: "communication", label: "Связь" },
  { id: "other", label: "Прочее" },
];

function TransactionForm({ onSubmit, onCancel, editData }) {
  const [type, setType] = useState(editData?.type || "expense");
  const [category, setCategory] = useState(editData?.category || "");
  const [amount, setAmount] = useState(editData?.amount ?? "");
  const [date, setDate] = useState(
    editData?.date || new Date().toISOString().split("T")[0],
  );
  const [comment, setComment] = useState(editData?.comment || "");

  // Получаем категории в зависимости от выбранного типа
  const categories =
    type === "income"
      ? FALLBACK_INCOME_CATEGORIES
      : FALLBACK_EXPENSE_CATEGORIES;

  // Сбрасываем категорию при смене типа
  useEffect(() => {
    setCategory("");
  }, [type]);

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category || !amount || !date) return;

    const transactionData = {
      type,
      category,
      amount: Number(amount),
      date,
      comment: comment.trim(),
    };

    onSubmit(transactionData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Переключатель типа операции */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Тип операции</label>
        <div className={styles.typeSelector}>
          <button
            type="button"
            className={`${styles.typeButton} ${
              type === "income" ? styles.typeButtonIncomeActive : ""
            }`}
            onClick={() => setType("income")}
          >
            Доход
          </button>
          <button
            type="button"
            className={`${styles.typeButton} ${
              type === "expense" ? styles.typeButtonExpenseActive : ""
            }`}
            onClick={() => setType("expense")}
          >
            Расход
          </button>
        </div>
      </div>

      {/* Категория и сумма */}
      <div className={styles.grid}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Категория</label>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Выберите категорию</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>Сумма (₽)</label>
          <input
            type="number"
            className={styles.input}
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      {/* Дата */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Дата</label>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      {/* Комментарий */}
      <div className={styles.fieldGroup}>
        <label className={styles.label}>Комментарий</label>
        <textarea
          className={styles.textarea}
          placeholder="Необязательное описание операции..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>

      {/* Кнопки действий */}
      <div className={styles.actions}>
        {onCancel && (
          <button
            type="button"
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
        <button
          type="submit"
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          {editData ? "Сохранить изменения" : "Добавить операцию"}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
