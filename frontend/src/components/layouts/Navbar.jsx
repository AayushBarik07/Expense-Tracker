import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { LuBell, LuSearch } from 'react-icons/lu';
import SideMenu from './SideMenu';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({activeMenu}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2">
          <button className="w-9 h-9 rounded-full border border-borders bg-secondary-bg text-secondary-text flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <LuSearch className="text-base" />
          </button>
          <button className="w-9 h-9 rounded-full border border-borders bg-secondary-bg text-secondary-text flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <LuBell className="text-base" />
          </button>
        </div>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full border border-borders bg-secondary-bg text-secondary-text flex items-center justify-center hover:bg-[rgba(255,255,255,0.06)] transition-all duration-300 relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <svg 
            className={`absolute w-4 h-4 transition-all duration-500 ${
              isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="4" strokeWidth="2"/>
            <path strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
          </svg>
          
          <svg 
            className={`absolute w-4 h-4 transition-all duration-500 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
            }`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
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
