import React, { useState } from 'react';
import { FaRegHandPeace } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";

const MeetingBookingComponent = ({ onBack, onTimeSlotSelect }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '9 AM - 12 PM' },
    { id: 'afternoon', label: 'Afternoon', time: '1 PM - 5 PM' },
    { id: 'evening', label: 'Evening', time: '6 PM - 9 PM' }
  ];

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    // Show confirmation after a short delay
    setTimeout(() => {
      setShowConfirmation(true);
      // Notify parent component about the selection
      onTimeSlotSelect(slot);
    }, 300);
  };

  const handleBackClick = () => {
    if (showConfirmation) {
      // If showing confirmation, go back to time slots
      setShowConfirmation(false);
    } else {
      // Otherwise, go back to the previous state
      onBack();
    }
  };

  return (
    <div className="meeting-booking-container">
      <div className="meeting-booking-header">
        <button className="back-icon-btn" onClick={handleBackClick}>
          <ArrowLeft size={18} />
        </button>
        <h3 className="meeting-booking-title">
          {showConfirmation ? 'Booking Confirmed!' : 'Select a Time Slot'}
        </h3>
      </div>
      
      {!showConfirmation ? (
        <div className="time-slots-list">
          {timeSlots.map((slot, index) => (
            <div 
              key={slot.id}
              className="time-slot-item"
              onClick={() => handleSlotClick(slot)}
            >
              <div className="time-slot-icon">
                <FaRegHandPeace size={20} />
              </div>
              <div className="time-slot-content">
                <div className="time-slot-label">{slot.label}</div>
                <div className="time-slot-time">{slot.time}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="confirmation-message">
          <div className="confirmation-icon">✅</div>
          <div className="confirmation-title">Time Slot Confirmed!</div>
          <div className="confirmation-details">
            You've selected <strong>{selectedSlot.label}</strong> ({selectedSlot.time})
          </div>
          <div className="confirmation-info">
            You will receive a calendar invitation with meeting link and agenda within 24 hours.
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingBookingComponent;