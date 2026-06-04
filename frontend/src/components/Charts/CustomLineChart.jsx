import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-4 border border-[#d8e5d3]">
          <p className="text-xs font-semibold text-[#5FD370] mb-1">{payload[0].payload.category}</p>
          <p className="text-sm font-medium text-[#113E02]">
            Amount: <span className="font-bold">${payload[0].payload.amount.toFixed(2)}</span>
          </p>
        </div>
      )
    }
    return null;
  };
   
  return (
    <div className="bg-[#f3f8f1] border border-[#d8e5d3] rounded-2xl p-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5FD370" stopOpacity={0.65}/>
              <stop offset="95%" stopColor="#5FD370" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(17, 62, 2, 0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: '#50714a', fontSize: 12 }} stroke="none" />
          <YAxis tick={{ fill: '#50714a', fontSize: 12 }} stroke="none" />
          <Tooltip content={CustomTooltip} />

          <Area type="monotone" dataKey="amount" stroke="#5FD370" fillOpacity={1} fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill:"#5FD370" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart;
