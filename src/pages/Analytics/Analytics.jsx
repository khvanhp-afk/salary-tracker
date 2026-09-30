import React, { useState, useMemo } from "react";
import { useData } from "../../context/DataContext";
import {
  getByCategory,
  getMonthlySummary,
  getBalance,
} from "../../services/summaryService";
import { formatAmount } from "../../utils/formatters";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";
import styles from "./Analytics.module.css";

function Analytics() {
  const { incomes, expenses } = useData();
  const [period, setPeriod] = useState("month");

  const periods = [
    { id: "week", label: "Неделя" },
    { id: "month", label: "Месяц" },
    { id: "quarter", label: "Квартал" },
    { id: "year", label: "Год" },
  ];

  // Определяем количество месяцев для графика в зависимости от периода
  const monthsCount = useMemo(() => {
    switch (period) {
      case "week":
        return 1;
      case "month":
        return 1;
      case "quarter":
        return 3;
      case "year":
        return 12;
      default:
        return 6;
    }
  }, [period]);

  // Данные для круговой диаграммы (расходы по категориям)
  const categoryData = useMemo(() => {
    return getByCategory("expense");
  }, [expenses]);

  // Данные для столбчатого графика (доходы и расходы по месяцам)
  const monthlyData = useMemo(() => {
    return getMonthlySummary(monthsCount);
  }, [incomes, expenses, monthsCount]);

  // Сводная статистика
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return getBalance();
  }, [incomes, expenses]);

  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <h1 className={styles.title}>Аналитика</h1>
      </div>

      <div className={styles.periodSelector}>
        {periods.map((p) => (
          <button
            key={p.id}
            className={`${styles.periodButton} ${
              period === p.id ? styles.periodButtonActive : ""
            }`}
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Расходы по категориям</h2>
          <div className={styles.chartContainer}>
            <PieChart data={categoryData} />
          </div>
        </div>

        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Доходы и расходы по месяцам</h2>
          <div className={styles.chartContainer}>
            <BarChart data={monthlyData} />
          </div>
        </div>
      </div>

      <div className={styles.summarySection}>
        <h2 className={styles.summaryTitle}>Сводка за период</h2>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Общие доходы</span>
            <span
              className={`${styles.summaryValue} ${styles.summaryValueIncome}`}
            >
              {formatAmount(totalIncome)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Общие расходы</span>
            <span
              className={`${styles.summaryValue} ${styles.summaryValueExpense}`}
            >
              {formatAmount(totalExpense)}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Баланс</span>
            <span
              className={`${styles.summaryValue} ${styles.summaryValueBalance}`}
            >
              {formatAmount(balance)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
