import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx'
import { useUserAuth } from '../../hooks/useUserAuth.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard.jsx';
import { addThousandSeparator } from '../../utils/helper.js';
import RecentTransactions from '../../components/Dashboard/RecentTransactions.jsx';
import FinanceOverview from '../../components/Dashboard/FinanceOverview.jsx'; 
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions.jsx';
import Last300DaysExpenses from '../../components/Dashboard/Last300DaysExpenses.jsx';
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart.jsx';
import RecentIncome from '../../components/Dashboard/RecentIncome.jsx';

const Home = () => { 
  useUserAuth();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );

      if(response.data) {
        setDashboardData(response.data);
      }
    }
    catch(error) {
      console.error("Something went wrong while fetching dashboard data:", error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return; // wait for authenticated user
    fetchDashboardData();
    return () => {};
  }, [user]); 

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading && !dashboardData ? (
            <>
              <div className="h-[116px] rounded-2xl skeleton"></div>
              <div className="h-[116px] rounded-2xl skeleton"></div>
              <div className="h-[116px] rounded-2xl skeleton"></div>
            </>
          ) : (
            <>
          <InfoCard 
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary text-white"
          />

          <InfoCard 
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-secondary-bg border border-borders"
          />

          <InfoCard 
            icon={<LuHandCoins />}
            label="Total Expenses"
            value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-card-hover border border-borders"
          />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions 
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview 
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          /> 

          <ExpenseTransactions
            transactions={dashboardData?.expensesLast60Days?.transactions || []}
            onSeeMore={() => navigate("/expense")} 
          />
          <Last300DaysExpenses 
            data={dashboardData?.expensesLast60Days?.transactions || []}
          />

          <RecentIncomeWithChart 
            data={dashboardData?.incomeLast60Days?.transactions || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />

          <RecentIncome 
            transactions={dashboardData?.incomeLast60Days?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Home;
