import React, { memo } from 'react';
import './ProjectsTable.css';

const ProjectsTable = memo(({ projects, onDelete, currentUser }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return '#3b82f6';
      case 'Completed': return '#10b981';
      case 'Planning': return '#8b5cf6';
      case 'On Hold': return '#f59e0b';
      case 'To Do': return '#64748b';
      default: return '#94a3b8';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  if (projects.length === 0) {
    return (
      <div className="no-projects">
        <div className="no-data-icon">📋</div>
        <h3>No projects found</h3>
        <p>Try adjusting your filters or create a new project</p>
      </div>
    );
  }

  return (
    <div className="projects-table-container">
      <div className="table-responsive">
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Tasks</th>
              <th>Users</th>
              <th>Client</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>
                  <div className="project-title-cell">
                    <div className="project-title">{project.title}</div>
                    <div className="project-description">{project.description}</div>
                  </div>
                </td>
                <td>
                  <span className="tasks-count">{project.tasks}</span>
                </td>
                <td>
                  <div className="users-cell">
                    {project.users.map((user, index) => (
                      <span key={index} className="user-tag">
                        {user.charAt(0)}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="client-tag">{project.client}</span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(project.status)}15`,
                      color: getStatusColor(project.status),
                      borderColor: getStatusColor(project.status)
                    }}
                  >
                    {project.status}
                  </span>
                </td>
                <td>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: getStatusColor(project.status)
                        }}
                      ></div>
                    </div>
                    <span className="progress-text">{project.progress}%</span>
                  </div>
                </td>
                <td>
                  <span 
                    className="priority-badge"
                    style={{ color: getPriorityColor(project.priority) }}
                  >
                    {project.priority}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="action-btn view" title="View">
                      👁️
                    </button>
                    <button className="action-btn edit" title="Edit">
                      ✏️
                    </button>
                    {currentUser.role === 'admin' && (
                      <button 
                        className="action-btn delete" 
                        title="Delete"
                        onClick={() => onDelete(project.id)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="table-footer">
        <div className="pagination-info">
          Showing {projects.length} of {projects.length} projects
        </div>
        <div className="export-options">
          <button className="export-btn">
            📊 Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
});

export default ProjectsTable;