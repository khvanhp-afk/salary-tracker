import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Цвета для секторов диаграммы
const COLORS = [
  "#4f46e5",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#6366f1",
];

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
      📊
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
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const formattedValue = new Intl.NumberFormat("ru-RU").format(data.value);
    return (
      <div
        style={{
          backgroundColor: "var(--color-surface)",
          padding: "var(--spacing-sm) var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p style={{ fontWeight: 600, color: "var(--color-text)" }}>
          {data.name}
        </p>
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "var(--font-size-sm)",
          }}
        >
          {formattedValue} ₽
        </p>
      </div>
    );
  }
  return null;
};

function PieChart({ data = [], title }) {
  // Если данных нет — показываем заглушку
  if (!data || data.length === 0) {
    return <EmptyChart />;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {(data || []).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: "var(--font-size-sm)" }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;
