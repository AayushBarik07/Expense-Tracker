import React from 'react'
import moment from 'moment';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard.jsx';

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 p-4">
        <h5 className="text-lg text-primary-text">Expenses</h5>
        <button onClick={onSeeMore} className="see-all-btn">
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions.slice(0, 5).map((expense) => {
          return (
            <TransactionInfoCard
              key={expense.id || expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('MMM D, YYYY')}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  )
}

export default ExpenseTransactions
