import React, { useState } from 'react';
import Modal from '../common/Modal';
import './GithubModal.css';

const GithubModal = ({ isOpen, onClose, onPushCode, loading }) => {
  const [formData, setFormData] = useState({
    repository: '',
    commitMessage: '',
    branch: 'main'
  });

  const [recentCommits, setRecentCommits] = useState([
    {
      id: 1,
      message: 'Initial project setup',
      repository: 'acore/employee-portal',
      timestamp: '2 hours ago',
      hash: 'a1b2c3d'
    },
    {
      id: 2,
      message: 'Add attendance tracking feature',
      repository: 'acore/employee-portal',
      timestamp: '1 day ago',
      hash: 'e4f5g6h'
    },
    {
      id: 3,
      message: 'Update login functionality',
      repository: 'acore/employee-portal',
      timestamp: '2 days ago',
      hash: 'i7j8k9l'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPushCode(formData);
    setRecentCommits(prev => [{
      id: prev.length + 1,
      message: formData.commitMessage,
      repository: formData.repository,
      timestamp: 'Just now',
      hash: Math.random().toString(36).substr(2, 7)
    }, ...prev]);
    setFormData({ repository: '', commitMessage: '', branch: 'main' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💻 GitHub Integration"
      size="medium"
    >
      <div className="github-modal-content">
        {/* Push Code Form */}
        <div className="github-form-section">
          <h3 className="section-title">📤 Push Code to Repository</h3>
          
          <form onSubmit={handleSubmit} className="github-form">
            <div className="form-group">
              <label htmlFor="repository" className="form-label">
                Repository URL *
              </label>
              <input
                type="url"
                id="repository"
                name="repository"
                value={formData.repository}
                onChange={handleChange}
                placeholder="https://github.com/username/repository"
                className="github-input"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="branch" className="form-label">
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="github-select"
                disabled={loading}
              >
                <option value="main">main</option>
                <option value="develop">develop</option>
                <option value="master">master</option>
                <option value="feature">feature/*</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="commitMessage" className="form-label">
                Commit Message *
              </label>
              <textarea
                id="commitMessage"
                name="commitMessage"
                value={formData.commitMessage}
                onChange={handleChange}
                placeholder="Describe the changes you've made..."
                className="github-textarea"
                rows="3"
                required
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              className="github-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Pushing Code...
                </>
              ) : (
                '🚀 Push to GitHub'
              )}
            </button>
          </form>
        </div>

        {/* Recent Commits */}
        <div className="recent-commits-section">
          <h3 className="section-title">📝 Recent Commits</h3>
          
          <div className="commits-list">
            {recentCommits.map(commit => (
              <div key={commit.id} className="commit-item">
                <div className="commit-icon">✅</div>
                
                <div className="commit-content">
                  <div className="commit-message">{commit.message}</div>
                  <div className="commit-details">
                    <span className="commit-repo">{commit.repository}</span>
                    <span className="commit-hash">#{commit.hash}</span>
                    <span className="commit-time">{commit.timestamp}</span>
                  </div>
                </div>

                <button className="view-commit-btn" title="View commit">
                  👁️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* GitHub Stats */}
        <div className="github-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{recentCommits.length}</div>
              <div className="stat-label">Total Commits</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div className="stat-info">
              <div className="stat-value">3</div>
              <div className="stat-label">Active Repos</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-value">12</div>
              <div className="stat-label">Contributions</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GithubModal;