import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { M3 } from "@/lib/theme";

const CustomTooltip = ({ active, payload, label, symbol }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: M3.surfaceContainerHighest, border: `1px solid ${M3.outline}`, borderRadius: 12, padding: "10px 14px" }}>
        <p style={{ color: M3.onSurface, fontWeight: 600, marginBottom: 4 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.fill, fontSize: 13 }}>
            {p.name}: {symbol}{parseFloat(p.value).toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MoneyFlowChart({ data, symbol }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
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
        <Bar dataKey="income" fill={M3.primary} radius={[6, 6, 0, 0]} barSize={18} />
        <Bar dataKey="expenses" fill={M3.error} radius={[6, 6, 0, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
