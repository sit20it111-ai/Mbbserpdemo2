import React from 'react';
export default function Table({ columns, data }) {
  return (
    <div style={{ overflowX:'auto' }}>
      <table style={{ width:'100%',borderCollapse:'collapse',fontSize:13 }}>
        <thead><tr style={{ background:'#f1f5f9' }}>{columns.map(c=><th key={c} style={{ padding:'8px 12px',textAlign:'left',fontWeight:600,color:'#374151',borderBottom:'1px solid #e5e7eb' }}>{c}</th>)}</tr></thead>
        <tbody>{data.map((row,i)=><tr key={i} style={{ borderBottom:'1px solid #f3f4f6' }}>{columns.map(c=><td key={c} style={{ padding:'8px 12px',color:'#374151' }}>{row[c]||'—'}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
