import React from 'react'

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-app-bg/50 z-50 overflow-y-auto overflow-x-hidden">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content   */}
        <div className="relative rounded-2xl border border-borders bg-primary-card/85 backdrop-blur-xl shadow-2xl"> 
          {/* Modal Header  */}
          <div className="flex items-center justify-between p-5 border-b border-borders rounded-t-2xl">
            <h3 className="text-lg font-semibold text-primary-text">{title}</h3>
            <button type='button' onClick={onClose} className="text-secondary-text hover:bg-card-hover rounded-lg text-sm p-1.5 ml-auto inline-flex items-center cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
             </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5 space-y-4 text-primary-text">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
