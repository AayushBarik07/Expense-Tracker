import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuBell, LuSearch } from 'react-icons/lu';
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-3 z-40 flex gap-5 border border-[#d9e5d4] bg-white/95 backdrop-blur-xl px-4 py-3 items-center justify-between rounded-2xl shadow-[0_14px_35px_-28px_rgba(17,62,2,0.28)]">
      <button 
      className="block lg:hidden text-2xl text-[#113E02] rounded-lg p-1.5 hover:bg-[#5FD3701f] transition-colors"
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

      <h2 className="text-lg font-semibold tracking-wide text-[#113E02]">Expense Tracker</h2>

      <div className="hidden sm:flex items-center gap-2">
        <button className="w-9 h-9 rounded-full border border-[#d8e5d3] bg-[#f4f8f2] text-[#355a2f] flex items-center justify-center hover:bg-[#eaf2e8] transition-colors">
          <LuSearch className="text-base" />
        </button>
        <button className="w-9 h-9 rounded-full border border-[#d8e5d3] bg-[#f4f8f2] text-[#355a2f] flex items-center justify-center hover:bg-[#eaf2e8] transition-colors">
          <LuBell className="text-base" />
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="fixed top-[76px] left-0 w-full h-screen bg-[#f4f7f2f2] z-50 p-5 backdrop-blur-lg lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
