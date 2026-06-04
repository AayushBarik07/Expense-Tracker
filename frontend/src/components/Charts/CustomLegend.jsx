import React from 'react'

const CustomLegend = ({ payload }) => {
  if (!payload || !payload.length) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => {
          return (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-sm text-[#4e6f49] font-medium">{entry.value}</span>
          </div>
          );
        })}
      </div>
    </div>
  )
}

export default CustomLegend
