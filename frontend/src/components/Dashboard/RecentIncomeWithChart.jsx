import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart.jsx';

const COLORS = ["#5FD370", "#3fae52", "#C6DEC6", "#73e784", "#2f8f3f", "#8af69a", "#4ca95b", "#9bbf9b", "#6ed77d", "#2d7e39", "#b6d1b6", "#7fd88c"];
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
        <h2 className="text-lg font-semibold text-[#113E02]">Last 60 Days Income</h2>
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
