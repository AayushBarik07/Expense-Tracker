import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import IncomeOverview from '../../components/Income/IncomeOverview.jsx'
import { API_PATHS } from '../../utils/apiPaths.js';
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance.js';
import Modal from '../../components/Modal.jsx';
import AddIncomeForm from '../../components/Income/AddIncomeForm.jsx';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList.jsx';
import { useUserAuth } from '../../hooks/useUserAuth.jsx';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // get All income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data) {
        setIncomeData(response.data);
      }
    }
    catch(error) {
      console.error("Something went wrong while fetching income details:", error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.setAttribute('download', 'income_details.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Income details downloaded successfully.');
    } catch (error) {
      console.error(
        'Something went wrong while downloading income details:',
        error.response?.data?.message || error.message
      );
      toast.error('Unable to download income details.');
    }
  };

  // Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon} = income;

    if(!source.trim()) {
      toast.error("SOurce is required.");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount, 
        date, 
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    }
    catch(error) {
      console.error("Something went wrong while adding income:", error.response?.data?.message || error.message);
    }
  };

  //Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success('Income deleted successfully.');
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        'Something went wrong while deleting income:',
        error.response?.data?.message || error.message
      );
      toast.error('Unable to delete income.');
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);


  return (
    <DashboardLayout activeMenu="Income">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview 
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList 
            transactions={incomeData}
            onDelete={deleteIncome}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal 
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome = {handleAddIncome} />

        </Modal>
      </div>

    </DashboardLayout>
  )
}

export default Income
