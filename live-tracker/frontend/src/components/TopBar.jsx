import React from 'react';
export default function TopBar({ onViewChange }){
  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 20px', background:'#0f172a', color:'white'
    }}>
      <div style={{fontSize:18, fontWeight:700}}>LiveTracker</div>
      <div>
        <button onClick={()=>onViewChange('login')} style={{marginRight:8}}>Login</button>
        <button onClick={()=>onViewChange('employee')} style={{marginRight:8}}>Employee</button>
        <button onClick={()=>onViewChange('admin')}>Admin</button>
      </div>
    </div>
  );
}
