import React, { useState } from 'react';
import { socket } from '../services/socket';

export default function Login({ onLogin }){
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !userId) return alert('enter name & id');
    // call backend login (mock) - optional
    try {
      await fetch(import.meta.env.VITE_SERVER_URL + '/login', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userId, name })
      });
    } catch(e){}
    // notify socket server
    socket.emit('employee:login', { userId, name });
    onLogin({ userId, name });
  };

  return (
    <form onSubmit={submit} style={{
      maxWidth:420, margin:'30px auto', background:'white', padding:20, borderRadius:8, boxShadow:'0 6px 18px rgba(15,23,42,0.08)'
    }}>
      <h2 style={{marginTop:0}}>Employee Login</h2>
      <label style={{display:'block', marginBottom:8}}>Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:10, marginBottom:12}} />
      <label style={{display:'block', marginBottom:8}}>User ID</label>
      <input value={userId} onChange={e=>setUserId(e.target.value)} style={{width:'100%', padding:10, marginBottom:12}} />
      <button style={{padding:'10px 14px'}}>Login & Start Sharing Location</button>
    </form>
  );
}
