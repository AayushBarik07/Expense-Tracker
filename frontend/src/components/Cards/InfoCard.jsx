import React from 'react'
  
const InfoCard = ({ icon, label, value, color }) => {
  const isFeatured = label === "Total Balance";

  return (
    <div className={`flex gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${isFeatured ? "card-dark" : "border border-[#dbe8d6] bg-white shadow-[0_14px_30px_-24px_rgba(17,62,2,0.22)]"}`}>
      <div className={`w-12 h-12 flex items-center justify-center text-[24px] ${isFeatured ? "text-[#05210b]" : "text-[#113E02]"} ${color} rounded-xl shadow-[0_14px_22px_-18px_rgba(95,211,112,0.7)]`}>
        {icon}
      </div > 
      <div>
        <h6 className={`text-sm mb-1 ${isFeatured ? "text-[#C6DEC6]" : "text-[#587452]"}`}>{label}</h6>
        <span className={`text-[24px] font-extrabold ${isFeatured ? "text-white" : "text-[#113E02]"}`}>${value}</span>
      </div>
    </div>
  )
}

export default InfoCard;
