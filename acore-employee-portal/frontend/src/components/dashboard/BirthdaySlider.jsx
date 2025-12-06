// // import React, { useState, useEffect } from 'react';
// // import './BirthdaySlider.css';

// // const BirthdaySlider = () => {
// //   const [currentSlide, setCurrentSlide] = useState(0);

// //   // Dummy data for next 7 days
// //   const slides = [
// //     {
// //       type: 'birthday',
// //       icon: '🎂',
// //       title: 'Today\'s Birthday',
// //       person: 'Rajesh Kumar',
// //       designation: 'Senior Developer',
// //       date: 'Today',
// //       message: 'Wish him a very Happy Birthday! 🎉'
// //     },
// //     {
// //       type: 'anniversary',
// //       icon: '🏆',
// //       title: 'Work Anniversary',
// //       person: 'Priya Sharma',
// //       designation: 'Project Manager',
// //       date: 'Today',
// //       message: '3 years of excellence! 🎊'
// //     },
// //     {
// //       type: 'birthday',
// //       icon: '🎂',
// //       title: 'Tomorrow\'s Birthday',
// //       person: 'Amit Singh',
// //       designation: 'UI/UX Designer',
// //       date: 'Tomorrow',
// //       message: 'Get ready to celebrate! 🥳'
// //     },
// //     {
// //       type: 'birthday',
// //       icon: '🎂',
// //       title: 'Upcoming Birthday',
// //       person: 'Neha Gupta',
// //       designation: 'HR Executive',
// //       date: '2 days later',
// //       message: 'Birthday bash coming soon! 🎈'
// //     },
// //     {
// //       type: 'anniversary',
// //       icon: '🏆',
// //       title: 'Work Anniversary',
// //       person: 'Vikram Patel',
// //       designation: 'Team Lead',
// //       date: '3 days later',
// //       message: '5 years with the company! 🌟'
// //     },
// //     {
// //       type: 'birthday',
// //       icon: '🎂',
// //       title: 'Weekend Birthday',
// //       person: 'Sneha Reddy',
// //       designation: 'Software Engineer',
// //       date: 'This weekend',
// //       message: 'Weekend celebrations! 🎁'
// //     }
// //   ];

// //   // Auto slide every 5 seconds
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentSlide((prev) => (prev + 1) % slides.length);
// //     }, 5000);

// //     return () => clearInterval(interval);
// //   }, [slides.length]);

// //   const nextSlide = () => {
// //     setCurrentSlide((prev) => (prev + 1) % slides.length);
// //   };

// //   const prevSlide = () => {
// //     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
// //   };

// //   return (
// //     <div className="birthday-slider-section">
// //       <div className="slider-header">
// //         <h2 className="slider-title">🎉 Celebrations This Week</h2>
// //         <div className="slider-nav">
// //           <button className="nav-btn prev-btn" onClick={prevSlide}>‹</button>
// //           <span className="slide-counter">{currentSlide + 1}/{slides.length}</span>
// //           <button className="nav-btn next-btn" onClick={nextSlide}>›</button>
// //         </div>
// //       </div>

// //       <div className="slider-container">
// //         <div 
// //           className="slider-track"
// //           style={{ transform: `translateX(-${currentSlide * 100}%)` }}
// //         >
// //           {slides.map((slide, index) => (
// //             <div key={index} className="slide">
// //               <div className={`slide-card ${slide.type}`}>
// //                 <div className="slide-icon">
// //                   <span>{slide.icon}</span>
// //                 </div>
                
// //                 <div className="slide-content">
// //                   <h3 className="slide-title">{slide.title}</h3>
// //                   <h4 className="person-name">{slide.person}</h4>
// //                   <p className="person-designation">{slide.designation}</p>
                  
// //                   <div className="date-badge">
// //                     <span className="date-icon">📅</span>
// //                     <span className="date-text">{slide.date}</span>
// //                   </div>
                  
// //                   <p className="celebration-message">{slide.message}</p>
                  
// //                   <button className="wish-btn">
// //                     {slide.type === 'birthday' ? '🎂 Send Wish' : '🎊 Congratulate'}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="slider-dots">
// //         {slides.map((_, index) => (
// //           <button
// //             key={index}
// //             className={`dot ${index === currentSlide ? 'active' : ''}`}
// //             onClick={() => setCurrentSlide(index)}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BirthdaySlider;



// import React, { useEffect } from "react";
// import Glide from "@glidejs/glide";
// import "./BirthdaySlider.css";

