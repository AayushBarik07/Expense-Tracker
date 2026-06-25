import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuBell, LuSearch } from 'react-icons/lu';
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-3 z-40 flex gap-5 border border-borders bg-primary-card/95 backdrop-blur-xl px-4 py-3 items-center justify-between rounded-2xl shadow-lg">
      <button 
      className="block lg:hidden text-2xl text-primary-text rounded-lg p-1.5 hover:bg-[rgba(255,255,255,0.06)] transition-colors"
      onClick={() => {
        setIsMenuOpen(!isMenuOpen);
      }}
    >
      {isMenuOpen ? (
        <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-semibold tracking-wide text-primary-text">Expense Tracker</h2>

      <div className="hidden sm:flex items-center gap-2">
        <button className="w-9 h-9 rounded-full border border-borders bg-secondary-bg text-secondary-text flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors">
          <LuSearch className="text-base" />
        </button>
        <button className="w-9 h-9 rounded-full border border-borders bg-secondary-bg text-secondary-text flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors">
          <LuBell className="text-base" />
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="fixed top-[76px] left-0 w-full h-screen bg-app-bg/95 z-50 p-5 backdrop-blur-lg lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
