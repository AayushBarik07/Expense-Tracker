import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

const AuthLayout = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme, toggleTheme, isDark } = useTheme();

  const carouselItems = [
    {
      icon: "👤",
      title: "Account & Security",
      description: "Manage your profile, passwords, and security settings with ease.",
      gradient: "from-blue-500 to-purple-600",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Decorative circles */}
          <div className="absolute top-8 right-12 w-8 h-8 rounded-full bg-purple-400/40 blur-sm"></div>
          <div className="absolute bottom-16 left-8 w-6 h-6 rounded-full bg-blue-400/40 blur-sm"></div>
          
          {/* Main card */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-44 bg-linear-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl p-4">
              {/* Avatar circle */}
              <div className="w-20 h-20 mx-auto mt-4 bg-linear-to-br from-blue-400 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-4xl">👤</div>
              </div>
              {/* Info lines */}
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-blue-400/60 rounded-full w-20 mx-auto"></div>
                <div className="h-2 bg-blue-400/60 rounded-full w-16 mx-auto"></div>
              </div>
              {/* Check badge */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      description: "Track your spending patterns and visualize your financial data.",
      gradient: "from-blue-600 to-cyan-500",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Decorative circles */}
          <div className="absolute top-4 right-8 w-10 h-10 rounded-full bg-blue-400/30 blur-sm"></div>
          <div className="absolute bottom-12 left-4 w-8 h-8 rounded-full bg-cyan-400/30 blur-sm"></div>
          
          {/* Main illustration */}
          <div className="absolute inset-0 flex items-center justify-center gap-3">
            {/* Mobile device */}
            <div className="w-20 h-32 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl shadow-xl p-2 relative z-10">
              {/* Header dots */}
              <div className="flex gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60"></div>
              </div>
              {/* Pie chart */}
              <div className="w-12 h-12 mx-auto mb-2 bg-linear-to-br from-pink-400 to-blue-400 rounded-full relative">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-pink-500 rounded-full" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              </div>
              {/* Lines */}
              <div className="space-y-1">
                <div className="h-1 bg-white/40 rounded w-10 mx-auto"></div>
                <div className="h-1 bg-white/40 rounded w-8 mx-auto"></div>
              </div>
              {/* Small chart icon */}
              <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-linear-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <div className="text-xs">📊</div>
              </div>
            </div>
            
            {/* Desktop chart */}
            <div className="w-28 h-32 bg-white rounded-2xl shadow-xl p-3 relative">
              {/* Header */}
              <div className="flex gap-1 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <div className="flex-1 h-1 bg-slate-200 rounded"></div>
              </div>
              {/* Bar chart */}
              <div className="flex items-end justify-around h-16 gap-1">
                <div className="w-2 h-8 bg-linear-to-t from-blue-500 to-blue-400 rounded-t"></div>
                <div className="w-2 h-12 bg-linear-to-t from-blue-500 to-blue-400 rounded-t"></div>
                <div className="w-2 h-6 bg-linear-to-t from-blue-500 to-blue-400 rounded-t"></div>
                <div className="w-2 h-10 bg-linear-to-t from-blue-500 to-blue-400 rounded-t"></div>
              </div>
              {/* Line graph */}
              <svg className="absolute bottom-3 right-3 w-16 h-8" viewBox="0 0 60 30">
                <path d="M 5 25 L 15 20 L 25 15 L 35 18 L 45 10 L 55 5" 
                      stroke="#5FD370" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "🛒",
      title: "Easy Checkout",
      description: "Quick and secure payment processing for all your transactions.",
      gradient: "from-pink-500 to-purple-600",
      illustration: (
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Decorative circles */}
          <div className="absolute top-12 left-8 w-10 h-10 rounded-full bg-blue-400/30 blur-sm"></div>
          <div className="absolute bottom-16 right-12 w-8 h-8 rounded-full bg-purple-400/30 blur-sm"></div>
          <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-pink-400/40 blur-sm"></div>
          
          {/* Main cart */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Soft glow background */}
            <div className="absolute w-40 h-40 bg-linear-to-br from-pink-300/40 to-purple-300/40 rounded-full blur-2xl"></div>
            
            {/* Shopping cart */}
            <div className="relative z-10">
              <svg className="w-36 h-36" viewBox="0 0 200 200" fill="none">
                {/* Cart body */}
                <path d="M140 100 L160 100 Q170 100 170 110 L170 140 Q170 150 160 150 L80 150 Q70 150 70 140 L70 110 Q70 100 80 100 L100 100" 
                      fill="url(#cartGradient)" 
                      stroke="url(#cartStroke)" 
                      strokeWidth="3"/>
                {/* Cart handle */}
                <path d="M50 80 Q50 60 70 60 L130 60 Q150 60 150 80" 
                      fill="none" 
                      stroke="url(#handleGradient)" 
                      strokeWidth="4" 
                      strokeLinecap="round"/>
                {/* Wheels */}
                <circle cx="90" cy="160" r="8" fill="url(#wheelGradient)"/>
                <circle cx="140" cy="160" r="8" fill="url(#wheelGradient)"/>
                
                <defs>
                  <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5FD370" />
                    <stop offset="100%" stopColor="#2f8f3f" />
                  </linearGradient>
                  <linearGradient id="cartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1c6d27" />
                    <stop offset="100%" stopColor="#0b3f12" />
                  </linearGradient>
                  <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5FD370" />
                    <stop offset="100%" stopColor="#2f8f3f" />
                  </linearGradient>
                  <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5FD370" />
                    <stop offset="100%" stopColor="#3fae52" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="w-screen h-screen flex transition-colors duration-300 bg-linear-to-br from-[#f7faf5] to-[#f1f6ef]">
      
      {/* LEFT SIDE DESIGN */}
      <div className="hidden md:flex w-[40vw] h-full flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 bg-linear-to-br from-[#113E02] via-[#0a2805] to-[#113E02]">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse bg-[#5FD3701f]"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl animate-pulse bg-[#5FD3702d]" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-2xl bg-white/5"></div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 py-16">
          
          {/* Carousel Card */}
          <div className="w-full max-w-md mb-12">
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all shadow-lg border border-white/30 group"
              >
                <svg className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all shadow-lg border border-white/30 group"
              >
                <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel Items */}
              <div className="relative overflow-hidden">
                {carouselItems.map((item, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-700 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 translate-x-0'
                        : index < currentSlide
                        ? 'opacity-0 -translate-x-full absolute inset-0'
                        : 'opacity-0 translate-x-full absolute inset-0'
                    }`}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl p-8 border border-white/60 hover:shadow-3xl transition-all duration-500">

                      {/* Illustration */}
                      <div className="mb-8">
                        {item.illustration}
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-3 text-[#113E02]">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#5f785a]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Caption Text */}
          <p className="text-base text-center max-w-md mb-10 leading-relaxed font-light px-4 text-[#e5f3e2]">
            Experience seamless expense tracking with powerful features designed for your financial success.
          </p>

          {/* Pagination Dots */}
          <div className="flex gap-2.5">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-white shadow-lg shadow-white/30'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80 hover:scale-125'
                }`}
              ></button>
            ))}
          </div>

        </div>
      </div>

      {/* RIGHT SIDE (AUTH CONTENT) */}
      <div className="w-full md:w-[60vw] px-8 sm:px-12 py-10 sm:py-12 overflow-y-auto flex flex-col relative transition-colors duration-300 bg-linear-to-b from-[#ffffff] to-[#f5faf3]">
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #5FD370 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-linear-to-b from-[#5FD370] to-[#2f8f3f] rounded-full"></div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-[#5FD370] to-[#C6DEC6] bg-clip-text text-transparent">
              Expense Tracker
            </h1>
          </div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="group relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#f2f8ef] hover:bg-[#e8f3e5] border-2 border-[#dce8d8]"
            aria-label="Toggle theme"
          >
            <div className="relative w-6 h-6">
              {/* Sun Icon */}
              <svg 
                className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                  isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="4" className="stroke-yellow-500" strokeWidth="2"/>
                <path className="stroke-yellow-500" strokeLinecap="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>
              </svg>
              
              {/* Moon Icon */}
              <svg 
                className={`absolute inset-0 w-full h-full transition-all duration-500 ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path className="stroke-blue-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            </div>
            
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[#113E02] text-[#e8f6e5]">
              {isDark ? 'Light mode' : 'Dark mode'}
            </span>
          </button>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          {children}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-auto pt-8 text-center">
          <div className="flex items-center justify-center gap-6 text-xs mb-3 text-[#6d8667]">
            <a href="#" className="font-medium transition-colors hover:text-[#113E02]">Privacy</a>
            <span className="w-1 h-1 rounded-full bg-[#c7d8c2]"></span>
            <a href="#" className="font-medium transition-colors hover:text-[#113E02]">Terms</a>
            <span className="w-1 h-1 rounded-full bg-[#c7d8c2]"></span>
            <a href="#" className="font-medium transition-colors hover:text-[#113E02]">Help</a>
          </div>
          <p className="text-xs flex items-center justify-center gap-1.5 text-[#6d8667]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            © 2026 Expense Tracker. Secure & encrypted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;