// const BirthdaySlider = () => {
//   const employees = [
//     {
//       id: 1,
//       type: "birthday",
//       name: "Rajesh Kumar",
//       designation: "Senior Developer",
//       date: "Today",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
//       department: "Engineering",
//     },
//     {
//       id: 2,
//       type: "anniversary",
//       name: "Priya Sharma",
//       designation: "Project Manager",
//       date: "Today",
//       image:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
//       department: "Management",
//     },
//     {
//       id: 3,
//       type: "birthday",
//       name: "Amit Singh",
//       designation: "UI/UX Designer",
//       date: "Tomorrow",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
//       department: "Design",
//     },
//     {
//       id: 4,
//       type: "birthday",
//       name: "Neha Gupta",
//       designation: "HR Executive",
//       date: "Dec 28",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
//       department: "HR",
//     },
//     {
//       id: 5,
//       type: "anniversary",
//       name: "Vikram Patel",
//       designation: "Team Lead",
//       date: "Dec 29",
//       image:
//         "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
//       department: "Engineering",
//     },
//     {
//       id: 6,
//       type: "birthday",
//       name: "Sneha Reddy",
//       designation: "Software Engineer",
//       date: "Dec 30",
//       image:
//         "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face",
//       department: "Engineering",
//     },
//   ];

//   useEffect(() => {
//     const glide = new Glide(".glide", {
//       type: "carousel",
//       perView: 4,
//       focusAt: "center",
//       autoplay: 2000,
//       hoverpause: true,
//       gap: 20,
//       animationDuration: 1200,
//       animationTimingFunc: "ease-in-out",
//     });

//     glide.mount();
//     return () => glide.destroy();
//   }, []);

//   return (
//     <div className="birthday-slider-section">
//       <h2 className="slider-title">🎉 Celebrations This Week</h2>

//       <div className="glide">
//         <div className="glide__track" data-glide-el="track">
//           <ul className="glide__slides">
//             {employees.map((emp) => (
//               <li
//                 key={emp.id}
//                 className={`glide__slide employee-card ${emp.type}`}
//               >
//                 <span className="card-badge">
//                   {emp.type === "birthday" ? "🎂" : "🏆"}
//                 </span>

//                 <div className="employee-image">
//                   <img src={emp.image} alt={emp.name} />
//                 </div>

//                 <div className="employee-details">
//                   <h4>{emp.name}</h4>
//                   <p className="designation">{emp.designation}</p>
//                   <p className="department">{emp.department}</p>

//                   <div className="celebration-info">
//                     <span>📅 {emp.date}</span>
//                     <span
//                       className={`type-badge ${
//                         emp.type === "birthday" ? "birthday" : "anniversary"
//                       }`}
//                     >
//                       {emp.type === "birthday"
//                         ? "Birthday"
//                         : "Work Anniversary"}
//                     </span>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="glide__arrows" data-glide-el="controls">
//           <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
//             ‹
//           </button>
//           <button
//             className="glide__arrow glide__arrow--right"
//             data-glide-dir=">"
//           >
//             ›
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BirthdaySlider;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "./BirthdaySlider.css";

// const BirthdaySlider = () => {
//   const employees = [
//     { id: 1, type: "birthday", name: "Rajesh Kumar", designation: "Senior Dev", date: "Nov 22", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     { id: 2, type: "anniversary", name: "Priya Sharma", designation: "PM", date: "Nov 23", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
//     { id: 3, type: "birthday", name: "Amit Singh", designation: "UI/UX", date: "Nov 24", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     { id: 4, type: "birthday", name: "Neha Gupta", designation: "HR", date: "Nov 25", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     { id: 5, type: "anniversary", name: "Vikram Patel", designation: "Team Lead", date: "Nov 26", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     { id: 6, type: "birthday", name: "Sneha Reddy", designation: "Software Eng", date: "Nov 27", image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face" }
//   ];

//   return (
//     <section className="team-slider swiper init-swiper">
//       <h2 className="slider-heading">🎉 Celebrations This Week</h2>
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={30}
//         slidesPerView={3}
//         loop={true}
//         autoplay={{ delay: 1800, disableOnInteraction: false }}
//         className="swiper-container"
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//       >
//         {employees.map((emp) => (
//           <SwiperSlide key={emp.id} className={`swiper-slide ${emp.type}`}>
//             <div className="team-card">
//               <div className="badge">{emp.type === "birthday" ? "🎂" : "🏆"}</div>
//               <div className="img-box">
//                 <img src={emp.image} alt={emp.name} />
//               </div>
//               <div className="content">
//                 <h4>{emp.name}</h4>
//                 <p className="designation">{emp.designation}</p>
//                 <p className="date">📅 {emp.date}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default BirthdaySlider;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";
// import "./BirthdaySlider.css";

