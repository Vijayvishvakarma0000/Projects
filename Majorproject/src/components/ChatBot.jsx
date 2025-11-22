
// import React, { useState, useRef, useEffect } from 'react';
// import './ChatBot.css';
// import { RiCustomerService2Fill } from "react-icons/ri";
// import { MdSupportAgent, MdEventNote, MdLocationOn, MdCall } from "react-icons/md";
// import { FaMobileAlt, FaGlobe, FaCloud, FaChartLine, FaShieldAlt, FaUserCircle } from "react-icons/fa";
// import { FaRobot, FaRegHandPeace } from "react-icons/fa6";
// import acorelogo from '../assets/images/acorelogo.png';
// import roboicon from '../assets/images/roboicon.jpg';
// import { ArrowLeft } from "lucide-react";

// // Services Component
// const ServicesComponent = () => {
//   const mainServices = {
//    Development: [
//     "Android",
//     "iOS",
//     "Web Based",
//   ],
//     Marketing: [
//       "SEO (ON/OFF-Pages)",
//       "Meta & Google Ads",
//       "Social Media Marketing",
//       "Content Marketing",
//       "Email Marketing",
//       "Lead Generation"
//     ],
//     Designing: ["Figma", "Website/App", "Graphic Designing", "UI/UX" , "Templates"],
//   };

//   const [activeService, setActiveService] = useState(null);
//   const [showSubOptions, setShowSubOptions] = useState(false);
//   const [showScheduleMessage, setShowScheduleMessage] = useState(false);

//   const handleServiceClick = (serviceName) => {
//     setShowSubOptions(false);
//     setTimeout(() => {
//       setActiveService(serviceName);
//       setShowSubOptions(true);
//     }, 400);
//   };

//   const handleBackClick = () => {
//     setShowSubOptions(false);
//     setTimeout(() => setActiveService(null), 400);
//   };

//   const handleScheduleClick = () => {
//     setShowScheduleMessage(true);
//     setTimeout(() => setShowScheduleMessage(false), 4000);
//   };

//   return (
//     <div className="services-simple-list">
//       <div className="services-header-box">
//         <h3 className="services-title">Our Services</h3>
//       </div>

//       <div className="services-items">
//         {!activeService &&
//           Object.keys(mainServices).map((service, index) => (
//             <div
//               key={index}
//               className="service-item"
//               onClick={() => handleServiceClick(service)}
//             >
//               {service}
//             </div>
//           ))}

//         {activeService && showSubOptions && (
//           <div className="sub-service-list animate">
//             <button className="back-icon-btn" onClick={handleBackClick}>
//               <ArrowLeft size={18} />
//             </button>
//             {mainServices[activeService].map((sub, idx) => (
//               <div key={idx} className="sub-service-item">
//                 {sub}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Schedule Call Button */}
//       {/* <div className="schedule-call-box">
//         <button className="schedule-call-btn" onClick={handleScheduleClick}>
//           Schedule a Call 📞
//         </button>
//       </div> */}

//       {/* Message after clicking */}
//       {showScheduleMessage && (
//         <div className="schedule-message">
//           Perfect! Our team will contact you within 24 hours to schedule a
//           convenient time for your consultation.
//         </div>
//       )}

//       <div className="services-footer">
//         Which service interests you most? 💬
//       </div>
//     </div>
//   );
// };

// // Time Slots Component - EXACT DEEPSEEK STYLE
// const TimeSlotsComponent = ({ onTimeSlotSelect }) => {
// const timeSlots = [
//   { label: "Morning", time: "9 AM - 12 PM" },
//   { label: "Afternoon", time: "12 PM - 3 PM" },
//   { label: "Evening", time: "3 PM - 6 PM" },
// ];



//   return (
//     <div className="time-slots-simple">
//       <div className="time-slots-header-simple">
//         <h3>Great! Please choose a slot:</h3>
//       </div>
      
//       <div className="time-slots-grid">
//       {timeSlots.map((slot, index) => (
//   <button
//     key={slot.id}
//     className={`time-slot-item deepseek-hover ${index === 2 ? 'single' : ''}`}
//     onClick={() => onTimeSlotSelect(slot)}
//     style={{ animationDelay: `${index * 0.2}s` }}
//   >
//     <span className="slot-main-text">{slot.label}</span>
//   </button>
// ))}

//       </div>
      
