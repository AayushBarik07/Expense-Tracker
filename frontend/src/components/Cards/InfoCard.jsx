import React from 'react'
  
const InfoCard = ({ icon, label, value, color }) => {
  const isFeatured = label === "Total Balance";

  return (
    <div className={`flex gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${isFeatured ? "card-dark" : "border border-borders bg-primary-card shadow-lg"}`}>
      <div className={`w-12 h-12 flex items-center justify-center text-[24px] ${color.includes('text-') ? '' : 'text-primary-text'} ${color} rounded-xl shadow-[0_10px_20px_-10px_var(--accent-electric)]`}>
        {icon}
      </div > 
      <div>
        <h6 className={`text-sm mb-1 ${isFeatured ? "text-secondary-text" : "text-muted-text"}`}>{label}</h6>
        <span className={`text-[24px] font-extrabold ${isFeatured ? "text-primary-text" : "text-primary-text"}`}>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard;