// const BirthdaySlider = () => {
//   const employees = [
//     { id: 1, type: "birthday", name: "Rajesh Kumar", designation: "Senior Developer", date: "Nov 22", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
//     { id: 2, type: "anniversary", name: "Priya Sharma", designation: "Project Manager", date: "Nov 23", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
//     { id: 3, type: "birthday", name: "Amit Singh", designation: "UI/UX Designer", date: "Nov 24", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
//     { id: 4, type: "birthday", name: "Neha Gupta", designation: "HR Executive", date: "Nov 25", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
//     { id: 5, type: "anniversary", name: "Vikram Patel", designation: "Team Lead", date: "Nov 26", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
//     { id: 6, type: "birthday", name: "Sneha Reddy", designation: "Software Engineer", date: "Nov 27", image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face" }
//   ];

//   return (
//     <section className="team-slider swiper init-swiper">
//       <h2 className="slider-heading">🎉 Weekly Employee Celebrations</h2>
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={30}
//         slidesPerView={3}
//         loop={true}
//         autoplay={{ delay: 2000, disableOnInteraction: false }}
//         speed={1000}
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         className="swiper-container"
//       >
//         {employees.map((emp) => (
//           <SwiperSlide key={emp.id} className={`swiper-slide ${emp.type}`}>
          

//             <div className="team-card-modern">
//   <div className="card-header">
//     <div className="badge-modern">
//       {emp.type === "birthday" ? "🎂 Birthday" : "🏆 Anniversary"}
//     </div>
//   </div>
  
//   <div className="card-body">
//     <div className="profile-section">
//       <div className="img-container">
//         <img src={emp.image} alt={emp.name} />
//         <div className="image-overlay"></div>
//       </div>
//       <div className="profile-info">
//         <h4 className="employee-name">{emp.name}</h4>
//         <p className="designation">{emp.designation}</p>
//         <div className="date-info">
//           <span className="date-icon">📅</span>
//           <span className="date-text">{emp.date}</span>
//         </div>
//       </div>
//     </div>

//     <div className="greeting-section">
//       <div className="greeting-content">
//         {emp.type === "birthday" ? (
//           <>
//             <div className="greeting-icon">🎉</div>
//             <p className="greeting-text">
//               Happy Birthday, <strong>{emp.name.split(" ")[0]}</strong>!<br />
//               <span className="wish-text">Wishing you joy and success!</span>
//             </p>
//           </>
//         ) : (
//           <>
//             <div className="greeting-icon">🌟</div>
//             <p className="greeting-text">
//               Happy Work Anniversary, <strong>{emp.name.split(" ")[0]}</strong>!<br />
//               <span className="wish-text">Thanks for your dedication!</span>
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default BirthdaySlider;




import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "./BirthdaySlider.css";

const BirthdaySlider = () => {
  const employees = [
    { id: 1, type: "birthday", name: "Rajesh Kumar", designation: "Senior Developer", date: "Nov 22", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    { id: 2, type: "anniversary", name: "Priya Sharma", designation: "Project Manager", date: "Nov 23", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
    { id: 3, type: "birthday", name: "Amit Singh", designation: "UI/UX Designer", date: "Nov 24", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { id: 4, type: "birthday", name: "Neha Gupta", designation: "HR Executive", date: "Nov 25", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    { id: 5, type: "anniversary", name: "Vikram Patel", designation: "Team Lead", date: "Nov 26", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { id: 6, type: "birthday", name: "Sneha Reddy", designation: "Software Engineer", date: "Nov 27", image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face" }
  ];

  return (
    <section className="team-slider swiper init-swiper">
      <h2 className="slider-heading">🎉 Weekly Employee Celebrations</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1000}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="swiper-container"
      >
        {employees.map((emp) => (
          <SwiperSlide key={emp.id} className={`swiper-slide ${emp.type}`}>
            <div className="team-card-modern">
              <div className="card-header">
                <div className="badge-modern">
                  {emp.type === "birthday" ? "🎂 Birthday" : "🏆 Anniversary"}
                </div>
              </div>
              
              <div className="card-body">
                <div className="profile-section">
                  <div className="img-container">
                    <img src={emp.image} alt={emp.name} />
                    <div className="image-overlay"></div>
                  </div>
                  <div className="profile-info">
                    <h4 className="employee-name">{emp.name}</h4>
                    <p className="designation">{emp.designation}</p>
                    <div className="date-info">
                      <span className="date-icon">📅</span>
                      <span className="date-text">{emp.date}</span>
                    </div>
                  </div>
                </div>

                <div className="greeting-section">
                  <div className="greeting-content">
                    {emp.type === "birthday" ? (
                      <>
                        <div className="greeting-icon">🎉</div>
                        <p className="greeting-text">
                          Happy Birthday, <strong>{emp.name.split(" ")[0]}</strong>!<br />
                          <span className="wish-text">Wishing you joy and success!</span>
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="greeting-icon">🌟</div>
                        <p className="greeting-text">
                          Happy Work Anniversary, <strong>{emp.name.split(" ")[0]}</strong>!<br />
                          <span className="wish-text">Thanks for your dedication!</span>
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BirthdaySlider;