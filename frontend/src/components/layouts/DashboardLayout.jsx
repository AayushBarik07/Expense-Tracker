import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext.jsx';
import Navbar from './Navbar.jsx'
import SideMenu from './SideMenu.jsx'


const DashboardLayout = ({children, activeMenu}) => {
  const { user } = useContext(UserContext);
  return (
    <div className='min-h-screen px-3 py-4 md:px-6 md:py-6'>
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className="flex gap-4 mt-4 lg:gap-6">
          <div className="hidden lg:block shrink-0 w-64">
            <SideMenu activeMenu={activeMenu}/>
          </div>

          <div className="flex-1 overflow-auto rounded-[26px] border border-[#dce8d8] bg-primary-card p-3 md:p-6 shadow-[0_20px_45px_-35px_rgba(17,62,2,0.32)]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout
