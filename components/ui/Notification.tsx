import React from 'react'


interface NotificationProps {
    message: string;
    visible: boolean;
    onClose: () => void;
  }
export const Notification: React.FC<NotificationProps> = ({message, onClose, visible}) => {
  return (
    <div
      className={`fixed top-4 right-4 bg-blue-500 text-white p-4 rounded transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
    <div className="flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white">
        &times;
      </button>
    </div>
  </div>
  )
}
