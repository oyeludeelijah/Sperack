import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { M3, CATEGORY_COLORS } from "@/lib/theme";

const CustomTooltip = ({ active, payload, symbol }) => {
  if (active && payload && payload.length) {
    const p = payload[0];
    return (
      <div style={{ background: M3.surfaceContainerHighest, border: `1px solid ${M3.outline}`, borderRadius: 12, padding: "10px 14px" }}>
        <p style={{ color: M3.onSurface, fontWeight: 600, marginBottom: 4 }}>{p.name}</p>
        <p style={{ color: p.payload?.fill || M3.primary, fontSize: 13 }}>
          {symbol}{parseFloat(p.value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function CategoryPieChart({ data, symbol }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip symbol={symbol} />} />
        <Legend
          formatter={(v) => <span style={{ color: M3.onSurfaceVariant, fontSize: 11 }}>{v}</span>}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
