import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.entries(timeLeft).map(([unit, value]) => (
    <span key={unit} style={{ margin: '0 10px', fontSize: '1.5rem' }}>
      <strong>{value.toString().padStart(2, '0')}</strong> {unit}
    </span>
  ));

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '30px',
      borderRadius: '10px',
      textAlign: 'center',
      margin: '30px 0'
    }}>
      <h2 style={{ marginBottom: '20px' }}>⏰ Hurry Up! Deal Ends In:</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        {timerComponents.length ? timerComponents : <span>Deal expired!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;
