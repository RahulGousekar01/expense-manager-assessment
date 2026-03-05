"use client";

import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

interface Props {
  data: { category: string; total: number }[];
}

const COLORS = ["#1890ff", "#52c41a", "#faad14", "#f5222d", "#722ed1"];

export default function ExpenseCategoryChart({ data }: Props) {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
