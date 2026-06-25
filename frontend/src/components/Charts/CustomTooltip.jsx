import React from 'react'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0]?.payload || {};
    const value = typeof payload[0]?.value === "number" ? payload[0].value : Number(payload[0]?.value || 0);

    return (
      <div className="bg-primary-card shadow-lg p-2 border border-[#d8e5d3] rounded">
        <p className="text-sm font-semibold text-accent-green mb-1">{data.name || payload[0]?.name || "Value"}</p>
        <p className="text-lg font-bold text-primary-text">${value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
}

export default CustomTooltip
