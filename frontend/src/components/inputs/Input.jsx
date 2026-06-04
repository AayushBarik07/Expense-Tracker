import React from 'react'

const Input = ({ label, placeholder, type = "text", value, onChange }) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold mb-2 text-[#C6DEC6]">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="ui-input"
      />
    </div>
  )
}

export default Input
