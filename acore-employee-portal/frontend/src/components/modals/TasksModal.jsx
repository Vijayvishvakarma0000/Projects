import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './TasksModal.css';

const TasksModal = ({ isOpen, onClose, currentUser }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    projectName: '',
    status: '',
    clientId: '',
    dateRange: { start: '', end: '' }
  });

  // ✅ SAMPLE DATA - Working dummy data
  const sampleTasks = useMemo(() => [
    {
      id: 1,
      title: 'Server Configuration',
      project: 'IT Infrastructure Upgrade',
      projectId: 3,
      users: ['John Smith', 'Michael Brown'],
      clients: ['Rahul Sharma', 'Jacob Collins'],
      status: 'Testing Phase',
      priority: 'Medium',
      startDate: '2024-11-17',
      dueDate: '2024-12-22',
      description: 'Configure server settings and optimize performance',
      progress: 85
    },
    {
      id: 2,
      title: 'Survey Distribution',
      project: 'Customer Satisfaction Improvement',
      projectId: 25,
      users: ['John Smith', 'Sneha Sharma'],
      clients: ['Emily Taylor'],
      status: 'Blocked',
      priority: 'Low',
      startDate: '2024-03-06',
      dueDate: '2024-03-15',
      description: 'Distribute customer satisfaction surveys',
      progress: 30
    },
    {
      id: 3,
      title: 'Homepage Design',
      project: 'Website Redesign',
      projectId: 1,
      users: ['John Smith'],
      clients: ['James Anderson'],
      status: 'In Progress',
      priority: 'High',
      startDate: '2024-02-25',
      dueDate: '2024-03-30',
      description: 'Design new homepage layout',
      progress: 65
    },
    {
      id: 4,
      title: 'Prototype Testing',
      project: 'Product Packaging Redesign',
      projectId: 22,
      users: ['John Smith', 'Nisha Kapoor'],
      clients: ['James Anderson', 'Jacob Collins'],
      status: 'Testing Phase',
      priority: 'High',
      startDate: '2024-03-13',
      dueDate: '2024-09-14',
      description: 'Test new packaging prototypes',
      progress: 90
    },
    {
      id: 5,
      title: 'Database Migration',
      project: 'System Upgrade',
      projectId: 5,
      users: ['David Taylor', 'Amanda Miller'],
      clients: ['Global Enterprises'],
      status: 'In Progress',
      priority: 'High',
      startDate: '2024-04-01',
      dueDate: '2024-06-30',
      description: 'Migrate database to new server',
      progress: 50
    },
    {
      id: 6,
      title: 'API Integration',
      project: 'Mobile App Development',
      projectId: 2,
      users: ['Michael Brown', 'Sarah Davis'],
      clients: ['XYZ Tech Solutions'],
      status: 'Planning',
      priority: 'Medium',
      startDate: '2024-03-20',
      dueDate: '2024-05-15',
      description: 'Integrate third-party APIs',
      progress: 20
    },
    {
      id: 7,
      title: 'User Testing',
      project: 'CRM Implementation',
      projectId: 3,
      users: ['Jessica Martinez', 'Christopher Wilson'],
      clients: ['Marketing Pros Inc'],
      status: 'Completed',
      priority: 'Low',
      startDate: '2024-01-10',
      dueDate: '2024-02-28',
      description: 'Conduct user testing sessions',
      progress: 100
    },
    {
      id: 8,
      title: 'Security Audit',
      project: 'IT Security Upgrade',
      projectId: 6,
      users: ['William Young', 'Stephanie Martin'],
      clients: ['Data Insights Co'],
      status: 'On Hold',
      priority: 'High',
      startDate: '2024-03-01',
      dueDate: '2024-04-30',
      description: 'Perform security audit',
      progress: 40
    }
  ], []);

  // ✅ FETCH DATA - Simulate API call
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        setTasks(sampleTasks);
        setFilteredTasks(sampleTasks);
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, sampleTasks]);

  // ✅ APPLY FILTERS
  useEffect(() => {
    const applyFilters = () => {
      let result = [...tasks];
      
      // Project name filter
      if (filters.projectName) {
        const searchTerm = filters.projectName.toLowerCase();
        result = result.filter(task => 
          task.project.toLowerCase().includes(searchTerm) ||
          task.title.toLowerCase().includes(searchTerm)
        );
      }
      
      // Status filter
      if (filters.status) {
        result = result.filter(task => task.status === filters.status);
      }
      
      // Client filter
      if (filters.clientId) {
        result = result.filter(task => 
          task.clients.some(client => 
            client.toLowerCase().includes(filters.clientId.toLowerCase())
          )
        );
      }
      
      // Date range filter
      if (filters.dateRange.start && filters.dateRange.end) {
        result = result.filter(task => {
          const dueDate = new Date(task.dueDate);
          const start = new Date(filters.dateRange.start);
          const end = new Date(filters.dateRange.end);
          return dueDate >= start && dueDate <= end;
        });
      }
      
      setFilteredTasks(result);
    };
    
    // Debounce filter application
    const timer = setTimeout(applyFilters, 300);
    return () => clearTimeout(timer);
  }, [filters, tasks]);

  // ✅ FILTER HANDLERS
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleDateRangeChange = useCallback((start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      projectName: '',
      status: '',
      clientId: '',
      dateRange: { start: '', end: '' }
    });
  }, []);

  // ✅ DELETE TASK
  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  }, []);

  // ✅ EXPORT TO CSV
  const handleExportCSV = useCallback(() => {
    const headers = ['Task', 'Project', 'Status', 'Priority', 'Due Date', 'Progress'];
    const csvContent = [
      headers.join(','),
      ...filteredTasks.map(task => [
        `"${task.title}"`,
        `"${task.project}"`,
        task.status,
        task.priority,
        task.dueDate,
        `${task.progress}%`
      ].join(','))
    ].join('\n');
    
    // Create and download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, [filteredTasks]);

  // ✅ FORMAT DATE
  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  // ✅ GET STATUS COLOR
  const getStatusColor = useCallback((status) => {
    const statusColors = {
      'Testing Phase': '#3b82f6',
      'In Progress': '#10b981',
      'Completed': '#059669',
      'Blocked': '#ef4444',
      'Planning': '#8b5cf6',
      'On Hold': '#f59e0b',
      'Delayed': '#f97316',
      'Pending': '#64748b',
      'Cancelled': '#6b7280'
    };
    return statusColors[status] || '#94a3b8';
  }, []);

  // ✅ GET PRIORITY COLOR
  const getPriorityColor = useCallback((priority) => {
    const priorityColors = {
      'High': '#ef4444',
      'Medium': '#f59e0b',
      'Low': '#10b981'
    };
    return priorityColors[priority] || '#94a3b8';
  }, []);

  // ✅ GET USER INITIALS
  const getUserInitials = useCallback((userName) => {
    return userName.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  }, []);

  // ✅ STATUS OPTIONS
  const statusOptions = useMemo(() => [
    '', 'In Progress', 'Testing Phase', 'Completed', 'Blocked', 
    'Planning', 'On Hold', 'Delayed', 'Pending', 'Cancelled'
  ], []);

  // ✅ CLIENT OPTIONS
  const clientOptions = useMemo(() => [
    '', 'Rahul Sharma', 'Jacob Collins', 'Emily Taylor', 
    'James Anderson', 'Nisha Kapoor', 'Global Enterprises',
    'XYZ Tech Solutions', 'Marketing Pros Inc', 'Data Insights Co'
  ], []);

  // ✅ CALCULATE STATS
  const stats = useMemo(() => ({
    total: tasks.length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    highPriority: tasks.filter(t => t.priority === 'High').length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Completed').length,
    avgProgress: Math.round(tasks.reduce((acc, t) => acc + t.progress, 0) / tasks.length) || 0
  }), [tasks]);

  if (!isOpen) return null;

  return (
    <div className="tasks-modal active" onClick={onClose}>
      <div className="tasks-content" onClick={(e) => e.stopPropagation()}>
        {/* ✅ MODAL HEADER */}
        <div className="modal-header">
          <div className="header-left">
            <h2>
              <span className="header-icon">✅</span>
              Tasks Management
            </h2>
            <div className="header-stats">
              <span className="stat-badge">
                <span className="stat-count">{stats.total}</span>
                <span className="stat-label">Total Tasks</span>
              </span>
              <span className="stat-badge">
                <span className="stat-count">{stats.inProgress}</span>
                <span className="stat-label">In Progress</span>
              </span>
            </div>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <button 
                className="action-btn secondary"
                onClick={handleExportCSV}
                title="Export to CSV"
              >
                <span className="btn-icon">📊</span>
                Export
              </button>
              <button 
                className="action-btn primary"
                onClick={() => {/* Add new task functionality */}}
              >
                <span className="btn-icon">+</span>
                New Task
              </button>
            </div>
            <button className="close-modal" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        {/* ✅ MAIN CONTENT */}
        <div className="tasks-main">
          {/* ✅ FILTERS SECTION */}
          <div className="filters-section">
            <div className="filters-header">
              <h3>
                <span className="filter-icon">🔍</span>
                Filter Tasks
              </h3>
              <button 
                className="clear-filters-btn"
                onClick={handleClearFilters}
                disabled={!filters.projectName && !filters.status && !filters.clientId}
              >
                ✕ Clear Filters
              </button>
            </div>
            
            <div className="filters-grid">
              {/* Project/Task Search */}
              <div className="filter-group">
                <div className="filter-label">Search Tasks/Projects</div>
                <div className="search-wrapper">
                  <input
                    type="text"
                    placeholder="Search tasks or projects..."
                    value={filters.projectName}
                    onChange={(e) => handleFilterChange('projectName', e.target.value)}
                    className="filter-input"
                  />
                  <span className="search-icon">🔍</span>
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="filter-group">
                <div className="filter-label">Status</div>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Status</option>
                  {statusOptions.slice(1).map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Client Filter */}
              <div className="filter-group">
                <div className="filter-label">Client</div>
                <select
                  value={filters.clientId}
                  onChange={(e) => handleFilterChange('clientId', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Clients</option>
                  {clientOptions.slice(1).map(client => (
                    <option key={client} value={client}>
                      {client}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date Range Filter */}
              <div className="filter-group">
                <div className="filter-label">Due Date Range</div>
                <div className="date-range-wrapper">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange(e.target.value, filters.dateRange.end)}
                    className="date-input"
                    placeholder="Start Date"
                  />
                  <span className="date-separator">to</span>
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange(filters.dateRange.start, e.target.value)}
                    className="date-input"
                    placeholder="End Date"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ✅ RESULTS COUNT */}
          <div className="results-info">
            <span className="results-count">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </span>
            <div className="view-toggle">
              <button className="view-btn active">
                <span className="view-icon">📋</span>
                List View
              </button>
            </div>
          </div>

          {/* ✅ LOADING STATE */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : (
            <>
              {/* ✅ TASKS TABLE */}
              <div className="tasks-table-container">
                <div className="table-wrapper">
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Project</th>
                        <th>Users</th>
                        <th>Clients</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Progress</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="no-data">
                            <div className="no-tasks-found">
                              <span className="no-data-icon">📋</span>
                              <h4>No tasks found</h4>
                              <p>Try adjusting your filters or create a new task</p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredTasks.map((task) => (
                          <tr key={task.id}>
                            <td>
                              <div className="task-title-cell">
                                <div className="task-title">{task.title}</div>
                                <div className="task-description">{task.description}</div>
                              </div>
                            </td>
                            <td>
                              <div className="project-cell">{task.project}</div>
                            </td>
                            <td>
                              <div className="users-cell">
                                {task.users.slice(0, 3).map((user, index) => (
                                  <span key={index} className="user-avatar" title={user}>
                                    {getUserInitials(user)}
                                  </span>
                                ))}
                                {task.users.length > 3 && (
                                  <span className="user-more" title={`+${task.users.length - 3} more`}>
                                    +{task.users.length - 3}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="clients-cell">
                                {task.clients.map((client, index) => (
                                  <span key={index} className="client-tag">
                                    {client.split(' ')[0]}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span 
                                className="status-badge"
                                style={{ 
                                  backgroundColor: `${getStatusColor(task.status)}20`,
                                  color: getStatusColor(task.status),
                                  borderColor: getStatusColor(task.status)
                                }}
                              >
                                {task.status}
                              </span>
                            </td>
                            <td>
                              <span 
                                className="priority-badge"
                                style={{ color: getPriorityColor(task.priority) }}
                              >
                                {task.priority}
                              </span>
                            </td>
                            <td>
                              <div className={`due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
                                {formatDate(task.dueDate)}
                              </div>
                            </td>
                            <td>
                              <div className="progress-cell">
                                <div className="progress-bar">
                                  <div 
                                    className="progress-fill"
                                    style={{ 
                                      width: `${task.progress}%`,
                                      backgroundColor: getStatusColor(task.status)
                                    }}
                                  ></div>
                                </div>
                                <span className="progress-text">{task.progress}%</span>
                              </div>
                            </td>
                            <td>
                              <div className="actions-cell">
                                <button className="action-btn view" title="View">
                                  👁️
                                </button>
                                <button className="action-btn edit" title="Edit">
                                  ✏️
                                </button>
                                {currentUser?.role === 'admin' && (
                                  <button 
                                    className="action-btn delete" 
                                    title="Delete"
                                    onClick={() => handleDeleteTask(task.id)}
                                  >
                                    🗑️
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ✅ FOOTER STATS */}
        <div className="tasks-footer">
          <div className="footer-stats">
            <div className="footer-stat">
              <div className="footer-stat-value">{stats.completed}</div>
              <div className="footer-stat-label">Completed</div>
            </div>
            <div className="footer-stat">
              <div className="footer-stat-value">{stats.highPriority}</div>
              <div className="footer-stat-label">High Priority</div>
            </div>
            <div className="footer-stat">
              <div className="footer-stat-value">{stats.overdue}</div>
              <div className="footer-stat-label">Overdue</div>
            </div>
            <div className="footer-stat">
              <div className="footer-stat-value">{stats.avgProgress}%</div>
              <div className="footer-stat-label">Avg Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TasksModal);