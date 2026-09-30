import React from "react";
import EmptyState from "../EmptyState/EmptyState";
import styles from "./TransactionList.module.css";

// Fallback-маппинг иконок для категорий (будет заменён на константы в фазе E)
const CATEGORY_ICONS = {
  salary: "💼",
  freelance: "💻",
  bonus: "🎁",
  debt_return: "🤝",
  deposit_interest: "🏦",
  gift: "🎀",
  groceries: "🛒",
  utilities: "💡",
  rent: "🏠",
  subscriptions: "📱",
  transport: "🚗",
  health: "💊",
  clothing: "👕",
  entertainment: "🎬",
  communication: "📞",
  other: "📦",
};

// Fallback-маппинг названий категорий
const CATEGORY_LABELS = {
  salary: "Зарплата",
  freelance: "Подработка",
  bonus: "Премия",
  debt_return: "Возврат долга",
  deposit_interest: "Проценты по вкладу",
  gift: "Подарок",
  groceries: "Продукты",
  utilities: "Коммуналка",
  rent: "Аренда",
  subscriptions: "Подписки",
  transport: "Транспорт",
  health: "Здоровье",
  clothing: "Одежда",
  entertainment: "Развлечения",
  communication: "Связь",
  other: "Прочее",
};

function TransactionList({ transactions = [], onEdit, onDelete }) {
  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Форматирование суммы
  const formatAmount = (amount, type) => {
    const formatted = new Intl.NumberFormat("ru-RU").format(amount ?? 0);
    return type === "income" ? `+${formatted} ₽` : `−${formatted} ₽`;
  };

  // Если транзакций нет — показываем заглушку
  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="Нет операций"
        description="Добавьте первую операцию, чтобы увидеть её здесь"
      />
    );
  }

  return (
    <div className={styles.list}>
      {transactions.map((transaction) => {
        const isIncome = transaction.type === "income";
        const icon = CATEGORY_ICONS[transaction.category] || "📦";
        const label =
          CATEGORY_LABELS[transaction.category] || transaction.category;

        return (
          <div key={transaction.id} className={styles.transaction}>
            <div
              className={`${styles.icon} ${
                isIncome ? styles.iconIncome : styles.iconExpense
              }`}
            >
              {icon}
            </div>

            <div className={styles.info}>
              <div className={styles.category}>{label}</div>
              <div className={styles.details}>
                <span className={styles.date}>
                  {formatDate(transaction.date)}
                </span>
                {transaction.comment && (
                  <>
                    <span>•</span>
                    <span className={styles.comment}>
                      {transaction.comment}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div
              className={`${styles.amount} ${
                isIncome ? styles.amountIncome : styles.amountExpense
              }`}
            >
              {formatAmount(transaction.amount, transaction.type)}
            </div>

            {(onEdit || onDelete) && (
              <div className={styles.actions}>
                {onEdit && (
                  <button
                    className={styles.actionButton}
                    onClick={() => onEdit(transaction)}
                    title="Редактировать"
                  >
                    ✏️
                  </button>
                )}
                {onDelete && (
                  <button
                    className={`${styles.actionButton} ${styles.actionButtonDelete}`}
                    onClick={() => onDelete(transaction.id)}
                    title="Удалить"
                  >
                    🗑️
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default TransactionList;
