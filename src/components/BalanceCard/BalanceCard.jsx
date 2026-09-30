import React from "react";
import styles from "./BalanceCard.module.css";

function BalanceCard({ title, amount, color = "balance" }) {
  // Форматирование суммы с разделителями тысяч
  const formattedAmount = new Intl.NumberFormat("ru-RU").format(amount ?? 0);

  // Выбор класса в зависимости от типа карточки
  const colorClass =
    color === "income"
      ? styles.cardIncome
      : color === "expense"
        ? styles.cardExpense
        : styles.cardBalance;

  return (
    <div className={`${styles.card} ${colorClass}`}>
      <p className={styles.title}>{title}</p>
      <p className={styles.amount}>{formattedAmount} ₽</p>
    </div>
  );
}

export default BalanceCard;
