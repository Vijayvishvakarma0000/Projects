// import React, { useState, useEffect } from 'react';
// import { ANNOUNCEMENTS } from '../../data/mockData';
// import './AnnouncementSlider.css';

// const AnnouncementSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <section className="announcements-section">
//       <div className="announcements-header">
//         <h2 className="announcements-title">
//           <span className="announcements-icon">📢</span>
//           Announcements
//         </h2>
//       </div>

//       <div className="announcements-slider">
//         <div className="slider-container">
//           {ANNOUNCEMENTS.map((announcement, index) => (
//             <div
//               key={announcement.id}
//               className={`announcement-slide ${index === currentSlide ? 'active' : ''}`}
//             >
//               <div className="announcement-content">
//                 <h3 className="announcement-title">{announcement.title}</h3>
//                 <p className="announcement-text">{announcement.content}</p>
//                 <div className="announcement-date">
//                   <span className="date-icon">📅</span>
//                   {announcement.date}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="slider-controls">
//           {ANNOUNCEMENTS.map((_, index) => (
//             <button
//               key={index}
//               className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnnouncementSlider;












// import React, { useState, useEffect } from 'react';
// import './AnnouncementSlider.css';


// const ANNOUNCEMENTS = [
//   {
//     id: 1,
//     title: "New Course Launch",
//     content: "We're excited to announce our new Advanced JavaScript course starting next month.",
//     date: "March 15, 2023",
//     bgType: "particles"
//   },
//   {
//     id: 2,
//     title: "Campus Maintenance",
//     content: "There will be scheduled maintenance this weekend. Services may be temporarily unavailable.",
//     date: "March 18, 2023",
//     bgType: "waves"
//   },
//   {
//     id: 3,
//     title: "Scholarship Applications",
//     content: "Applications for the Fall 2023 scholarship program are now open. Deadline is April 30.",
//     date: "March 20, 2023",
//     bgType: "gradient"
//   },
//   {
//     id: 4,
//     title: "Guest Lecture Series",
//     content: "Join us for our weekly guest lecture series featuring industry experts every Friday.",
//     date: "March 22, 2023",
//     bgType: "geometric"
//   }
// ];

// const AnnouncementSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };


//   const renderBackground = (bgType) => {
//     switch(bgType) {
//       case 'particles':
//         return (
//           <div className="bg-particles">
//             {[...Array(15)].map((_, i) => (
//               <div key={i} className="particle" style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${3 + Math.random() * 4}s`
//               }}></div>
//             ))}
//           </div>
//         );
//       case 'waves':
//         return (
//           <div className="bg-waves">
//             <div className="wave wave-1"></div>
//             <div className="wave wave-2"></div>
//             <div className="wave wave-3"></div>
//           </div>
//         );
//       case 'gradient':
//         return (
//           <div className="bg-gradient-move"></div>
//         );
//       case 'geometric':
//         return (
//           <div className="bg-geometric">
//             <div className="shape shape-1"></div>
//             <div className="shape shape-2"></div>
//             <div className="shape shape-3"></div>
//             <div className="shape shape-4"></div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <section className="announcements-section">
//       <div className="announcements-header">
//         <h2 className="announcements-title">
//           <span className="announcements-icon">📢</span>
//           Announcements
//         </h2>
//       </div>

//       <div className="announcements-slider">
//         <div className="slider-container">
//           {ANNOUNCEMENTS.map((announcement, index) => (
//             <div
//               key={announcement.id}
//               className={`announcement-slide ${index === currentSlide ? 'active' : ''}`}
//             >
          
//               {renderBackground(announcement.bgType)}
              
//               {/* Content overlay */}
//               <div className="content-overlay">
//                 <div className="announcement-content">
//                   <h3 className="announcement-title">{announcement.title}</h3>
//                   <p className="announcement-text">{announcement.content}</p>
//                   <div className="announcement-date">
//                     <span className="date-icon">📅</span>
//                     {announcement.date}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="slider-controls">
//           {ANNOUNCEMENTS.map((_, index) => (
//             <button
//               key={index}
//               className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnnouncementSlider;








import React, { useState, useEffect } from "react";
import "./AnnouncementSlider.css";

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "New IT Project Launch",
    content: "We are starting a new enterprise-level IT project for a major client.",
    date: "Feb 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1zsZqjgML6Y09xDryVafVIR_FKtSRRTYNLw&s"
  },
  {
    id: 2,
    title: "System Upgrade",
    content: "Server maintenance will take place this weekend. Some services may be offline.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  },
  {
    id: 3,
    title: "Job Openings",
    content: "We are hiring Developers, Designers & QA. Apply this month!",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58"
  },
  {
    id: 4,
    title: "Client Visit",
    content: "International clients will be visiting the office on Friday.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664"
  }
];

const AnnouncementSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section
      className="announcements-section"
      style={{ backgroundImage: `url(${ANNOUNCEMENTS[currentSlide].image})` }}
    >
      <div className="overlay-dark"></div>

      <div className="announcements-header">
        <h2 className="announcements-title">📢 Latest Announcements</h2>
      </div>

      <div className="announcements-slider">
        <div className="slider-container">
          {ANNOUNCEMENTS.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`announcement-slide ${index === currentSlide ? "active" : ""}`}
            >
              <div className="content-overlay">
                <h3 className="announcement-title">{announcement.title}</h3>
                <p className="announcement-text">{announcement.content}</p>
                <div className="announcement-date">📅 {announcement.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          {ANNOUNCEMENTS.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSlider;
