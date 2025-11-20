// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { HOLIDAYS_2024, MONTHS } from '../../data/mockData';
// import { generateCalendar } from '../../utils/helpers';
// import './CalendarModal.css';

// const CalendarModal = ({ isOpen, onClose }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const calendarDays = generateCalendar(currentYear, currentMonth);
//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const changeMonth = (direction) => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
//   };

//   const isHoliday = (date) => {
//     return HOLIDAYS_2024.some(holiday => holiday.date === date);
//   };

//   const getHolidayName = (date) => {
//     const holiday = HOLIDAYS_2024.find(h => h.date === date);
//     return holiday ? holiday.name : '';
//   };

//   const getUpcomingHolidays = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return HOLIDAYS_2024
//       .filter(holiday => holiday.date >= today)
//       .slice(0, 5);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="📅 Holiday Calendar 2024"
//       size="large"
//     >
//       <div className="calendar-modal-content">
//         {/* Calendar Navigation */}
//         <div className="calendar-navigation">
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(-1)}
//           >
//             ◀ Previous
//           </button>
          
//           <h3 className="calendar-title">
//             {MONTHS[currentMonth]} {currentYear}
//           </h3>
          
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(1)}
//           >
//             Next ▶
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="calendar-grid">
//           {/* Week Day Headers */}
//           {weekDays.map(day => (
//             <div key={day} className="calendar-cell week-header">
//               {day}
//             </div>
//           ))}
          
//           {/* Calendar Days */}
//           {calendarDays.map((day, index) => {
//             if (day.type === 'empty') {
//               return <div key={`empty-${index}`} className="calendar-cell empty"></div>;
//             }

//             const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`;
//             const isHolidayDay = isHoliday(dateStr);
//             const isToday = day.isToday;
//             const isWeekend = day.isWeekend;

//             return (
//               <div
//                 key={`day-${index}`}
//                 className={`calendar-cell day 
//                   ${isToday ? 'today' : ''} 
//                   ${isHolidayDay ? 'holiday' : ''}
//                   ${isWeekend ? 'weekend' : ''}
//                 `}
//                 title={isHolidayDay ? getHolidayName(dateStr) : ''}
//               >
//                 <div className="day-number">{day.value}</div>
//                 {isHolidayDay && (
//                   <div className="holiday-indicator">🎉</div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Legend */}
//         <div className="calendar-legend">
//           <div className="legend-item">
//             <div className="legend-color today"></div>
//             <span>Today</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color holiday"></div>
//             <span>Holiday</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color weekend"></div>
//             <span>Weekend</span>
//           </div>
//         </div>

//         {/* Upcoming Holidays */}
//         <div className="upcoming-holidays">
//           <h4 className="upcoming-title">🎊 Upcoming Holidays</h4>
//           <div className="holidays-list">
//             {getUpcomingHolidays().map((holiday, index) => (
//               <div key={index} className="holiday-item">
//                 <div className="holiday-date">
//                   {new Date(holiday.date).toLocaleDateString('en-US', { 
//                     month: 'short', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="holiday-name">{holiday.name}</div>
//                 <div className="holiday-days">
//                   {Math.ceil((new Date(holiday.date) - new Date()) / (1000 * 60 * 60 * 24))} days
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CalendarModal;




import React, { useState } from 'react';
import Modal from '../common/Modal';
import { HOLIDAYS_2024 } from '../../data/mockData';
import { MONTHS } from '../../utils/constants'; // ✅ Correct import path
import { generateCalendar } from '../../utils/helpers';
import './CalendarModal.css';

const CalendarModal = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const calendarDays = generateCalendar(currentYear, currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isHoliday = (date) => {
    return HOLIDAYS_2024.some(holiday => holiday.date === date);
  };

  const getHolidayName = (date) => {
    const holiday = HOLIDAYS_2024.find(h => h.date === date);
    return holiday ? holiday.name : '';
  };

  const getUpcomingHolidays = () => {
    const today = new Date().toISOString().split('T')[0];
    return HOLIDAYS_2024
      .filter(holiday => holiday.date >= today)
      .slice(0, 5);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📅 Holiday Calendar 2024"
      size="large"
    >
      <div className="calendar-modal-content">
        {/* Calendar Navigation */}
        <div className="calendar-navigation">
          <button 
            className="nav-btn"
            onClick={() => changeMonth(-1)}
          >
            ◀ Previous
          </button>
          
          <h3 className="calendar-title">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          
          <button 
            className="nav-btn"
            onClick={() => changeMonth(1)}
          >
            Next ▶
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {/* Week Day Headers */}
          {weekDays.map(day => (
            <div key={day} className="calendar-cell week-header">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            if (day.type === 'empty') {
              return <div key={`empty-${index}`} className="calendar-cell empty"></div>;
            }

            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`;
            const isHolidayDay = isHoliday(dateStr);
            const isToday = day.isToday;
            const isWeekend = day.isWeekend;

            return (
              <div
                key={`day-${index}`}
                className={`calendar-cell day 
                  ${isToday ? 'today' : ''} 
                  ${isHolidayDay ? 'holiday' : ''}
                  ${isWeekend ? 'weekend' : ''}
                `}
                title={isHolidayDay ? getHolidayName(dateStr) : ''}
              >
                <div className="day-number">{day.value}</div>
                {isHolidayDay && (
                  <div className="holiday-indicator">🎉</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color today"></div>
            <span>Today</span>
          </div>
          <div className="legend-item">
            <div className="legend-color holiday"></div>
            <span>Holiday</span>
          </div>
          <div className="legend-item">
            <div className="legend-color weekend"></div>
            <span>Weekend</span>
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="upcoming-holidays">
          <h4 className="upcoming-title">🎊 Upcoming Holidays</h4>
          <div className="holidays-list">
            {getUpcomingHolidays().map((holiday, index) => (
              <div key={index} className="holiday-item">
                <div className="holiday-date">
                  {new Date(holiday.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="holiday-name">{holiday.name}</div>
                <div className="holiday-days">
                  {Math.ceil((new Date(holiday.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CalendarModal;