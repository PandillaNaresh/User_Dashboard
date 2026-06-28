import React, { useState, useEffect } from 'react';
import { Plus, Filter, AlertOctagon, X, Search } from 'lucide-react';

import userService from './api/userService';
import ThemeToggle from './components/ThemeToggle';
import StatsCards from './components/StatsCards';
import UserTable from './components/UserTable';
import UserFormModal from './components/UserFormModal';
import FilterPopup from './components/FilterPopup';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Pagination from './components/Pagination';
import Toast from './components/Toast';

function App() {

  // --- State ---
  const [users, setUsers] = useState([]);         // list of all users
  const [loading, setLoading] = useState(true);   // show spinner while fetching
  const [error, setError] = useState(null);        // show error if API fails
  const [searchTerm, setSearchTerm] = useState(''); // search bar text
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [sortBy, setSortBy] = useState('id');      // which column to sort
  const [sortOrder, setSortOrder] = useState('asc'); // asc or desc
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toasts, setToasts] = useState([]);

  // --- Toast helpers ---
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // --- Fetch users on page load ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await userService.getUsers();

        // Our custom names and emails to replace the API default names
        const customUsers = [
          { firstName: 'Naresh',   lastName: 'Nani',   email: 'naresh@gmail.com'   },
          { firstName: 'Bhanu',    lastName: 'Reddy',  email: 'bhanu@gmail.com'    },
          { firstName: 'Priya',    lastName: 'Sharma', email: 'priya@gmail.com'    },
          { firstName: 'Praveena', lastName: 'Rao',    email: 'praveena@gmail.com' },
          { firstName: 'Neeraj',   lastName: 'Singh',  email: 'neeraj@gmail.com'   },
          { firstName: 'Santhosh', lastName: 'Kumar',  email: 'santhosh@gmail.com' },
          { firstName: 'Shravani', lastName: 'Devi',   email: 'shravani@gmail.com' },
          { firstName: 'Nandini',  lastName: 'Patel',  email: 'nandini@gmail.com'  },
          { firstName: 'Pallavi',  lastName: 'Gupta',  email: 'pallavi@gmail.com'  },
          { firstName: 'Akshaya',  lastName: 'Verma',  email: 'akshaya@gmail.com'  },
        ];

        const departments = ['Engineering', 'Product', 'Sales', 'Marketing', 'Finance', 'HR', 'Support'];

        const mappedUsers = data.map((item, index) => {
          const custom = customUsers[index] || {
            firstName: item.name.split(' ')[0],
            lastName: item.name.split(' ').slice(1).join(' '),
            email: item.email
          };
          return {
            id: item.id,
            firstName: custom.firstName,
            lastName: custom.lastName,
            email: custom.email,
            department: departments[item.id % departments.length]
          };
        });

        setUsers(mappedUsers);
      } catch (err) {
        setError('Could not load users. Please check your internet connection.');
        showToast('Failed to load users.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // --- Filter users by search and filter popup ---
  const query = searchTerm.toLowerCase();
  const filteredUsers = users.filter(user => {
    const matchSearch = !query ||
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchFirst  = !filters.firstName  || user.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const matchLast   = !filters.lastName   || user.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const matchEmail  = !filters.email      || user.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchDept   = !filters.department || user.department === filters.department;

    return matchSearch && matchFirst && matchLast && matchEmail && matchDept;
  });

  // --- Sort the filtered list ---
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    }
    const valA = (a[sortBy] || '').toLowerCase();
    const valB = (b[sortBy] || '').toLowerCase();
    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // --- Slice for current page ---
  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(start, start + pageSize);

  // Reset to page 1 if current page is out of range
  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    if (currentPage > maxPage) setCurrentPage(maxPage);
  }, [filteredUsers.length, pageSize]);

  // --- Sort column header click ---
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // --- Add or Edit user ---
  const handleSaveUser = async (formData) => {
    if (selectedUser) {
      // Edit existing user
      try {
        if (selectedUser.id <= 10) await userService.updateUser(selectedUser.id, formData);
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
        showToast(`${formData.firstName} updated successfully!`);
      } catch {
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
        showToast(`${formData.firstName} updated!`);
      }
    } else {
      // Add new user
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      try {
        await userService.createUser(formData);
      } catch { /* API won't save but we add locally */ }
      setUsers([...users, { ...formData, id: newId }]);
      showToast(`${formData.firstName} added successfully!`);
    }
  };

  // --- Delete user ---
  const handleDeleteConfirm = async () => {
    try {
      if (selectedUser.id <= 10) await userService.deleteUser(selectedUser.id);
    } catch { /* API won't delete but we remove locally */ }
    setUsers(users.filter(u => u.id !== selectedUser.id));
    showToast(`${selectedUser.firstName} deleted.`);
    setIsDeleteOpen(false);
    setSelectedUser(null);
  };

  // --- Clear all filters ---
  const handleClearFilters = () => {
    setFilters({ firstName: '', lastName: '', email: '', department: '' });
  };

  const activeFilterKeys = Object.keys(filters).filter(key => filters[key]);

  // --- Render ---
  return (
    <div className="app-container">

      <Toast toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="brand-logo">
            <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>UM</span>
          </div>
          <div>
            <h1 className="brand-title">UserManager</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Tacnique — User Management Dashboard</p>
          </div>
        </div>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </header>

      {/* Stats cards at top */}
      <StatsCards users={users} />

      {/* Error message if API fails */}
      {error && (
        <div className="error-alert-banner">
          <AlertOctagon size={20} />
          <div className="error-banner-content">
            <p className="error-banner-title">Could Not Load Users</p>
            <p className="error-banner-desc">{error}</p>
          </div>
        </div>
      )}

      {/* Search bar and buttons */}
      <section className="control-panel">
        <div className="control-layout">
          <div className="search-box-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or email..."
            />
          </div>
          <div className="action-buttons-group">
            <button
              className={`btn btn-secondary ${activeFilterKeys.length > 0 ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter size={16} /> Filters
              {activeFilterKeys.length > 0 && ` (${activeFilterKeys.length})`}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => { setSelectedUser(null); setIsFormOpen(true); }}
            >
              <Plus size={16} /> Add User
            </button>
          </div>
        </div>

        {/* Active filter tags */}
        {activeFilterKeys.length > 0 && (
          <div className="active-filters-bar">
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Active:</span>
            {activeFilterKeys.map(key => (
              <span key={key} className="filter-badge">
                <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>{key}: </span>
                {filters[key]}
                <button className="filter-badge-btn" onClick={() => setFilters({ ...filters, [key]: '' })}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <button className="filter-clear-all" onClick={handleClearFilters}>Clear All</button>
          </div>
        )}
      </section>

      {/* User table or loading spinner */}
      <main>
        {loading ? (
          <div className="dashboard-content-card">
            <div className="spinner-container">
              <div className="spinner"></div>
              <p className="loading-text">Loading users, please wait...</p>
            </div>
          </div>
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={user => { setSelectedUser(user); setIsFormOpen(true); }}
              onDelete={user => { setSelectedUser(user); setIsDeleteOpen(true); }}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            {filteredUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalEntries={filteredUsers.length}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
                onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
              />
            )}
          </>
        )}
      </main>

      {/* Popups */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setSelectedUser(null); }}
        onSave={handleSaveUser}
        currentUser={selectedUser}
      />
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApply={newFilters => { setFilters(newFilters); setCurrentPage(1); }}
        onClear={handleClearFilters}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedUser(null); }}
        onConfirm={handleDeleteConfirm}
        user={selectedUser}
      />

    </div>
  );
}

export default App;
