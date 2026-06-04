import React from 'react'
import {
  PieChart,
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import CustomTooltip from './CustomTooltip.jsx';
import CustomLegend from './CustomLegend.jsx';

const CustomPieChart = ({
  data, 
  label,
  totalAmount,
  colors, 
  showTextAnchor
}) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={70}
          labelLine={false}
        >
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={colors[index % colors.length] } />;
          })}
        </Pie>
        <Tooltip content={CustomTooltip} />
        <Legend content={CustomLegend} />

        {/* <Tooltip />
        <Legend /> */}

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#6b8565"
              fontSize="14px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#113E02"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart;
