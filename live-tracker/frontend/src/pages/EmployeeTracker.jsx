import React, { useEffect, useState, useRef } from 'react';
import { socket } from '../services/socket';

export default function EmployeeTracker({ user }){
  const [status, setStatus] = useState('waiting'); // waiting | sharing | error
  const [pos, setPos] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation){
      setStatus('error'); return;
    }

    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const ts = new Date().toISOString();
      setPos({ lat, lng, ts });
      socket.emit('employee:location', { lat, lng, ts, userId: user.userId, name: user.name });
      setStatus('sharing');
    };

    const err = (e) => {
      console.error('geo err', e);
      setStatus('error');
    };

    // ask permission & start watch
    watchIdRef.current = navigator.geolocation.watchPosition(success, err, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000
    });

    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [user]);

  return (
    <div style={{maxWidth:760, margin:'20px auto', background:'white', padding:20, borderRadius:8}}>
      <h3>Hi, {user.name} — Live location sharing</h3>
      <p>Status: <b>{status}</b></p>
      {pos ? (
        <div>
          <div>Latitude: {pos.lat}</div>
          <div>Longitude: {pos.lng}</div>
          <div>Updated: {new Date(pos.ts).toLocaleString()}</div>
          <a href={`https://www.google.com/maps?q=${pos.lat},${pos.lng}`} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
        </div>
      ) : <div>No position yet. Allow location permission in browser.</div>}
    </div>
  );
}
