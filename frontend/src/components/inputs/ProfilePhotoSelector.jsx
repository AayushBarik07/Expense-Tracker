import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update the image state in the parent component
      setImage(file);

      // Create a preview URL
      const preview = URL.createObjectURL(file);
      setPreview(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input type="file"
        accept='image/jpeg,image/jpg,image/png,image/webp'
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className='w-20 h-20 rounded-full bg-[#5FD3701f] border border-[#5FD37055] flex items-center justify-center relative cursor-pointer hover:bg-[#5FD3702e] transition-colors' onClick={onChooseFile}>
          <LuUser className='text-4xl text-secondary-text' />

          <button 
            type='button'
            className='w-8 h-8 rounded-full bg-accent-green flex items-center justify-center absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 shadow-lg cursor-pointer'
            onClick={onChooseFile}
          >
            <LuUpload className='text-[#032109]' />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img src={preview} 
            alt="profile photo" 
            className='w-20 h-20 rounded-full object-cover border-2 border-[#5FD37066]'
          />

          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 rounded-full bg-[#113E02] text-secondary-text border border-[#C6DEC655] shadow-lg cursor-pointer hover:bg-[#5FD3701f] transition-colors'
            onClick={handleRemoveImage}
          >
            <LuTrash className='' />
          </button>
        </div>  
      )}
    </div>
  )
}

export default ProfilePhotoSelector
