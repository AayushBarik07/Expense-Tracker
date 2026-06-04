import React from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
const CustomBarChart = ({ data = [] }) => {
  // FUnction to alternate bar-color based on index
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#5FD370" : "#3fae52";
  }

  // choose x axis key based on data shape (income uses 'month', expense uses 'category')
  const xKey = data && data.length && Object.prototype.hasOwnProperty.call(data[0], 'month')
    ? 'month'
    : 'category';

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]?.payload || {};
      const amount = Number(item.amount || 0);

      return  (
        <div className="bg-white shadow-lg rounded-lg p-2 border border-[#d8e5d3]">
          <p className="text-xs font-semibold text-[#5FD370] mb-1">{item[xKey] || "Expense"}</p>
          <p className="text-sm text-[#597353]">
            Amount: <span className="text-sm font-medium text-[#113E02]">${amount.toFixed(2)}</span>
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(17, 62, 2, 0.08)" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#50714a" }} stroke='none'/>
          <YAxis tick={{ fontSize: 12, fill: "#50714a" }} stroke='none'/>
          <Tooltip content={CustomToolTip} />
          <Legend />
          <Bar dataKey="amount" name="Amount" fill="#5FD370" radius={[10,10,0,0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
