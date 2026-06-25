import React, { useState, useEffect } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper.js';
import CustomBarChart from '../Charts/CustomBarChart.jsx';
const Last300DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between mb-4 p-4">
        <h5 className="text-lg text-secondary-text">Last 300 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last300DaysExpenses
