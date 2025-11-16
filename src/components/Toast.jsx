import React, { useEffect } from 'react';

const Toast = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1400);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div 
      role="alert" 
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        backgroundColor: type === 'success' ? '#10B981' : '#DC2626',
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 6px 18px rgba(12,18,31,0.12)',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
        animation: 'slideIn 150ms ease-out'
      }}
    >
      {message}
    </div>
  );
};

export default Toast;