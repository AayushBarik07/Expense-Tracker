import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart, ResponsiveContainer } from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary-card shadow-lg rounded-lg p-4 border border-borders">
          <p className="text-xs font-semibold text-accent-green mb-1">{payload[0].payload.category}</p>
          <p className="text-sm font-medium text-primary-text">
            Amount: <span className="font-bold">${payload[0].payload.amount.toFixed(2)}</span>
          </p>
        </div>
      )
    }
    return null;
  };
   
  return (
    <div className="bg-secondary-bg border border-borders rounded-2xl p-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--income-green)" stopOpacity={0.65}/>
              <stop offset="95%" stopColor="var(--income-green)" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} stroke='none'/>
          <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} stroke='none'/>
          <Tooltip content={CustomTooltip} />

          <Area type="monotone" dataKey="amount" stroke="var(--income-green)" fillOpacity={1} fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill:"var(--income-green)" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart;
