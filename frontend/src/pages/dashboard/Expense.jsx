import React from 'react'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import Modal from '../../components/Modal.jsx';
import AddExpenseForm from '../../components/Expense/AddExpenseForm.jsx';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList.jsx';
import ExpenseOverview from '../../components/Expense/ExpenseOverview.jsx';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data) {
        setExpenseData(response.data);
      }
    }
    catch(error) {
      console.error("Something went wrong while fetching expense details:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Expense details downloaded successfully.');
    } catch (error) {
      console.error(
        'Something went wrong while downloading expense details:',
        error.response?.data?.message || error.message
      );
      toast.error('Unable to download expense details.');
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success('Expense deleted successfully.');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Something went wrong while deleting expense:',
        error.response?.data?.message || error.message
      );
      toast.error('Unable to delete expense.');
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon} = expense;

    if(!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <=0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if(!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount, 
        date, 
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    }
    catch(error) {
      console.error("Something went wrong while adding expense:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={handleDeleteExpense}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
