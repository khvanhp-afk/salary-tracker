import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Заглушка для пустых данных
const EmptyChart = () => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-text-muted)",
      textAlign: "center",
      padding: "var(--spacing-xl)",
    }}
  >
    <div style={{ fontSize: "48px", marginBottom: "var(--spacing-md)" }}>
      📈
    </div>
    <p style={{ fontSize: "var(--font-size-md)", fontWeight: 500 }}>
      Нет данных для отображения
    </p>
    <p
      style={{
        fontSize: "var(--font-size-sm)",
        marginTop: "var(--spacing-xs)",
      }}
    >
      Добавьте операции, чтобы увидеть график
    </p>
  </div>
);

// Кастомный tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: "var(--color-text)",
            marginBottom: "var(--spacing-xs)",
          }}
        >
          {label}
        </p>
        {(payload || []).map((entry, index) => {
          const formattedValue = new Intl.NumberFormat("ru-RU").format(
            entry.value,
          );
          return (
            <p
              key={index}
              style={{
                color: entry.color,
                fontSize: "var(--font-size-sm)",
                margin: "var(--spacing-xs) 0",
              }}
            >
              {entry.name}: {formattedValue} ₽
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

function BarChart({ data = [], title }) {
  // Если данных нет — показываем заглушку
  if (!data || data.length === 0) {
    return <EmptyChart />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis
          dataKey="month"
          stroke="var(--color-text-muted)"
          style={{ fontSize: "var(--font-size-sm)" }}
        />
        <YAxis
          stroke="var(--color-text-muted)"
          style={{ fontSize: "var(--font-size-sm)" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          wrapperStyle={{ fontSize: "var(--font-size-sm)" }}
        />
        <Bar
          dataKey="income"
          name="Доходы"
          fill="var(--color-income)"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="expense"
          name="Расходы"
          fill="var(--color-expense)"
          radius={[8, 8, 0, 0]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;
