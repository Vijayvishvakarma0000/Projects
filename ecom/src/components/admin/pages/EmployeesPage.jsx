import React, { useState } from 'react';

const EmployeesPage = ({ employees: initialEmployees }) => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    empId: '',
    name: '',
    role: '',
    department: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  // Get unique departments
  const departments = ['All', ...new Set(initialEmployees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
    const matchesDepartment = filterDepartment === 'All' || emp.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
    setNewEmployee({
      empId: employee.empId,
      name: employee.name,
      role: employee.role,
      department: employee.department,
      email: employee.email,
      phone: employee.phone,
      status: employee.status
    });
  };

  const handleSave = () => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id 
          ? { ...emp, ...newEmployee, id: emp.id }
          : emp
      ));
      setEditingEmployee(null);
    } else {
      // Add new employee
      const newId = Math.max(...employees.map(e => e.id)) + 1;
      const newEmp = {
        id: newId,
        ...newEmployee,
        todayHours: 0,
        weekHours: 0,
        monthHours: 0,
        lastActive: 'Just now',
        joinDate: new Date().toISOString().split('T')[0]
      };
      setEmployees([...employees, newEmp]);
    }
    
    setShowForm(false);
    setNewEmployee({
      empId: '',
      name: '',
      role: '',
      department: '',
      email: '',
      phone: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  // Calculate statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const engineeringEmployees = employees.filter(e => e.department === 'Engineering').length;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2 className="page-title">👥 Employees Management</h2>
          <p className="page-subtitle">Total {totalEmployees} employees • {activeEmployees} active</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => {
            setShowForm(!showForm);
            setEditingEmployee(null);
            setNewEmployee({
              empId: '',
              name: '',
              role: '',
              department: '',
              email: '',
              phone: '',
              status: 'Active'
            });
          }}
        >
          {showForm ? '❌ Cancel' : '➕ Add Employee'}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon">📊</div>
          <h3>Total Employees</h3>
          <p className="card-value">{totalEmployees}</p>
        </div>
        <div className="card card-success">
          <div className="card-icon">✅</div>
          <h3>Active Now</h3>
          <p className="card-value">{activeEmployees}</p>
        </div>
        <div className="card">
          <div className="card-icon">🏢</div>
          <h3>Engineering Dept</h3>
          <p className="card-value">{engineeringEmployees}</p>
        </div>
        <div className="card card-warning">
          <div className="card-icon">📅</div>
          <h3>On Leave</h3>
          <p className="card-value">{employees.filter(e => e.status === 'On Leave').length}</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="form-card">
          <h3>{editingEmployee ? '✏️ Edit Employee' : '➕ Add New Employee'}</h3>
          <div className="form-grid">
            <div className="input-group">
              <label>Employee ID *</label>
              <input 
                type="text" 
                name="empId"
                value={newEmployee.empId}
                onChange={handleInputChange}
                placeholder="EMP001" 
                required
              />
            </div>
            <div className="input-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                name="name"
                value={newEmployee.name}
                onChange={handleInputChange}
                placeholder="John Doe" 
                required
              />
            </div>
            <div className="input-group">
              <label>Role *</label>
              <input 
                type="text" 
                name="role"
                value={newEmployee.role}
                onChange={handleInputChange}
                placeholder="Software Developer" 
                required
              />
            </div>
            <div className="input-group">
              <label>Department *</label>
              <select 
                name="department"
                value={newEmployee.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
                <option value="Quality">Quality</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
              </select>
            </div>
            <div className="input-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email"
                value={newEmployee.email}
                onChange={handleInputChange}
                placeholder="john@acore.com" 
                required
              />
            </div>
            <div className="input-group">
              <label>Phone *</label>
              <input 
                type="tel" 
                name="phone"
                value={newEmployee.phone}
                onChange={handleInputChange}
                placeholder="9876543210" 
                required
              />
            </div>
            <div className="input-group">
              <label>Status</label>
              <select 
                name="status"
                value={newEmployee.status}
                onChange={handleInputChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={handleSave}>
              {editingEmployee ? '💾 Update Employee' : '➕ Add Employee'}
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setShowForm(false);
                setEditingEmployee(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filters-row">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="🔍 Search by name, ID, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select 
            className="filter-select" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
          <select 
            className="filter-select" 
            value={filterDepartment} 
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="All">All Departments</option>
            {departments.filter(dept => dept !== 'All').map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button 
            className="btn-icon" 
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('All');
              setFilterDepartment('All');
            }}
            title="Clear Filters"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Today Hours</th>
              <th>Week Hours</th>
              <th>Month Hours</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td><strong>{emp.empId}</strong></td>
                  <td>
                    <div className="employee-info">
                      <div className="employee-avatar">{emp.name[0]}</div>
                      <div>
                        <div className="employee-name">{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.role}</td>
                  <td>
                    <span className="dept-badge">{emp.department}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${emp.status.toLowerCase().replace(' ', '-')}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="hours-cell">{emp.todayHours}h</td>
                  <td className="hours-cell">{emp.weekHours}h</td>
                  <td className="hours-cell">{emp.monthHours}h</td>
                  <td>{emp.lastActive}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon" title="View Profile" onClick={() => handleEdit(emp)}>
                        👁️
                      </button>
                      <button className="btn-icon" title="Edit" onClick={() => handleEdit(emp)}>
                        ✏️
                      </button>
                      <button className="btn-icon btn-danger" onClick={() => handleDelete(emp.id)} title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data">
                  <div className="no-data-content">
                    <span className="no-data-icon">👥</span>
                    <h4>No employees found</h4>
                    <p>Try changing your search or filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing {filteredEmployees.length} of {employees.length} employees
        {searchTerm && ` • Search: "${searchTerm}"`}
      </div>

      <style jsx>{`
        .page-subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-top: 4px;
        }
        
        .filter-group {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        
        .employee-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .employee-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          flex-shrink: 0;
        }
        
        .employee-name {
          font-weight: 500;
          color: #f1f5f9;
        }
        
        .employee-email {
          font-size: 12px;
          color: #94a3b8;
        }
        
        .dept-badge {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .hours-cell {
          font-weight: 600;
          color: #f1f5f9;
        }
        
        .action-buttons {
          display: flex;
          gap: 4px;
        }
        
        .btn-danger {
          color: #ef4444;
        }
        
        .btn-secondary {
          background: #334155;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.2s;
        }
        
        .btn-secondary:hover {
          background: #475569;
        }
        
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        
        .no-data {
          text-align: center;
          padding: 40px;
        }
        
        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        
        .no-data-icon {
          font-size: 48px;
          opacity: 0.5;
        }
        
        .no-data h4 {
          color: #f1f5f9;
          margin: 0;
        }
        
        .no-data p {
          color: #94a3b8;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .filters-row {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-group {
            flex-wrap: wrap;
          }
          
          .action-buttons {
            flex-direction: column;
            gap: 8px;
          }
          
          .employee-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeesPage;