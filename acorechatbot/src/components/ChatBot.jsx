
import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdSupportAgent, MdEventNote, MdLocationOn, MdCall } from "react-icons/md";
import { FaMobileAlt, FaGlobe, FaCloud, FaChartLine, FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { FaRobot, FaRegHandPeace } from "react-icons/fa6";
import acorelogo from '../assets/images/acorelogo.png';
import roboicon from '../assets/images/roboicon.jpg';

// Services Component - ONLY ONE TIME DEFINE KAREN
const ServicesComponent = () => {
  const services = [
    "  Mobile App Development",
    "  Web Development", 
    "  Cloud & DevOps Solutions",
    "  AI & Chatbot Integration",
    "  Digital Marketing",
    "  Cybersecurity Solutions"
  ];

  return (
    <div className="services-simple-list">
      <div className="services-title">  Our IT Services</div>
      <div className="services-items">
        {services.map((service, index) => (
          <div 
            key={index}
            className="service-item"
            style={{ animationDelay: `${index * 0.2}s`,fontFamily:"sans",fontSize:"18px"}}
          >
            {service}
          </div>
        ))}
      </div>
      <div className="services-footer">
        Which service interests you most? 💬
      </div>
    </div>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Acore Assistant\n  Welcome to Acore IT Hub Pvt. Ltd.\nHow can I help you today?",
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
    company_name: "Acore IT Hub Pvt. Ltd.",
    bot_name: "Acore Assistant",
    welcome_message: "Hello! I'm Acore Assistant\n  Welcome to Acore IT Hub Pvt. Ltd.\nHow can I help you today?",
    status_text: "Online – typically replies within a minute",
    tagline: "Powered by Acore IT Hub Pvt. Ltd.",
    subtitle: "Innovation | Technology | Growth",
    service_1: "  Our Services",
    service_2: "  Talk to Support",
    service_3: "  Book a Meeting",
    service_4: "  Office Location",
    service_5: "  Contact Team",
    primary_color: "#8e2de2",
    secondary_color: "#4a00e0",
    background_color: "#FFFFFF",
    text_color: "#2E2E2E"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (text, isUser = false, type = 'text') => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isUser,
      timestamp: new Date(),
      type: type // 'text' or 'services'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBotResponse = (userMessage) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('service') || lowerMessage.includes('our services')) {
        addMessage('services_component', false, 'services');
      } else if (lowerMessage.includes('support') || lowerMessage.includes('talk to support')) {
        addMessage('Technical Support Team \n\nOur experts are available 24/7 to assist you.\n\nCall: +91-8719888693\nEmail: support@acoreithub.com\n\nPlease share your query details for faster resolution.');
      } else if (lowerMessage.includes('meeting') || lowerMessage.includes('book a meeting')) {
        addMessage('Schedule a Consultation\n\nAvailable time slots:\n\nMorning: 9 AM - 12 PM\nAfternoon: 1 PM - 5 PM\nEvening: 6 PM - 9 PM\n\nPlease let us know your preferred time.');
      } else if (lowerMessage.includes('location') || lowerMessage.includes('office location')) {
        addMessage(
          '  <b>Our Office Location</b><br><br>' +
          '<b>Acore IT Hub Pvt. Ltd.</b><br>' +
          'Behind Apollo Premiere, Vijay Nagar, Ratna Lok Colony, Indore, MP 452010<br><br>' +
          '  <a href="https://www.google.com/maps/dir/ACORE+IT+HUB+PVT+LTD.+%7C+Web+Development+%7C+Digital+Marketing+%7C+App+Development+Services,+Apollo+Premiere,+Vijay+Nagar,+Ratna+Lok+Colony,+Indore,+Madhya+Pradesh/22.7494444,75.8991667/@22.7494729,75.8966492,721m/data=!3m2!1e3!4b1!4m8!4m7!1m5!1m1!1s0x3962fd564d244811:0x76ef7253df9a8f0e!2m2!1d75.8992922!2d22.7495001!1m0?entry=ttu&g_ep=EgoyMDI1MTEwMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" style="color:#4a00e0; font-weight:600; text-decoration:underline;">Get Directions</a><br><br>' +
          'We serve clients globally! '
        );
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('contact team')) {
 addMessage(
  '  <b>Contact Our Teams</b><br><br>' +
  '  <b>Development:</b> dev@acoreithub.com<br>' +
  '  <b>Marketing:</b> marketing@acoreithub.com<br>' +
  '  <b>Support:</b> support@acoreithub.com<br>' +
  '  <b>HR:</b> <a href="https://mail.google.com/mail/u/0/#search/hrofficial%40acoreithub.com?compose=new" target="_blank" style="color:#4a00e0; text-decoration:underline;">hrofficiale@acoreithub.com</a><br><br>' +
  '  <b>Phone:</b> +91-9039589348'
);

} else if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
        addMessage(' Project Pricing**\n\nWe offer customized pricing based on:\n• Project complexity\n• Timeline\n• Features required\n• Support needs\n\n Free Consultation:  Let us understand your requirements for accurate pricing.');
      } else if (lowerMessage.includes('schedule') || lowerMessage.includes('call')) {
        addMessage(' Consultation Scheduled!**\n\nOur team will contact you within 24 hours to discuss:\n• Project requirements\n• Timeline\n• Budget considerations\n• Technical specifications\n\nWe look forward to helping you!');
      } else if (lowerMessage.includes('slot')) {
        addMessage(' Time Slot Confirmed!**\n\nYou will receive:\n• Calendar invitation\n• Meeting link\n• Project discussion agenda\n• Team introduction\n\nOur experts are excited to collaborate with you!');
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        addMessage('  Hello! Welcome to Acore IT Hub!\n\nI am here to help you with:\n• IT Services Information\n• Project Consultations\n• Technical Support\n• Team Coordination\n\nHow can I assist you today?');
      } else {
        addMessage('Thank you for your message! Our team will review it and get back to you shortly. \n\nIn the meantime, is there anything specific about our IT services you would like to know?');
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
      // Directly show services component
      setTimeout(() => {
        addMessage('services_component', false, 'services');
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
        💬 Chat with Acore Assistant
      </div>

      {/* Chat Widget */}
      <div className={`acore-chat-widget ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="acore-chat-header">
          <div className="acore-bot-avatar">
            <img 
              src={acorelogo}
              alt="Acore IT Hub Logo"
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
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="acore-quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                  type="button"
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      width: "100%",
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

        {/* Footer - Fixed Layout */}
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