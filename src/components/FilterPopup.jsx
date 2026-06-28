import React, { useState, useEffect } from 'react';
import { X, Filter, RefreshCw } from 'lucide-react';

/**
 * FilterPopup component. Renders as a sliding drawer on the right side.
 * Allows filtering users by multiple criteria cumulatively.
 */
const FilterPopup = ({ isOpen, onClose, filters, onApply, onClear }) => {
  const initialFilterState = {
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  };

  const [localFilters, setLocalFilters] = useState(initialFilterState);

  // Sync state with active filters when drawer opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        firstName: filters.firstName || '',
        lastName: filters.lastName || '',
        email: filters.email || '',
        department: filters.department || ''
      });
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    onApply(localFilters);
    onClose();
  };

  const handleClear = () => {
    setLocalFilters(initialFilterState);
    onClear();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'drawer-overlay') {
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
    <div className="drawer-overlay" onClick={handleOverlayClick}>
      <div className="drawer-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} className="text-primary" style={{ color: 'var(--primary)' }} />
            <h3 className="modal-title">Advanced Filters</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close filters drawer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="modal-body" style={{ flex: 1 }}>
            {/* Filter by First Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="filterFirstName">
                First Name
              </label>
              <input
                id="filterFirstName"
                name="firstName"
                type="text"
                className="form-input"
                value={localFilters.firstName}
                onChange={handleChange}
                placeholder="Search first name..."
              />
            </div>

            {/* Filter by Last Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="filterLastName">
                Last Name
              </label>
              <input
                id="filterLastName"
                name="lastName"
                type="text"
                className="form-input"
                value={localFilters.lastName}
                onChange={handleChange}
                placeholder="Search last name..."
              />
            </div>

            {/* Filter by Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="filterEmail">
                Email Address
              </label>
              <input
                id="filterEmail"
                name="email"
                type="text"
                className="form-input"
                value={localFilters.email}
                onChange={handleChange}
                placeholder="Search email address..."
              />
            </div>

            {/* Filter by Department */}
            <div className="form-group">
              <label className="form-label" htmlFor="filterDepartment">
                Department
              </label>
              <select
                id="filterDepartment"
                name="department"
                className="select-dropdown form-input"
                value={localFilters.department}
                onChange={handleChange}
                style={{ width: '100%' }}
              >
                <option value="">All Departments</option>
                {departmentsList.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer" style={{ marginTop: 'auto' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <RefreshCw size={14} /> Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterPopup;
