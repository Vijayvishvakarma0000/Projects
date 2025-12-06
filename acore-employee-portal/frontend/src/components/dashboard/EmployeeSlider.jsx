// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const EmployeeSlider = () => {
//   // ------- Employee Data SAME FILE me --------
//   const employees = [
//     {
//       name: "Rahul Sharma",
//       role: "Frontend Developer",
//       joined: "15 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=12",
//     },
//     {
//       name: "Neha Singh",
//       role: "HR Manager",
//       joined: "12 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=47",
//     },
//     {
//       name: "Arjun Verma",
//       role: "Backend Developer",
//       joined: "10 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=32",
//     },
//     {
//       name: "Simran Kaur",
//       role: "UI/UX Designer",
//       joined: "09 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=24",
//     },
//   ];

//   return (
//     <div className="new-emp-container">
//       <h2 className="slider-title">New Joined Employees</h2>

//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation
//         autoplay={{ delay: 2500 }}
//         spaceBetween={20}
//         slidesPerView={3}
//         className="emp-swiper"
//       >
//         {employees.map((emp, index) => (
//           <SwiperSlide key={index}>
//             <div className="emp-card">
//               <img src={emp.photo} alt={emp.name} className="emp-img" />

//               <h3 className="emp-name">{emp.name}</h3>
//               <p className="emp-role">{emp.role}</p>
//               <p className="emp-date">Joined: {emp.joined}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* ------- CSS SAME FILE me ---------- */}
//       <style>{`
//         .new-emp-container {
//           width: 100%;
//           background: #ffffff;
//           border-radius: 18px;
//           padding: 25px;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.1);
//           margin-top: 20px;
//         }

//         .slider-title {
//           font-size: 20px;
//           font-weight: 600;
//           margin-bottom: 15px;
//           color: #1d3557;
//         }

//         .emp-card {
//           background: #f7f9fc;
//           border-radius: 14px;
//           padding: 20px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           transition: 0.3s ease-in-out;
//         }

//         .emp-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 6px 20px rgba(0,0,0,0.12);
//         }

//         .emp-img {
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           object-fit: cover;
//           margin: auto;
//         }

//         .emp-name {
//           margin-top: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           color: #1e3c72;
//         }

//         .emp-role {
//           font-size: 14px;
//           color: #6c757d;
//         }

//         .emp-date {
//           font-size: 12px;
//           color: #22ae80;
//           margin-top: 4px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EmployeeSlider;


// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const EmployeeSlider = () => {
//   const employees = [
//     {
//       name: "Rahul Sharma",
//       role: "Frontend Developer",
//       joined: "15 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=12",
//     },
//     {
//       name: "Neha Singh",
//       role: "HR Manager",
//       joined: "12 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=47",
//     },
//     {
//       name: "Arjun Verma",
//       role: "Backend Developer",
//       joined: "10 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=32",
//     },
//     {
//       name: "Simran Kaur",
//       role: "UI/UX Designer",
//       joined: "09 Feb 2025",
//       photo: "https://i.pravatar.cc/150?img=24",
//     },
//   ];

//   return (
//     <div className="new-emp-container">
//       <h2 className="slider-title">New Joined Employees</h2>

//     <Swiper
//   modules={[Navigation, Autoplay]}
//   navigation
//   autoplay={{ delay: 2500 }}
//   spaceBetween={20}
//   slidesPerView={3}
//   breakpoints={{
//     0: {
//       slidesPerView: 1.2, 
//     },
//     360: {
//       slidesPerView: 1.4,
//     },
//     480: {
//       slidesPerView: 2,   
//     },
//     640: {
//       slidesPerView: 2.2,
//     },
//     768: {
//       slidesPerView: 2.5, 
//     },
//     1024: {
//       slidesPerView: 3,   
//     },
//   }}
//   className="emp-swiper"
// >

//         {employees.map((emp, index) => (
//           <SwiperSlide key={index}>
//             <div className="emp-card">
//               <img src={emp.photo} alt={emp.name} className="emp-img" />

//               <h3 className="emp-name">{emp.name}</h3>
//               <p className="emp-role">{emp.role}</p>
//               <p className="emp-date">Joined: {emp.joined}</p>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       <style>{`
//         .new-emp-container {
//           width: 100%;
//           background: #linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
//           border-radius: 18px;
//           padding: 25px;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.1);
//           margin-top: 20px;
//         }

//         .slider-title {
//           font-size: 20px;
//           font-weight: 600;
//           margin-bottom: 15px;
//           color: #ffffffff;
//         }

//         .emp-card {
//           background: #f7f9fc;
//           border-radius: 14px;
//           padding: 20px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.08);
//           transition: 0.3s ease-in-out;
//         }

