import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import './ProjectsModal.css';

// Lazy load heavy components for better performance
const ProjectFilters = lazy(() => import('./ProjectFilters'));
const ProjectsTable = lazy(() => import('./ProjectsTable'));
const CreateProjectForm = lazy(() => import('./CreateProjectForm'));

const ProjectsModal = ({ isOpen, onClose, currentUser }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    clientId: '',
    userId: '',
    search: ''
  });

  // Sample data - In real app, API se aayega
  const sampleProjects = useMemo(() => [
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Complete redesign of company website',
      tasks: 5,
      users: ['John Smith', 'Emily Johnson'],
      client: 'ABC Corp',
      status: 'In Progress',
      priority: 'High',
      startDate: '2024-02-25',
      endDate: '2024-05-30',
      progress: 65,
      remainingDays: 45
    },
    {
      id: 2,
      title: 'Mobile App Development',
      description: 'iOS and Android mobile application',
      tasks: 12,
      users: ['Michael Brown', 'Sarah Davis'],
      client: 'XYZ Ltd',
      status: 'Planning',
      priority: 'High',
      startDate: '2024-03-15',
      endDate: '2024-08-30',
      progress: 20,
      remainingDays: 120
    },
    {
      id: 3,
      title: 'CRM System Implementation',
      description: 'Implement new CRM system across organization',
      tasks: 8,
      users: ['David Taylor', 'Amanda Miller'],
      client: 'Global Enterprises',
      status: 'In Progress',
      priority: 'Medium',
      startDate: '2024-01-10',
      endDate: '2024-06-30',
      progress: 40,
      remainingDays: 60
    },
    {
      id: 4,
      title: 'Marketing Campaign Q2',
      description: 'Quarter 2 digital marketing campaign',
      tasks: 7,
      users: ['Jessica Martinez'],
      client: 'Marketing Pros',
      status: 'Completed',
      priority: 'Medium',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      progress: 100,
      remainingDays: 0
    },
    {
      id: 5,
      title: 'Employee Training Portal',
      description: 'Online portal for employee training',
      tasks: 6,
      users: ['Christopher Wilson', 'Lauren Rodriguez'],
      client: 'HR Solutions',
      status: 'On Hold',
      priority: 'Low',
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      progress: 30,
      remainingDays: 90
    }
  ], []);

  // Fetch projects data
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, sampleProjects]);

  // Apply filters
  useEffect(() => {
    let result = [...projects];
    
    if (filters.status) {
      result = result.filter(project => project.status === filters.status);
    }
    
    if (filters.clientId) {
      result = result.filter(project => project.client.includes(filters.clientId));
    }
    
    if (filters.userId) {
      result = result.filter(project => 
        project.users.some(user => user.includes(filters.userId))
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredProjects(result);
  }, [filters, projects]);

  // Filter handlers
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleCreateProject = useCallback((projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      progress: 0,
      remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24))
    };
    
    setProjects(prev => [newProject, ...prev]);
    setShowCreateForm(false);
  }, [projects.length]);

  const handleDeleteProject = useCallback((projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="projects-modal active" onClick={onClose}>
      <div className="projects-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2>
              <span className="header-icon">📋</span>
              Projects Management
            </h2>
            <p className="header-subtitle">
              Total Projects: <span className="count-badge">{projects.length}</span>
            </p>
          </div>
          <div className="header-right">
            <button 
              className="create-project-btn"
              onClick={() => setShowCreateForm(true)}
            >
              <span className="btn-icon">+</span>
              Create Project
            </button>
            <button className="close-modal" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="projects-main-content">
          <Suspense fallback={<div className="loading-placeholder">Loading filters...</div>}>
            <ProjectFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={() => setFilters({
                status: '',
                clientId: '',
                userId: '',
                search: ''
              })}
            />
          </Suspense>

          {/* View Toggle */}
          <div className="view-toggle">
            <button className="view-btn active">
              <span className="view-icon">📋</span>
              List View
            </button>
            <button className="view-btn">
              <span className="view-icon">🔲</span>
              Grid View
            </button>
          </div>

          {/* Projects Content */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading projects...</p>
            </div>
          ) : (
            <Suspense fallback={<div className="loading-placeholder">Loading projects table...</div>}>
              <ProjectsTable 
                projects={filteredProjects}
                onDelete={handleDeleteProject}
                currentUser={currentUser}
              />
            </Suspense>
          )}

          {/* Create Project Form (Modal) */}
          {showCreateForm && (
            <Suspense fallback={<div className="loading-placeholder">Loading form...</div>}>
              <CreateProjectForm
                onClose={() => setShowCreateForm(false)}
                onCreate={handleCreateProject}
              />
            </Suspense>
          )}
        </div>

        {/* Stats Footer */}
        <div className="projects-footer">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{projects.filter(p => p.status === 'In Progress').length}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{projects.filter(p => p.status === 'Completed').length}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{projects.filter(p => p.priority === 'High').length}</div>
              <div className="stat-label">High Priority</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length) || 0}%
              </div>
              <div className="stat-label">Avg. Progress</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectsModal);