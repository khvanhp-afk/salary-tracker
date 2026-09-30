import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
} from "../services/incomeService";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

// Контекст для данных
const DataContext = createContext(null);

/**
 * Хук для использования контекста данных
 * @returns {Object} Объект с данными и методами управления
 */
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

/**
 * Провайдер контекста данных
 */
export const DataProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка данных при монтировании
  useEffect(() => {
    const loadData = () => {
      try {
        setIncomes(getIncomes());
        setExpenses(getExpenses());
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Методы для доходов
  const handleAddIncome = (incomeData) => {
    const newIncome = addIncome(incomeData);
    setIncomes((prev) => [...prev, newIncome]);
    return newIncome;
  };

  const handleUpdateIncome = (id, incomeData) => {
    const updatedIncome = updateIncome(id, incomeData);
    if (updatedIncome) {
      setIncomes((prev) =>
        prev.map((inc) => (inc.id === id ? updatedIncome : inc)),
      );
    }
    return updatedIncome;
  };

  const handleDeleteIncome = (id) => {
    const success = deleteIncome(id);
    if (success) {
      setIncomes((prev) => prev.filter((inc) => inc.id !== id));
    }
    return success;
  };

  // Методы для расходов
  const handleAddExpense = (expenseData) => {
    const newExpense = addExpense(expenseData);
    setExpenses((prev) => [...prev, newExpense]);
    return newExpense;
  };

  const handleUpdateExpense = (id, expenseData) => {
    const updatedExpense = updateExpense(id, expenseData);
    if (updatedExpense) {
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? updatedExpense : exp)),
      );
    }
    return updatedExpense;
  };

  const handleDeleteExpense = (id) => {
    const success = deleteExpense(id);
    if (success) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }
    return success;
  };

  // Универсальный метод добавления транзакции
  const addTransaction = (transactionData) => {
    if (transactionData.type === "income") {
      return handleAddIncome(transactionData);
    } else {
      return handleAddExpense(transactionData);
    }
  };

  // Универсальный метод обновления транзакции
  const updateTransaction = (id, transactionData) => {
    if (transactionData.type === "income") {
      return handleUpdateIncome(id, transactionData);
    } else {
      return handleUpdateExpense(id, transactionData);
    }
  };

  // Универсальный метод удаления транзакции
  const deleteTransaction = (id, type) => {
    if (type === "income") {
      return handleDeleteIncome(id);
    } else {
      return handleDeleteExpense(id);
    }
  };

  const value = {
    incomes,
    expenses,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
