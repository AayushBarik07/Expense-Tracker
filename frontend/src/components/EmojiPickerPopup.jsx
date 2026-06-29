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
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-secondary-bg text-primary-text rounded-xl border border-borders">
          {icon ? (
            <span className="leading-none">{icon}</span>
          ) : (
            <LuImage />
          )}
        </div>

        <p className="text-sm text-secondary-text">{icon ? "Change Icon" : "Add Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button 
          type="button"
          className="w-7 h-7 flex items-center justify-center bg-primary-card border border-borders rounded-full absolute -top-3 -right-3 z-10 cursor-pointer text-secondary-text hover:bg-card-hover"
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
 