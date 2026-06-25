import React from 'react'
import {
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  amount,
  date,
  // description,
  type,
  icon,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === 'income';
  const isImageIcon = typeof icon === 'string' && /^https?:\/\//i.test(icon);

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-colors border border-transparent hover:border-accent-electric">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-accent-cyan bg-secondary-bg rounded-xl border border-borders">
        {icon ? (
          isImageIcon ? (
            <img src={icon} alt={title} className="w-6 h-6 object-contain" />
          ) : (
            <span className="text-xl leading-none">{icon}</span>
          )
        ) : (
          isIncome ? <LuTrendingUp /> : <LuTrendingDown />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary-text truncate">{title}</p>
        <p className="text-xs text-muted-text mt-0.5">{date}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded-md border ${isIncome ? 'bg-[rgba(22,163,74,0.1)] text-income-green border-[rgba(22,163,74,0.2)]' : 'bg-[rgba(220,38,38,0.1)] text-expense-red border-[rgba(220,38,38,0.2)]'}`}>
          {isIncome ? '+' : '-'}${amount}
        </span>
 
        {!hideDeleteBtn && (
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 text-muted-text hover:text-expense-red transition-all"
            onClick={onDelete}
            aria-label="Delete transaction"
          >
            <LuTrash2 className="text-lg" />
          </button>
        )}
      </div>

    </div>
  );
};

export default TransactionInfoCard;
