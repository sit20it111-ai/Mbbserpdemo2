import React from 'react';
export default function Card({ title, children, style }) {
  return (
    <div style={{ background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,overflow:'hidden',marginBottom:16,...style }}>
      {title && <div style={{ background:'#1e293b',color:'#fff',padding:'10px 16px',fontSize:13,fontWeight:600 }}>{title}</div>}
      <div style={{ padding:'16px 18px' }}>{children}</div>
    </div>
  );
}