//       <div className="time-slots-note">
//         We'll send you a calendar invitation with meeting details
//       </div>
//     </div>
//   );
// };
// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Acore Assistant\n  Welcome to Acore IT Hub Pvt. Ltd.\nHow can I help you today?",
//       isUser: false,
//       timestamp: new Date(),
//       showIcon: true
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showQuickActions, setShowQuickActions] = useState(true);

//   const messagesEndRef = useRef(null);
//   const chatMessagesRef = useRef(null);

//   const defaultConfig = {
//     company_name: "Acore IT Hub Pvt. Ltd.",
//     bot_name: "Acore Assistant",
//     welcome_message: "Hello! I'm Acore Assistant\n  Welcome to Acore IT Hub Pvt. Ltd.\nHow can I help you today?",
//     status_text: "Online – typically replies within a minute",
//     tagline: "Powered by Acore IT Hub Pvt. Ltd.",
//     subtitle: "Innovation | Technology | Growth",
//     service_1: "  Our Services",
//     service_2: "  Talk to Support",
//     service_3: "  Book a Meeting",
//     service_4: "  Office Location",
//     service_5: "  Contact Team",
//     primary_color: "#8e2de2",
//     secondary_color: "#4a00e0",
//     background_color: "#FFFFFF",
//     text_color: "#2E2E2E"
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   const addMessage = (text, isUser = false, type = 'text', component = null) => {
//     const newMessage = {
//       id: messages.length + 1,
//       text,
//       isUser,
//       timestamp: new Date(),
//       type: type, // 'text', 'services', 'timeSlots'
//       component: component
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   // const handleTimeSlotSelect = (slot) => {
//   //   addMessage(`Book ${slot.label} Slot`, true);
    
//   //   setIsTyping(true);
//   //   setTimeout(() => {
//   //     setIsTyping(false);
//   //     addMessage(
//   //       `Slot confirmed! You'll receive an email invitation with meeting details shortly. Our team is excited to connect with you during ${slot.label} (${slot.time}).`
//   //     );
//   //   }, 1500);
//   // };

// //   const handleTimeSlotSelect = (slot) => {
// //   addMessage(`Book ${slot.label} Slot`, true);

// //   setIsTyping(true);
// //   setTimeout(() => {
// //     setIsTyping(false);
// //     addMessage(
// //       ` Slot confirmed! You'll receive an email invitation shortly for your ${slot.label} (${slot.time}) meeting.<br/>
// //       Please click the link below to fill in your details 👇
// //       <a href="https://acoreithub.com/contactpage" target="_blank" style="color:#007bff; text-decoration:underline;">
// //         Fill your details here
// //       </a>`
// //     );
// //   }, 1500);
// // };
// const handleTimeSlotSelect = (slot) => {
//   addMessage(`Book ${slot.label} Slot`, true);

//   setIsTyping(true);
//   setTimeout(() => {
//     setIsTyping(false);
//     addMessage(
//       `Slot confirmed! You'll receive an email invitation shortly for your ${slot.label} (${slot.time}) meeting.<br/>
//       Please click the link below to fill in your details 👇
//       <a href="https://acoreithub.com/contactpage" target="_blank" style="color:#007bff; text-decoration:underline;">
//         Fill your details here
//       </a>`
//     );
//   }, 1500);
// };




//   const handleBotResponse = (userMessage) => {
//     setIsTyping(true);
    
//     setTimeout(() => {
//       setIsTyping(false);
      
//       const lowerMessage = userMessage.toLowerCase();
      
//       if (lowerMessage.includes('service') || lowerMessage.includes('our services')) {
//         addMessage('services_component', false, 'services');

//      } else if (lowerMessage.includes('support') || lowerMessage.includes('talk to support')) {
// addMessage(
//   'Technical Support Team <br/><br/>' +
//   'Our experts are available 24/7 to assist you.<br/><br/>' +
//   '📞 Call (WhatsApp available):<br/>' +
//   '<a href="https://wa.me/918871855460" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-8871855460</a><br/>' +
//   '<a href="https://wa.me/917071234515" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-7071234515</a><br/>' +
//   '<a href="https://wa.me/916265748525" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-6265748525</a><br/><br/>' +
//   '<b>Email:</b> <a href="https://mail.google.com/mail/u/0/#search/info@acoreithub.com?compose=new" target="_blank" style="color:#4a00e0; text-decoration:underline;">info@acoreithub.com</a><br/><br/>' +
//   'Please share your query details for faster resolution.'
// );

// } else if (lowerMessage.includes('meeting') || lowerMessage.includes('book a meeting')) {
//         addMessage('time_slots_component', false, 'timeSlots');
//       } else if (lowerMessage.includes('location') || lowerMessage.includes('office location')) {
//         addMessage(
//           '  <b>Our Office Location</b><br><br>' +
//           '<b>Acore IT Hub Pvt. Ltd.</b><br>' +
//           'Behind Apollo Premiere, Vijay Nagar, Ratna Lok Colony, Indore, MP 452010<br><br>' +
//           '  <a href="https://www.google.com/maps/dir/ACORE+IT+HUB+PVT+LTD.+%7C+Web+Development+%7C+Digital+Marketing+%7C+App+Development+Services,+Apollo+Premiere,+Vijay+Nagar,+Ratna+Lok+Colony,+Indore,+Madhya+Pradesh/22.7494444,75.8991667/@22.7494729,75.8966492,721m/data=!3m2!1e3!4b1!4m8!4m7!1m5!1m1!1s0x3962fd564d244811:0x76ef7253df9a8f0e!2m2!1d75.8992922!2d22.7495001!1m0?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" style="color:#4a00e0; font-weight:600; text-decoration:underline;">Get Directions</a><br><br>' +
//           'We serve clients globally! '
//         );
//       } else if (lowerMessage.includes('contact') || lowerMessage.includes('contact team')) {
//         addMessage(
//           '   <b>Contact Our Teams</b><br><br>' +
//           '   <b>Info:</b> <a href="https://mail.google.com/mail/u/0/#search/info%40acoreithub.com?compose=new" target="_blank" style="color:#4a00e0; text-decoration:underline;">info@acoreithub.com</a><br><br>' +
//           '   <b>HR:</b> <a href="https://mail.google.com/mail/u/0/#search/hrofficial%40acoreithub.com?compose=new" target="_blank" style="color:#4a00e0; text-decoration:underline;">hrofficial@acoreithub.com</a><br><br>' +
//           '   <b>Phone:</b> <a href="https://wa.me/9039589348" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-9039589348</a>'
//         );
//       } else if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
//         addMessage(' Project Pricing**\n\nWe offer customized pricing based on:\n• Project complexity\n• Timeline\n• Features required\n• Support needs\n\n Free Consultation:  Let us understand your requirements for accurate pricing.');
//       } else if (lowerMessage.includes('schedule') || lowerMessage.includes('call')) {
//         addMessage(' Consultation Scheduled!**\n\nOur team will contact you within 24 hours to discuss:\n• Project requirements\n• Timeline\n• Budget considerations\n• Technical specifications\n\nWe look forward to helping you!');
//       } else if (lowerMessage.includes('slot')) {
//         addMessage(' Time Slot Confirmed!**\n\nYou will receive:\n• Calendar invitation\n• Meeting link\n• Project discussion agenda\n• Team introduction\n\nOur experts are excited to collaborate with you!');
//       } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
//         addMessage('  Hello! Welcome to Acore IT Hub!\n\nI am here to help you with:\n• IT Services Information\n• Project Consultations\n• Technical Support\n• Team Coordination\n\nHow can I assist you today?');
//       } else {
//         addMessage('Thank you for your message! Our team will review it and get back to you shortly. \n\nIn the meantime, is there anything specific about our IT services you would like to know?');
//       }
//     }, 1500);
//   };

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       addMessage(inputMessage, true);
//       setInputMessage('');
//       handleBotResponse(inputMessage);
//     }
//   };

//   const handleQuickAction = (action) => {
//     addMessage(action.label, true);
    
//     if (action.response === "our services") {
//       setTimeout(() => {
//         addMessage('services_component', false, 'services');
//       }, 500);
//     } else if (action.response === "book a meeting") {
//       setTimeout(() => {
//         addMessage('time_slots_component', false, 'timeSlots');
//       }, 500);
//     } else {
//       handleBotResponse(action.response);
//     }
//   };

//   const quickActions = [
//     {
//       id: 1,
//       icon: <RiCustomerService2Fill size={18} color={defaultConfig.primary_color} />,
//       label: "Our Services",
//       response: "our services",
//     },
//     {
//       id: 2,
//       icon: <MdSupportAgent size={18} color={defaultConfig.primary_color} />,
//       label: "Talk to Support",
//       response: "talk to support",
//     },
//     {
//       id: 3,
//       icon: <MdEventNote size={18} color={defaultConfig.primary_color} />,
//       label: "Book a Meeting",
//       response: "book a meeting",
//     },
//     {
//       id: 4,
//       icon: <MdLocationOn size={18} color={defaultConfig.primary_color} />,
//       label: "Office Location",
//       response: "office location",
//     },
//     {
//       id: 5,
//       icon: <MdCall size={18} color={defaultConfig.primary_color} />,
//       label: "Contact Team",
//       response: "contact team",
//     },
//   ];

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="acore-chatbot-container">
//       {/* Floating Chat Button */}
//       <div 
//         className={`acore-chat-button ${isOpen ? 'hidden' : ''}`}
//         onClick={() => setIsOpen(true)}
//       >
//         <svg viewBox="0 0 24 24">
//           <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
//         </svg>
//         <div className="chat-pulse"></div>
//       </div>
      
//       <div className="acore-chat-tooltip">
//         💬 Chat with Acore Assistant
//       </div>

//       {/* Chat Widget */}
//       <div className={`acore-chat-widget ${isOpen ? 'open' : ''}`}>
//         {/* Header */}
//         <div className="acore-chat-header">
//           <div className="acore-bot-avatar">
//             <img 
//               src={acorelogo}
//               alt="Acore IT Hub Logo"
//               className="bot-logo animated-logo"
//             />
//           </div>

//           <div className="acore-bot-info">
//             <h3 className="acore-bot-name">{defaultConfig.bot_name}</h3>
//             <p className="acore-bot-status">
//               <span className="acore-status-dot"></span>
//               <span>{defaultConfig.status_text}</span>
//             </p>
//           </div>
//           <button 
//             className="acore-close-button"
//             onClick={() => setIsOpen(false)}
//           >
//             <svg viewBox="0 0 24 24" strokeWidth="2">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>

//         {/* Messages Area */}
//         <div className="acore-chat-messages" ref={chatMessagesRef}>
//           {messages.map((message) => (
//             <div key={message.id} className={`acore-message ${message.isUser ? 'user' : 'bot'}`}>
//               <div className="acore-message-avatar">
//                 {message.isUser ? (
//                   <FaUserCircle className="chat-avatar user-avatar" />
//                 ) : (
//                   <img
//                     src={roboicon}
//                     alt="Bot Avatar"
//                     className="chat-avatar bot-avatar"
//                   />
//                 )}
//               </div>

//               <div className="acore-message-bubble">
//                 {message.type === 'services' ? (
//                   <ServicesComponent />
//                 ) : message.type === 'timeSlots' ? (
//                   <TimeSlotsComponent onTimeSlotSelect={handleTimeSlotSelect} />
//                 ) : (
//                   <>
//                     {message.showIcon && (
//                       <FaRobot style={{ marginRight: '8px', color: '#55A9FF', fontSize: '20px', verticalAlign: 'middle' }} />
//                     )}
//                     <div
//                       dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }}
//                     ></div>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}

//           {isTyping && (
//             <div className="acore-message bot">
//               <div className="acore-message-avatar">
//                 <img
//                   src={roboicon}
//                   alt="Bot Avatar"
//                   className="chat-avatar bot-avatar"
//                 />
//               </div>
//               <div className="acore-message-bubble acore-typing-indicator">
//                 <div className="acore-typing-dot"></div>
//                 <div className="acore-typing-dot"></div>
//                 <div className="acore-typing-dot"></div>
//               </div>
//             </div>
//           )}

//           {/* Quick Actions */}
//           {showQuickActions && (
//             <div className="acore-quick-actions">
//               {quickActions.map((action, index) => (
//                 <button
//                   key={action.id}
//                   className="acore-quick-action-btn"
//                   onClick={() => handleQuickAction(action)}
//                   type="button"
//                   style={{
//                     flexBasis: index < 3 ? "30%" : "45%",
//                   }}
//                 >
//                   <span
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: "5px",
//                       width: "100%",
//                       fontSize: "9px",
//                     }}
//                   >
//                     {action.icon}
//                     <span style={{ textAlign: "center" }}>{action.label}</span>
//                   </span>
//                 </button>
//               ))}
//             </div>
//           )}

//           <div ref={messagesEndRef} />
//         </div>

//         {/* Footer - Fixed Layout */}
//         <div className="acore-chat-footer">
//           <div className="acore-input-container">
//             <input
//               type="text"
//               className="acore-chat-input"
//               placeholder="Type your message here..."
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//             />
//             <div className="acore-input-actions">
//               <button className="acore-emoji-button">😊</button>
//               <button className="acore-send-button" onClick={handleSendMessage}>
//                 <svg viewBox="0 0 24 24">
//                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="acore-powered-by">
//           <div className="acore-tagline">{defaultConfig.tagline}</div>
//           <div className="acore-company-motto">{defaultConfig.subtitle}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;



import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdSupportAgent, MdEventNote, MdLocationOn, MdCall } from "react-icons/md";
import { FaMobileAlt, FaGlobe, FaCloud, FaChartLine, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { FaRobot, FaRegHandPeace } from "react-icons/fa6";

import roboicon from '../assets/images/roboicon.jpg';
import { ArrowLeft } from "lucide-react";

// Services Component
const ServicesComponent = () => {
  const mainServices = {
   Development: [
    "Android",
    "iOS",
    "Web Based",
  ],
    Marketing: [
      "SEO (ON/OFF-Pages)",
      "Meta & Google Ads",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Lead Generation"
    ],
    Designing: ["Figma", "Website/App", "Graphic Designing", "UI/UX" , "Templates"],
  };

  const [activeService, setActiveService] = useState(null);
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [showScheduleMessage, setShowScheduleMessage] = useState(false);

  const handleServiceClick = (serviceName) => {
    setShowSubOptions(false);
    setTimeout(() => {
      setActiveService(serviceName);
      setShowSubOptions(true);
    }, 400);
  };

  const handleBackClick = () => {
    setShowSubOptions(false);
    setTimeout(() => setActiveService(null), 400);
  };

  const handleScheduleClick = () => {
    setShowScheduleMessage(true);
    setTimeout(() => setShowScheduleMessage(false), 4000);
  };

  return (
    <div className="services-simple-list">
      <div className="services-header-box">
        <h3 className="services-title">Our Services</h3>
      </div>

      <div className="services-items">
        {!activeService &&
          Object.keys(mainServices).map((service, index) => (
            <div
              key={index}
              className="service-item"
              onClick={() => handleServiceClick(service)}
            >
              {service}
            </div>
          ))}

        {activeService && showSubOptions && (
          <div className="sub-service-list animate">
            <button className="back-icon-btn" onClick={handleBackClick}>
              <ArrowLeft size={18} />
            </button>
            {mainServices[activeService].map((sub, idx) => (
              <div key={idx} className="sub-service-item">
                {sub}
              </div>
            ))}
          </div>
        )}
      </div>

      {showScheduleMessage && (
        <div className="schedule-message">
          Perfect! Our team will contact you within 24 hours to schedule a
          convenient time for your consultation.
        </div>
      )}

      <div className="services-footer">
        Which service interests you most? 💬
      </div>
    </div>
  );
};

// Time Slots Component
const TimeSlotsComponent = ({ onTimeSlotSelect }) => {
  const timeSlots = [
    { label: "Morning", time: "9 AM - 12 PM" },
    { label: "Afternoon", time: "12 PM - 3 PM" },
    { label: "Evening", time: "3 PM - 6 PM" },
  ];

  return (
    <div className="time-slots-simple">
      <div className="time-slots-header-simple">
        <h3>Great! Please choose a slot:</h3>
      </div>
      
      <div className="time-slots-grid">
      {timeSlots.map((slot, index) => (
        <button
          key={index}
          className={`time-slot-item deepseek-hover ${index === 2 ? 'single' : ''}`}
          onClick={() => onTimeSlotSelect(slot)}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <span className="slot-main-text">{slot.label}</span>
        </button>
      ))}
      </div>
      
      <div className="time-slots-note">
        We'll send you a calendar invitation with meeting details
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm TechBot\nWelcome to TechWorld Pvt. Ltd.\nHow can I help you today?",
      isUser: false,
      timestamp: new Date(),
      showIcon: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const defaultConfig = {
    company_name: "TechWorld Pvt. Ltd.",
    bot_name: "TechBot",
    welcome_message: "Hello! I'm TechBot\nWelcome to TechWorld Pvt. Ltd.\nHow can I help you today?",
    status_text: "Online – typically replies within a minute",
    tagline: "Powered by TechWorld Pvt. Ltd.",
    subtitle: "Innovation | Technology | Excellence",
    primary_color: "#0d6efd",
    secondary_color: "#6610f2",
    background_color: "#FFFFFF",
    text_color: "#2E2E2E"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (text, isUser = false, type = 'text', component = null) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isUser,
      timestamp: new Date(),
      type: type, // 'text', 'services', 'timeSlots'
      component: component
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleTimeSlotSelect = (slot) => {
    addMessage(`Book ${slot.label} Slot`, true);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(
        `Slot confirmed! You'll receive an email invitation shortly for your ${slot.label} (${slot.time}) meeting.<br/>
        Please click the link below to fill in your details 👇
        <a href="https://techworld.com/contact" target="_blank" style="color:#007bff; text-decoration:underline;">
          Fill your details here
        </a>`
      );
    }, 1500);
  };

  const handleBotResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('service') || lowerMessage.includes('our services')) {
        addMessage('services_component', false, 'services');

      } else if (lowerMessage.includes('support') || lowerMessage.includes('talk to support')) {
        addMessage(
          'Technical Support Team <br/><br/>' +
          'Our experts are available 24/7 to assist you.<br/><br/>' +
          '📞 Call (WhatsApp available):<br/>' +
          '<a href="https://wa.me/919999999001" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-99999 90001</a><br/>' +
          '<a href="https://wa.me/919999999002" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-99999 90002</a><br/>' +
          '<a href="https://wa.me/919999999003" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-99999 90003</a><br/><br/>' +
          '<b>Email:</b> <a href="mailto:support@techworld.com" target="_blank" style="color:#0d6efd; text-decoration:underline;">support@techworld.com</a><br/><br/>' +
          'Please share your query details for faster resolution.'
        );

      } else if (lowerMessage.includes('meeting') || lowerMessage.includes('book a meeting')) {
        addMessage('time_slots_component', false, 'timeSlots');

      } else if (lowerMessage.includes('location') || lowerMessage.includes('office location')) {
        addMessage(
          '<b>Our Office Location</b><br><br>' +
          '<b>TechWorld Pvt. Ltd.</b><br>' +
          '123 Tech Street, Silicon Valley, CA 94043<br><br>' +
          '<a href="https://www.google.com/maps" target="_blank" style="color:#0d6efd; font-weight:600; text-decoration:underline;">Get Directions</a><br><br>' +
          'We serve clients globally! '
        );

      } else if (lowerMessage.includes('contact') || lowerMessage.includes('contact team')) {
        addMessage(
          '<b>Contact Our Teams</b><br><br>' +
          '<b>Info:</b> <a href="mailto:info@techworld.com" target="_blank" style="color:#0d6efd; text-decoration:underline;">info@techworld.com</a><br><br>' +
          '<b>HR:</b> <a href="mailto:hr@techworld.com" target="_blank" style="color:#0d6efd; text-decoration:underline;">hr@techworld.com</a><br><br>' +
          '<b>Phone:</b> <a href="https://wa.me/919999999004" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:none;">+91-99999 90004</a>'
        );

      } else if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
        addMessage('Project Pricing**\n\nWe offer customized pricing based on:\n• Project complexity\n• Timeline\n• Features required\n• Support needs\n\nFree Consultation: Let us understand your requirements for accurate pricing.');

      } else if (lowerMessage.includes('schedule') || lowerMessage.includes('call')) {
        addMessage('Consultation Scheduled!**\n\nOur team will contact you within 24 hours to discuss:\n• Project requirements\n• Timeline\n• Budget considerations\n• Technical specifications\n\nWe look forward to helping you!');

      } else if (lowerMessage.includes('slot')) {
        addMessage('Time Slot Confirmed!**\n\nYou will receive:\n• Calendar invitation\n• Meeting link\n• Project discussion agenda\n• Team introduction\n\nOur experts are excited to collaborate with you!');

      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        addMessage('Hello! Welcome to TechWorld!\n\nI am here to help you with:\n• IT Services Information\n• Project Consultations\n• Technical Support\n• Team Coordination\n\nHow can I assist you today?');

      } else {
        addMessage('Thank you for your message! Our team will review it and get back to you shortly.\n\nIn the meantime, is there anything specific about our IT services you would like to know?');
      }
    }, 1500);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, true);
      setInputMessage('');
      handleBotResponse(inputMessage);
    }
  };

  const handleQuickAction = (action) => {
    addMessage(action.label, true);
    
    if (action.response === "our services") {
      setTimeout(() => {
        addMessage('services_component', false, 'services');
      }, 500);
    } else if (action.response === "book a meeting") {
      setTimeout(() => {
        addMessage('time_slots_component', false, 'timeSlots');
      }, 500);
    } else {
      handleBotResponse(action.response);
    }
  };

  const quickActions = [
    {
      id: 1,
      icon: <RiCustomerService2Fill size={18} color={defaultConfig.primary_color} />,
      label: "Our Services",
      response: "our services",
    },
    {
      id: 2,
      icon: <MdSupportAgent size={18} color={defaultConfig.primary_color} />,
      label: "Talk to Support",
      response: "talk to support",
    },
    {
      id: 3,
      icon: <MdEventNote size={18} color={defaultConfig.primary_color} />,
      label: "Book a Meeting",
      response: "book a meeting",
    },
    {
      id: 4,
      icon: <MdLocationOn size={18} color={defaultConfig.primary_color} />,
      label: "Office Location",
      response: "office location",
    },
    {
      id: 5,
      icon: <MdCall size={18} color={defaultConfig.primary_color} />,
      label: "Contact Team",
      response: "contact team",
    },
  ];

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="acore-chatbot-container">
      {/* Floating Chat Button */}
      <div 
        className={`acore-chat-button ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
        </svg>
        <div className="chat-pulse"></div>
      </div>
      
      <div className="acore-chat-tooltip">
        💬 Chat with TechBot
      </div>

      {/* Chat Widget */}
      <div className={`acore-chat-widget ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="acore-chat-header">
          <div className="acore-bot-avatar">
            <img 
              src="data:image/jpeg;base64,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"
              alt="TechWorld Logo"
              className="bot-logo animated-logo"
            />
          </div>

          <div className="acore-bot-info">
            <h3 className="acore-bot-name">{defaultConfig.bot_name}</h3>
            <p className="acore-bot-status">
              <span className="acore-status-dot"></span>
              <span>{defaultConfig.status_text}</span>
            </p>
          </div>
          <button 
            className="acore-close-button"
            onClick={() => setIsOpen(false)}
          >
            <svg viewBox="0 0 24 24" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="acore-chat-messages" ref={chatMessagesRef}>
          {messages.map((message) => (
            <div key={message.id} className={`acore-message ${message.isUser ? 'user' : 'bot'}`}>
              <div className="acore-message-avatar">
                {message.isUser ? (
                  <FaUserCircle className="chat-avatar user-avatar" />
                ) : (
                  <img
                    src={roboicon}
                    alt="Bot Avatar"
                    className="chat-avatar bot-avatar"
                  />
                )}
              </div>

              <div className="acore-message-bubble">
                {message.type === 'services' ? (
                  <ServicesComponent />
                ) : message.type === 'timeSlots' ? (
                  <TimeSlotsComponent onTimeSlotSelect={handleTimeSlotSelect} />
                ) : (
                  <>
                    {message.showIcon && (
                      <FaRobot style={{ marginRight: '8px', color: '#55A9FF', fontSize: '20px', verticalAlign: 'middle' }} />
                    )}
                    <div
                      dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }}
                    ></div>
                  </>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="acore-message bot">
              <div className="acore-message-avatar">
                <img
                  src={roboicon}
                  alt="Bot Avatar"
                  className="chat-avatar bot-avatar"
                />
              </div>
              <div className="acore-message-bubble acore-typing-indicator">
                <div className="acore-typing-dot"></div>
                <div className="acore-typing-dot"></div>
                <div className="acore-typing-dot"></div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {showQuickActions && (
            <div className="acore-quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={action.id}
                  className="acore-quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                  type="button"
                  style={{
                    flexBasis: index < 3 ? "30%" : "45%",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      width: "100%",
                      fontSize: "9px",
                    }}
                  >
                    {action.icon}
                    <span style={{ textAlign: "center" }}>{action.label}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="acore-chat-footer">
          <div className="acore-input-container">
            <input
              type="text"
              className="acore-chat-input"
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className="acore-input-actions">
              <button className="acore-emoji-button">😊</button>
              <button className="acore-send-button" onClick={handleSendMessage}>
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="acore-powered-by">
          <div className="acore-tagline">{defaultConfig.tagline}</div>
          <div className="acore-company-motto">{defaultConfig.subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
