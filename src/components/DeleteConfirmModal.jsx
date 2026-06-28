import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Modal dialogue to prompt administrators for confirmation before user deletion.
 */
const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen || !user) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content confirm-dialog">
        <div className="modal-header">
          <h3 className="modal-title" style={{ color: 'var(--danger)' }}>
            Confirm Deletion
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close confirmation dialog">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: '1.5rem 1.25rem' }}>
          <div className="delete-warning-icon">
            <AlertTriangle size={32} />
          </div>
          <p className="confirm-text">
            Are you sure you want to delete administrator{' '}
            <strong>
              {user.firstName} {user.lastName}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="modal-footer" style={{ borderTop: 'none', padding: '1rem 1.25rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
