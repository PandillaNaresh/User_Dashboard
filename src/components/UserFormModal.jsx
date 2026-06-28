import React, { useState, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { validateUserForm } from '../utils/validation';

/**
 * Modals form to Add or Edit user details.
 * Contains frontend validation and pre-populates attributes in edit mode.
 */
const UserFormModal = ({ isOpen, onClose, onSave, currentUser }) => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepopulate if editing, reset if adding
  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setFormData({
          firstName: currentUser.firstName || '',
          lastName: currentUser.lastName || '',
          email: currentUser.email || '',
          department: currentUser.department || ''
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for that field on change
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Run client-side validations
    const formErrors = validateUserForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      // Errors handled by parent app
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal when clicking overlay background
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const departmentsList = [
    'Engineering',
    'Product',
    'Sales',
    'Marketing',
    'Finance',
    'HR',
    'Support'
  ];

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {currentUser ? 'Edit User Details' : 'Add New User'}
          </h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {Object.keys(errors).length > 0 && (
              <div className="error-alert-banner" style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                <div className="error-banner-content">
                  <p className="error-banner-title" style={{ fontSize: '0.85rem' }}>Validation Checklist Failed</p>
                  <p className="error-banner-desc" style={{ fontSize: '0.75rem' }}>Please correct the highlighted inputs below.</p>
                </div>
              </div>
            )}

            {/* First Name Field */}
            <div className="form-group">
              <label className="form-label form-label-required" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={`form-input ${errors.firstName ? 'is-invalid' : ''}`}
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. John"
                required
              />
              {errors.firstName && (
                <span className="invalid-feedback">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name Field */}
            <div className="form-group">
              <label className="form-label form-label-required" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={`form-input ${errors.lastName ? 'is-invalid' : ''}`}
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g. Doe"
                required
              />
              {errors.lastName && (
                <span className="invalid-feedback">{errors.lastName}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label form-label-required" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john.doe@company.com"
                required
              />
              {errors.email && (
                <span className="invalid-feedback">{errors.email}</span>
              )}
            </div>

            {/* Department Field */}
            <div className="form-group">
              <label className="form-label form-label-required" htmlFor="department">
                Department
              </label>
              <select
                id="department"
                name="department"
                className={`select-dropdown form-input ${errors.department ? 'is-invalid' : ''}`}
                value={formData.department}
                onChange={handleChange}
                style={{ width: '100%' }}
                required
              >
                <option value="">-- Choose Department --</option>
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <span className="invalid-feedback">{errors.department}</span>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : currentUser ? 'Update User' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
