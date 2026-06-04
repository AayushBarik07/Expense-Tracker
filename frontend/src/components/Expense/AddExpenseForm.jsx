import React, { useState } from 'react'
import Input from '../inputs/Input.jsx'
import EmojiPickerPopup from '../EmojiPickerPopup.jsx'

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: '',
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={(e) => handleChange('category', e.target.value)}
        label="Expense Category"
        placeholder="Food, Travel, Bills, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(e) => handleChange('date', e.target.value)}
        label="Date"
        placeholder="Select date"
        type="date"
      />

      <div className="flex justify-end mt-8">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm