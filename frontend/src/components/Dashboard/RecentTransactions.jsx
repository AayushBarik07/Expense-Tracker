import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard.jsx'

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4 p-4">
        <h2 className="text-lg font-semibold text-primary-text">Recent Transactions</h2>
        <button 
          className="see-all-btn"
          onClick={onSeeMore}>
            See all <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0,5)?.map((item) => {
          return (
            <TransactionInfoCard
              key={item.id || item._id}
              title={item.type === 'expense' ? item.category : item.source}
              amount={item.amount}
              date={moment(item.date).format('MMM D, YYYY')}
              type={item.type}
              icon={item.icon}
              hideDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;
