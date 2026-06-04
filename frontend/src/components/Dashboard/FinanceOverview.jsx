import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart.jsx';

const COLORS = ["#5FD370", "#3fae52", "#C6DEC6"]; 

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpenses },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 p-4">
        <h5 className="text-lg font-bold text-[#113E02]">Finance Overview</h5>
      </div>

      <CustomPieChart 
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  )
}

export default FinanceOverview
