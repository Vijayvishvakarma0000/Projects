import React from 'react';
import Modal from '../common/Modal';
import { BIRTHDAYS } from '../../data/mockData';
import './BirthdayModal.css';

const BirthdayModal = ({ isOpen, onClose }) => {
  const getBackground = (type, isToday) => {
    if (isToday) {
      return 'today-gradient';
    }
    return type === 'birthday' ? 'birthday-gradient' : 'anniversary-gradient';
  };

  const getIcon = (type, isToday) => {
    if (isToday) {
      return '🎉';
    }
    return type === 'birthday' ? '🎂' : '🎊';
  };

  const getTitle = (person) => {
    if (person.date === 'Today') {
      return `${person.name} - ${person.type === 'birthday' ? 'Birthday Today!' : 'Work Anniversary Today!'}`;
    }
    return `${person.name} - ${person.type === 'birthday' ? 'Birthday' : 'Work Anniversary'} ${person.date}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎂 Birthdays & Anniversaries"
      size="medium"
    >
      <div className="birthday-modal-content">
        <div className="birthdays-list">
          {BIRTHDAYS.map((person) => (
            <div
              key={person.id}
              className={`birthday-item ${getBackground(person.type, person.date === 'Today')}`}
            >
              <div className="birthday-avatar">
                {person.avatar}
              </div>
              
              <div className="birthday-content">
                <div className="birthday-header">
                  <span className="birthday-icon">
                    {getIcon(person.type, person.date === 'Today')}
                  </span>
                  <h4 className="birthday-title">
                    {getTitle(person)}
                  </h4>
                </div>
                
                <p className="birthday-department">
                  {person.department}
                </p>
                
                {person.type === 'anniversary' && (
                  <div className="anniversary-badge">
                    Work Anniversary
                  </div>
                )}
                
                {person.date === 'Today' && (
                  <div className="today-badge">
                    Today!
                  </div>
                )}
              </div>

              <div className="birthday-action">
                <button className="wish-btn">
                  Send Wish 🎈
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="birthday-footer">
          <p className="footer-text">
            🎁 Don't forget to wish your colleagues on their special days!
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default BirthdayModal;