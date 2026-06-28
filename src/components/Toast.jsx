import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

/**
 * Toast item subcomponent containing auto-dismiss timer.
 */
const ToastItem = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000); // Auto dismiss after 4 seconds

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`toast ${type}`} role="alert">
      {type === 'success' ? (
        <CheckCircle size={18} className="toast-icon" style={{ color: 'var(--success)' }} />
      ) : (
        <AlertCircle size={18} className="toast-icon" style={{ color: 'var(--danger)' }} />
      )}
      <div className="toast-message">{message}</div>
      <button className="toast-close-btn" onClick={() => onClose(id)} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
};

/**
 * Renders multiple stacked toast alert notifications on the bottom right.
 * @param {Array} toasts Array of active toast messages
 * @param {Function} onClose Handler to dismiss a toast notification
 */
const Toast = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default Toast;