//         .emp-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 6px 20px rgba(0,0,0,0.12);
//         }

//         .emp-img {
//           width: 80px;
//           height: 80px;
//           border-radius: 50%;
//           object-fit: cover;
//           margin: auto;
//         }

//         .emp-name {
//           margin-top: 10px;
//           font-size: 16px;
//           font-weight: 600;
//           color: #1e3c72;
//         }

//         .emp-role {
//           font-size: 14px;
//           color: #6c757d;
//         }

//         .emp-date {
//           font-size: 12px;
//           color: #22ae80;
//           margin-top: 4px;
//         }

//         /* -------------------------------------------------- */
//         /*              RESPONSIVE SLIDER FIXES              */
//         /* -------------------------------------------------- */

//         @media (max-width: 768px) {
//           .emp-card {
//             padding: 16px;
//           }

//           .emp-img {
//             width: 65px;
//             height: 65px;
//           }

//           .slider-title {
//             font-size: 18px;
//           }
//         }

//         @media (max-width: 480px) {
//           .new-emp-container {
//             padding: 18px;
//           }

//           .emp-card {
//             padding: 14px;
//           }

//           .emp-img {
//             width: 60px;
//             height: 60px;
//           }

//           .emp-name {
//             font-size: 15px;
//           }

//           .emp-role {
//             font-size: 13px;
//           }

//           .emp-date {
//             font-size: 11px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default EmployeeSlider;






import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const EmployeeSlider = () => {
  const employees = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      joined: "15 Feb 2025",
      photo: "https://i.pravatar.cc/150?img=12",
    },
    {
      name: "Neha Singh",
      role: "HR Manager",
      joined: "12 Feb 2025",
      photo: "https://i.pravatar.cc/150?img=47",
    },
    {
      name: "Arjun Verma",
      role: "Backend Developer",
      joined: "10 Feb 2025",
      photo: "https://i.pravatar.cc/150?img=32",
    },
    {
      name: "Simran Kaur",
      role: "UI/UX Designer",
      joined: "09 Feb 2025",
      photo: "https://i.pravatar.cc/150?img=24",
    },
  ];

  return (
    <div className="new-emp-container">
      <h2 className="slider-title">New Joined Employees</h2>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 2500 }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          360: {
            slidesPerView: 1.4,
          },
          480: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2.2,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="emp-swiper"
      >
        {employees.map((emp, index) => (
          <SwiperSlide key={index}>
            <div className="emp-card">
              <img src={emp.photo} alt={emp.name} className="emp-img" />
              <h3 className="emp-name">{emp.name}</h3>
              <p className="emp-role">{emp.role}</p>
              <p className="emp-date">Joined: {emp.joined}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .new-emp-container {
          width: 100%;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
          margin-top: 20px;
          border: 1px solid #ffffff;
        }

        .slider-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #ffffff;
        }

        .emp-card {
          background: #f7f9fc;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: 0.3s ease-in-out;
          /* Remove any transform effects from Swiper */
          transform: none !important;
        }

        .emp-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }

        .emp-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin: auto;
        }

        .emp-name {
          margin-top: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #1e3c72;
        }

        .emp-role {
          font-size: 14px;
          color: #6c757d;
        }

        .emp-date {
          font-size: 12px;
          color: #22ae80;
          margin-top: 4px;
        }

        /* -------------------------------------------------- */
        /*          SWIPER ACTIVE SLIDE FIXES                */
        /* -------------------------------------------------- */
        
        /* Remove Swiper's default active slide styles */
        .emp-swiper .swiper-slide {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }
        
        /* Remove any background/overlay on active slides */
        .emp-swiper .swiper-slide-active,
        .emp-swiper .swiper-slide-next,
        .emp-swiper .swiper-slide-prev {
          opacity: 1 !important;
          background: transparent !important;
        }
        
        /* Ensure all cards look the same */
        .emp-swiper .swiper-slide .emp-card {
          opacity: 1 !important;
          background: #f7f9fc !important;
        }

        /* -------------------------------------------------- */
        /*              RESPONSIVE SLIDER FIXES              */
        /* -------------------------------------------------- */

        @media (max-width: 768px) {
          .emp-card {
            padding: 16px;
          }

          .emp-img {
            width: 65px;
            height: 65px;
          }

          .slider-title {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .new-emp-container {
            padding: 18px;
          }

          .emp-card {
            padding: 14px;
          }

          .emp-img {
            width: 60px;
            height: 60px;
          }

          .emp-name {
            font-size: 15px;
          }

          .emp-role {
            font-size: 13px;
          }

          .emp-date {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeSlider;