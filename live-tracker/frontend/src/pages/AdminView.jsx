import React, { useEffect, useState } from 'react';
import { socket } from '../services/socket';

export default function AdminView(){
  const [list, setList] = useState([]);

  useEffect(()=>{
    socket.on('admin:update', (employees) => {
      // employees is array of {userId, name, lat, lng, ts}
      setList(employees || []);
    });

    // initial fetch not required; data will come from server when employees connect
    return () => socket.off('admin:update');
  }, []);

  return (
    <div style={{maxWidth:1000, margin:'20px auto', background:'white', padding:20, borderRadius:8}}>
      <h2>Admin - Live Locations</h2>
      {list.length===0 && <div>No employees online</div>}
      <table style={{width:'100%', borderCollapse:'collapse', marginTop:12}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #eee'}}>
            <th style={{padding:8}}>Name</th>
            <th>userId</th>
            <th>Lat</th>
            <th>Lng</th>
            <th>Last seen</th>
            <th>Map</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e, idx)=>(
            <tr key={idx} style={{borderBottom:'1px solid #f0f0f0'}}>
              <td style={{padding:8}}>{e.name}</td>
              <td>{e.userId}</td>
              <td>{e.lat ?? '-'}</td>
              <td>{e.lng ?? '-'}</td>
              <td>{e.ts ? new Date(e.ts).toLocaleString() : '-'}</td>
              <td>
                {e.lat && e.lng ? (
                  <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps?q=${e.lat},${e.lng}`}>Open</a>
                ) : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
