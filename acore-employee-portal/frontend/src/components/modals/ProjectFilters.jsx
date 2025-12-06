import React, { memo } from 'react';
import './ProjectFilters.css';

const ProjectFilters = memo(({ filters, onFilterChange, onClearFilters }) => {
  const statusOptions = [
    'All', 'In Progress', 'Completed', 'Planning', 'On Hold', 'To Do'
  ];
  
  const clients = ['ABC Corp', 'XYZ Ltd', 'Global Enterprises', 'Marketing Pros', 'HR Solutions'];
  const users = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Taylor'];

  return (
    <div className="project-filters">
      <div className="filters-header">
        <h3>🔍 Filters</h3>
        <button className="clear-filters-btn" onClick={onClearFilters}>
          Clear All
        </button>
      </div>
      
      <div className="filters-grid">
        {/* Search */}
        <div className="filter-group">
          <label htmlFor="search">Search Projects</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or description..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* Status Filter */}
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status === 'All' ? '' : status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        
        {/* Client Filter */}
        <div className="filter-group">
          <label htmlFor="client">Client</label>
          <select
            id="client"
            value={filters.clientId}
            onChange={(e) => onFilterChange('clientId', e.target.value)}
            className="filter-select"
          >
            <option value="">All Clients</option>
            {clients.map(client => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
        </div>
        
        {/* User Filter */}
        <div className="filter-group">
          <label htmlFor="user">Assigned User</label>
          <select
            id="user"
            value={filters.userId}
            onChange={(e) => onFilterChange('userId', e.target.value)}
            className="filter-select"
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
});

export default ProjectFilters;