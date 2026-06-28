import React from 'react';
import { Users, LayoutGrid, UserPlus, Activity } from 'lucide-react';

/**
 * StatsCards Component
 * Calculates and displays high-level metrics from the active users list.
 * Designed to be simple and easy for freshers to understand.
 */
const StatsCards = ({ users = [] }) => {
  // 1. Total count of administrators
  const totalUsers = users.length;

  // 2. Count of distinct departments currently assigned
  // We use Set to automatically filter out duplicate department names
  const uniqueDepartments = new Set(users.map((user) => user.department).filter(Boolean));
  const activeDepts = uniqueDepartments.size;
  
  // 3. Identify the newest added user
  // Since we append new users to the end of our local state array,
  // the last user in the array is always the newest user.
  const lastUser = users.length > 0 ? users[users.length - 1] : null;
  const lastUserName = lastUser 
    ? `${lastUser.firstName} ${lastUser.lastName}`.trim()
    : "None";

  return (
    <div className="stats-grid">
      {/* Total Users Widget */}
      <div className="stats-card">
        <div className="stats-icon-wrapper primary">
          <Users size={22} />
        </div>
        <div className="stats-info">
          <span className="stats-label">Total Users</span>
          <span className="stats-value">{totalUsers}</span>
        </div>
      </div>

      {/* Active Departments Widget */}
      <div className="stats-card">
        <div className="stats-icon-wrapper success">
          <LayoutGrid size={22} />
        </div>
        <div className="stats-info">
          <span className="stats-label">Active Departments</span>
          <span className="stats-value">{activeDepts}</span>
        </div>
      </div>

      {/* Newest User Widget */}
      <div className="stats-card">
        <div className="stats-icon-wrapper info">
          <UserPlus size={22} />
        </div>
        <div className="stats-info">
          <span className="stats-label">Newest User</span>
          <span className="stats-value" style={{ fontSize: '1.1rem', wordBreak: 'break-all' }}>
            {lastUserName}
          </span>
        </div>
      </div>

      {/* Gateway Status Widget */}
      <div className="stats-card">
        <div className="stats-icon-wrapper warning">
          <Activity size={22} />
        </div>
        <div className="stats-info">
          <span className="stats-label">System Gateway</span>
          <span className="stats-value">Online</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
