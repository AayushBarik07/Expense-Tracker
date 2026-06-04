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
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl hover:bg-[#f1f7ef] transition-colors border border-transparent hover:border-[#d8e5d2]">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-[#2f5528] bg-[#edf6ea] rounded-xl border border-[#d8e7d4]">
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
        <p className="text-sm font-medium text-[#113E02] truncate">{title}</p>
        <p className="text-xs text-[#6d8768] mt-0.5">{date}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold px-2 py-1 rounded-md border ${isIncome ? 'bg-[#e4f7e8] text-[#268537] border-[#ace0b5]' : 'bg-[#eff3ee] text-[#355a2f] border-[#d4e1d0]'}`}>
          {isIncome ? '+' : '-'}${amount}
        </span>
 
        {!hideDeleteBtn && (
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 text-[#89a084] hover:text-[#2a8f3b] transition-all"
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
