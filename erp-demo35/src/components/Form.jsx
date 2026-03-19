import React from 'react';
export function Field({ label, children, required }) {
  return (<div style={{ display:'flex',flexDirection:'column',gap:4,marginBottom:12 }}><label style={{ fontSize:12,fontWeight:500,color:'#374151' }}>{label}{required&&<span style={{ color:'#dc2626' }}> *</span>}</label>{children}</div>);
}
export function Input(props) { return <input style={{ padding:'7px 10px',border:'1px solid #d1d5db',borderRadius:6,fontSize:13,outline:'none' }} {...props} />; }
export function Select({ children,...props }) { return <select style={{ padding:'7px 10px',border:'1px solid #d1d5db',borderRadius:6,fontSize:13,outline:'none' }} {...props}>{children}</select>; }
