import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import { isSameDay } from "date-fns";
import { M3 } from "@/lib/theme";

const CustomTooltip = ({ active, payload, label, symbol }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: M3.surfaceContainerHighest, border: `1px solid ${M3.outline}`, borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: M3.onSurface, fontWeight: 600, marginBottom: 4 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill, fontSize: 13 }}>
          {p.name || (p.dataKey === "income" ? "Income" : "Expenses")}: {symbol}{parseFloat(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function WeeklyHistoryChart({ chartData, symbol, selectedDay, onSelectDay }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        onClick={(e) => {
          if (e?.activePayload?.length > 0) {
            const d = e.activePayload[0].payload.date;
            onSelectDay(d);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={M3.outlineAlpha44} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 11, fill: M3.onSurfaceVariant }}
          dy={8}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          style={{ fontSize: 11, fill: M3.onSurfaceVariant }}
        />
        <Tooltip content={<CustomTooltip symbol={symbol} />} cursor={{ fill: M3.primaryAlpha10 }} />
        <Bar dataKey="income" radius={[6, 6, 0, 0]} barSize={22} cursor="pointer">
          {chartData.map((entry, i) => (
            <Cell
              key={i}
              fill={selectedDay && isSameDay(selectedDay, entry.date) ? M3.onPrimaryContainer : M3.primary}
            />
          ))}
        </Bar>
        <Bar dataKey="expenses" radius={[6, 6, 0, 0]} barSize={22} cursor="pointer">
          {chartData.map((entry, i) => (
            <Cell
              key={i}
              fill={selectedDay && isSameDay(selectedDay, entry.date) ? "#FF6B6B" : M3.error}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
