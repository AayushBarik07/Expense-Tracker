import React from 'react'
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart.jsx';
import { prepareExpenseLineChartData } from '../../utils/helper.js';
import { useState, useEffect } from 'react';

const ExpenseOverview = ( { transactions, onAddExpense } ) => {
  const [charData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  // const navigate = useNavigate();

  return (
    <div className="card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div className="max-w-2xl">
          <h5 className="text-lg font-bold text-secondary-text mb-2">Expense Overview</h5>
          <p className="text-sm leading-6 text-[#C6DEC6b0]">
            Visualize your spending over time, identify trends, and cut unnecessary costs so you can make informed decisions and manage your budget effortlessly.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddExpense}
          className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-accent-green via-[#4fbc60] to-[#2f8f3f] px-5 py-4 text-[#031607] shadow-lg shadow-[#5FD3703d] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#5FD3704f] focus:outline-none focus:ring-2 focus:ring-[#5FD37080] focus:ring-offset-2 focus:ring-offset-[#0a1f06]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#05240b2b]">
            <LuPlus className="text-xl" />
          </span>
          <span className="text-sm font-semibold tracking-wide">Add Expense</span>
        </button>
      </div>


      <div className="mt-6">
        {/* Chart component will go here, using charData for visualization */}
        <CustomLineChart data={charData} />
      </div>
    </div>
  )
}

export default ExpenseOverview
