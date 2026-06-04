import React from 'react'
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper.js';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <div className="">
          <h3 className="text-lg font-semibold text-[#113E02]">Income Overview</h3>
          <p className="text-xs text-[#6d8768] mt-0.5">
            Track income, monitor growth, and gain financial insights.
          </p>
        </div>

        <button type="button" className="add-btn" onClick={onAddIncome}>
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>

      <div className="mt-10">
        {chartData && chartData.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <div className="p-6 rounded-xl border border-[#d8e5d3] bg-[#f2f8f0] text-[#5e7959]">
            No income data yet. Click "Add Income" to create your first record.
          </div>
        )}
      </div>
    </div>
  )
}

export default IncomeOverview
