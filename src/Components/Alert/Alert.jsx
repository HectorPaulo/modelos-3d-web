import React, { useState, useEffect } from 'react';

const Alert = ({
  message,
  type = 'error', // 'error', 'success', 'info', 'warning'
  show = false,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);

    // Auto close functionality
    let autoCloseTimer;
    if (show && autoClose) {
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);
    }

    return () => {
      clearTimeout(autoCloseTimer);
    };
  }, [show, autoClose, autoCloseTime]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const alertStyles = {
    error: "bg-red-50 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-100",
    success: "bg-green-50 text-green-800 border-green-300 dark:bg-green-900/50 dark:text-green-100",
    info: "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-100",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-100",
  };

  const iconStyles = {
    error: "text-red-500",
    success: "text-green-500",
    info: "text-blue-500",
    warning: "text-yellow-500",
  };

  const icons = {
    error: (
      <svg className={`w-5 h-5 ${iconStyles[type]}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
      </svg>
    ),
    success: (
      <svg className={`w-5 h-5 ${iconStyles[type]}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    ),
    info: (
      <svg className={`w-5 h-5 ${iconStyles[type]}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
      </svg>
    ),
    warning: (
      <svg className={`w-5 h-5 ${iconStyles[type]}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
      </svg>
    ),
  };

  return (
    // Contenedor que ocupa toda la pantalla y centra la alerta
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semi-transparente para destacar la alerta */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={handleClose}></div>
      
      {/* Alerta centrada */}
      <div className={`relative animate-scaleIn max-w-md w-full mx-4 shadow-lg border rounded-lg ${alertStyles[type]} ${className}`}>
        <div className="flex items-center p-4">
          <div className="flex items-center">
            {icons[type]}
            <div className="ml-3 text-sm font-medium">
              {message}
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className={`ml-auto -mx-1.5 -my-1.5 ${iconStyles[type]} rounded-lg p-1.5 inline-flex h-8 w-8 hover:opacity-75`}
          >
            <span className="sr-only">Cerrar</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;