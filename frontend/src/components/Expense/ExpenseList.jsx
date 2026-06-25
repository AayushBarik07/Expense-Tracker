import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard.jsx'
import { LuDownload } from 'react-icons/lu'
import moment from 'moment'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg text-primary-text">Expenses</h5>

        <button className="card-btn card-btn-outline" onClick={onDownload}>
          <LuDownload className="text-base mr-1" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => {
          return (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              amount={expense.amount}
              date={moment(expense.date).format('Do MMM YYYY')}
              type="expense"
              icon={expense.icon}
              onDelete={() => onDelete(expense._id)}
            />
          );
        })}
      </div>
    </div>
  )
}

export default ExpenseList