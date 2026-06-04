import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard.jsx';
import { LuDownload } from 'react-icons/lu';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg text-[#C6DEC6]">Income Sources</h5>

        <button className="card-btn card-btn-outline" onClick={onDownload}>
          <LuDownload className="text-base mr-1" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income) => {
          return (
          <TransactionInfoCard
            key={income._id}
            title={income.source}
            amount={income.amount}
            date={moment(income.date).format("Do MMM YYYY")}
            type="income"
            icon={income.icon}
            onDelete={() => onDelete(income._id)}
          />
          );
        })}
      </div> 
    </div>
  )
}

export default IncomeList
