import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-[#5FD3701f] text-[#5FD370] rounded-xl border border-[#5FD37045]">
          {icon ? (
            <span className="leading-none">{icon}</span>
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-sm text-[#C6DEC6b0]">{icon ? "Change Icon" : "Add Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button 
          type="button"
          className="w-7 h-7 flex item-center bg-[#0f2d07] border border-[#C6DEC649] rounded-full absolute -top-3 -right-3 z-10 cursor-pointer text-[#C6DEC6]"
          onClick={() => setIsOpen(false)}
        >
          <LuX />          
          </button> 

          <EmojiPicker 
            open={isOpen}
            onEmojiClick={(emoji) => onSelect(emoji?.emoji || emoji?.imageUrl || "")}
          />
        </div>
      )}
    </div>
  )
}

export default EmojiPickerPopup
 