import React, { useState } from 'react';
import Login from './pages/Login';
import EmployeeTracker from './pages/EmployeeTracker';
import AdminView from './pages/AdminView';
import TopBar from './components/TopBar';

export default function App(){
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // 'login' | 'employee' | 'admin'

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background:'#f5f7fb' }}>
      <TopBar onViewChange={setView} />
      <div style={{ padding: 20 }}>
        {view === 'login' && <Login onLogin={(u)=>{ setUser(u); setView('employee'); }} />}
        {view === 'employee' && user && <EmployeeTracker user={user} />}
        {view === 'admin' && <AdminView />}
      </div>
    </div>
  );
}
