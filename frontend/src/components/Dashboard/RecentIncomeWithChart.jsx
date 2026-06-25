import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart.jsx';

const COLORS = [
  "var(--accent-electric)",
  "var(--accent-cyan)",
  "var(--accent-violet)",
  "var(--accent-mint)",
  "#405CFF",
  "#0EA5E9",
  "#6D5BFF",
  "#14B8A6",
  "#6177FF",
  "#9DEEFF",
  "#7B61FF",
  "#B9FFF2"
];
const RecentIncomeWithChart = ({ data, totalIncome }) => {

  const [chartData, setChartData] = useState([]);
  
  const prepareCharData = () => {
    const dataArr = (data || []).map((item) => ({
      name: item?.source || "Income",
      amount: Number(item?.amount || 0),
    })).filter((item) => item.amount > 0);
    
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareCharData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-text">Last 60 Days Income</h2>
      </div>

      <CustomPieChart 
        data={chartData}
        label="Total Income"
        totalAmount={`Rs. ${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  )
}

export default RecentIncomeWithChart
