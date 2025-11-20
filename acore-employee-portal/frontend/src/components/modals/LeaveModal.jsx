// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { LEAVE_BALANCE, LEAVE_TYPES } from '../../data/mockData';
// import './LeaveModal.css';

// const LeaveModal = ({ isOpen, onClose, onLeaveSubmit, loading }) => {
//   const [formData, setFormData] = useState({
//     type: '',
//     startDate: '',
//     endDate: '',
//     reason: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLeaveSubmit(formData);
//     setFormData({ type: '', startDate: '', endDate: '', reason: '' });
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const getLeaveCount = (type) => {
//     switch (type) {
//       case 'CL': return LEAVE_BALANCE.casual;
//       case 'SL': return LEAVE_BALANCE.sick;
//       case 'BL': return LEAVE_BALANCE.birthday;
//       default: return 0;
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="🏖 Leave Management"
//       size="medium"
//     >
//       <div className="leave-modal-content">
//         {/* Leave Balance Cards */}
//         <div className="leave-balance-section">
//           <h3 className="section-title">Your Leave Balance</h3>
//           <div className="leave-balance-cards">
//             <div className="balance-card casual">
//               <div className="balance-count">{LEAVE_BALANCE.casual}</div>
//               <div className="balance-label">Casual Leave</div>
//             </div>
//             <div className="balance-card sick">
//               <div className="balance-count">{LEAVE_BALANCE.sick}</div>
//               <div className="balance-label">Sick Leave</div>
//             </div>
//             <div className="balance-card birthday">
//               <div className="balance-count">{LEAVE_BALANCE.birthday}</div>
//               <div className="balance-label">Birthday Leave</div>
//             </div>
//           </div>
//         </div>

//         {/* Leave Application Form */}
//         <form onSubmit={handleSubmit} className="leave-form">
//           <h3 className="section-title">Apply for Leave</h3>
          
//           <div className="form-grid">
//             <div className="form-group">
//               <label htmlFor="leaveType" className="form-label">
//                 Leave Type *
//               </label>
//               <select
//                 id="leaveType"
//                 name="type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="form-select"
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Select Leave Type</option>
//                 {LEAVE_TYPES.map(leave => (
//                   <option key={leave.value} value={leave.value}>
//                     {leave.label} ({getLeaveCount(leave.value)} available)
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="startDate" className="form-label">
//                 Start Date *
//               </label>
//               <input
//                 type="date"
//                 id="startDate"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="endDate" className="form-label">
//                 End Date *
//               </label>
//               <input
//                 type="date"
//                 id="endDate"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleChange}
//                 className="form-input"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="reason" className="form-label">
//               Reason for Leave *
//             </label>
//             <textarea
//               id="reason"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               placeholder="Please provide a detailed reason for your leave application..."
//               className="form-textarea"
//               rows="4"
//               required
//               disabled={loading}
//             ></textarea>
//           </div>

//           <div className="form-actions">
//             <button
//               type="button"
//               className="cancel-btn"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="submit-btn"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="btn-spinner"></span>
//                   Submitting...
//                 </>
//               ) : (
//                 'Submit Leave Application'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default LeaveModal;


import React, { useState } from 'react';
import Modal from '../common/Modal';
import { LEAVE_BALANCE } from '../../data/mockData';
import { LEAVE_TYPES } from '../../utils/constants'; // ✅ Correct import path
import './LeaveModal.css';

const LeaveModal = ({ isOpen, onClose, onLeaveSubmit, loading }) => {
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dates
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (end < start) {
        alert('End date cannot be before start date');
        return;
      }
    }
    
    onLeaveSubmit(formData);
    setFormData({ type: '', startDate: '', endDate: '', reason: '' });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getLeaveCount = (type) => {
    switch (type) {
      case 'CL': return LEAVE_BALANCE.casual;
      case 'SL': return LEAVE_BALANCE.sick;
      case 'BL': return LEAVE_BALANCE.birthday;
      default: return 0;
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🏖 Leave Management"
      size="medium"
    >
      <div className="leave-modal-content">
        {/* Leave Balance Cards */}
        <div className="leave-balance-section">
          <h3 className="section-title">Your Leave Balance</h3>
          <div className="leave-balance-cards">
            <div className="balance-card casual">
              <div className="balance-count">{LEAVE_BALANCE.casual}</div>
              <div className="balance-label">Casual Leave</div>
            </div>
            <div className="balance-card sick">
              <div className="balance-count">{LEAVE_BALANCE.sick}</div>
              <div className="balance-label">Sick Leave</div>
            </div>
            <div className="balance-card birthday">
              <div className="balance-count">{LEAVE_BALANCE.birthday}</div>
              <div className="balance-label">Birthday Leave</div>
            </div>
          </div>
        </div>

        {/* Leave Application Form */}
        <form onSubmit={handleSubmit} className="leave-form">
          <h3 className="section-title">Apply for Leave</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="leaveType" className="form-label">
                Leave Type *
              </label>
              <select
                id="leaveType"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
                required
                disabled={loading}
              >
                <option value="">Select Leave Type</option>
                {LEAVE_TYPES.map(leave => (
                  <option key={leave.value} value={leave.value}>
                    {leave.label} ({getLeaveCount(leave.value)} available)
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="startDate" className="form-label">
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
                min={getTodayDate()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate" className="form-label">
                End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
                required
                disabled={loading}
                min={formData.startDate || getTodayDate()}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Reason for Leave *
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a detailed reason for your leave application..."
              className="form-textarea"
              rows="4"
              required
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Submitting...
                </>
              ) : (
                'Submit Leave Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LeaveModal;