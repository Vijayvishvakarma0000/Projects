import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENTS } from '../../data/mockData';
import './AnnouncementSlider.css';

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
    <section className="announcements-section">
      <div className="announcements-header">
        <h2 className="announcements-title">
          <span className="announcements-icon">📢</span>
          Announcements
        </h2>
      </div>

      <div className="announcements-slider">
        <div className="slider-container">
          {ANNOUNCEMENTS.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`announcement-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="announcement-content">
                <h3 className="announcement-title">{announcement.title}</h3>
                <p className="announcement-text">{announcement.content}</p>
                <div className="announcement-date">
                  <span className="date-icon">📅</span>
                  {announcement.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="slider-controls">
          {ANNOUNCEMENTS.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSlider;