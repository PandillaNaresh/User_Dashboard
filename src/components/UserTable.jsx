import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown, Edit, Trash2 } from 'lucide-react';

/**
 * Maps department names to their custom badge CSS classes.
 */
const getDeptBadgeClass = (dept) => {
  if (!dept) return 'badge badge-dept';
  const clean = dept.toLowerCase().trim();
  if (clean === 'engineering') return 'badge badge-engineering';
  if (clean === 'sales') return 'badge badge-sales';
  if (clean === 'marketing') return 'badge badge-marketing';
  if (clean === 'finance') return 'badge badge-finance';
  if (clean === 'hr') return 'badge badge-hr';
  if (clean === 'support') return 'badge badge-support';
  if (clean === 'product') return 'badge badge-product';
  return 'badge badge-dept';
};

/**
 * UserTable component. Renders desktop HTML table and mobile details list card.
 * Handles sorting headers interaction and CRUD button click handlers.
 */
const UserTable = ({
  users = [],
  onEdit,
  onDelete,
  sortBy,
  sortOrder,
  onSort
}) => {
  // Renders the sort indicator icon based on active sort state
  const renderSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown size={14} style={{ opacity: 0.5 }} />;
    }
    return sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">No Users Found</p>
        <p className="empty-subtitle">Try adjusting your filters, search terms, or add a new administrator.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content-card">
      {/* 1. Desktop & Tablet View (Responsive HTML Table) */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="th" onClick={() => onSort('id')} style={{ width: '80px' }}>
                <div className="th-inner">ID {renderSortIcon('id')}</div>
              </th>
              <th className="th" onClick={() => onSort('firstName')}>
                <div className="th-inner">First Name {renderSortIcon('firstName')}</div>
              </th>
              <th className="th" onClick={() => onSort('lastName')}>
                <div className="th-inner">Last Name {renderSortIcon('lastName')}</div>
              </th>
              <th className="th" onClick={() => onSort('email')}>
                <div className="th-inner">Email {renderSortIcon('email')}</div>
              </th>
              <th className="th" onClick={() => onSort('department')}>
                <div className="th-inner">Department {renderSortIcon('department')}</div>
              </th>
              <th className="th" style={{ cursor: 'default', width: '120px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="tr">
                <td className="td td-id">#{user.id}</td>
                <td className="td td-name">{user.firstName}</td>
                <td className="td td-name">{user.lastName}</td>
                <td className="td td-email">{user.email}</td>
                <td className="td">
                  <span className={getDeptBadgeClass(user.department)}>
                    {user.department}
                  </span>
                </td>
                <td className="td td-actions">
                  <button
                    className="btn-icon-only primary"
                    onClick={() => onEdit(user)}
                    title={`Edit ${user.firstName}`}
                    aria-label={`Edit ${user.firstName}`}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn-icon-only danger"
                    onClick={() => onDelete(user)}
                    title={`Delete ${user.firstName}`}
                    aria-label={`Delete ${user.firstName}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Mobile View (Card-based list for smaller viewports) */}
      <div className="mobile-cards-container">
        {users.map((user) => (
          <div key={user.id} className="user-mobile-card">
            <div className="mobile-card-row">
              <span className="mobile-card-label">ID</span>
              <span className="td-id">#{user.id}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-card-label">First Name</span>
              <span className="mobile-card-value td-name">{user.firstName}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-card-label">Last Name</span>
              <span className="mobile-card-value td-name">{user.lastName}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-card-label">Email</span>
              <span className="mobile-card-value">{user.email}</span>
            </div>
            <div className="mobile-card-row">
              <span className="mobile-card-label">Department</span>
              <span className={getDeptBadgeClass(user.department)}>
                {user.department}
              </span>
            </div>
            <div className="mobile-card-actions">
              <button
                className="btn btn-secondary"
                onClick={() => onEdit(user)}
                style={{ padding: '0.25rem 0.75rem', minHeight: '36px' }}
              >
                <Edit size={14} /> Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(user)}
                style={{ padding: '0.25rem 0.75rem', minHeight: '36px' }}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
