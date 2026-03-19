import React from 'react';
import './Student.css';

export default function StudentDashboard() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '320px',
      color: '#9ca3af',
      textAlign: 'center',
      gap: 8,
    }}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5zM6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginTop: 8 }}>Student Module</div>
      <div style={{ fontSize: 13, color: '#9ca3af' }}>Select an option from the sidebar</div>
    </div>
  );
}
