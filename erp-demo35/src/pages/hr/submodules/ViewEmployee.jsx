import React, { useState } from 'react';
import { FormField, Input } from './HRComponents.jsx';

export default function ViewEmployee() {
  const [search, setSearch] = useState('');
  return (
    <div className="hr-form">
      <div className="form-field" style={{ maxWidth: 360 }}>
        <label className="form-label">Search Employee</label>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or code..." />
      </div>
      <div className="table-wrap">
        <table className="hr-table">
          <thead><tr><th>#</th><th>Emp Code</th><th>Name</th><th>Department</th><th>Designation</th><th>Mobile</th><th>Actions</th></tr></thead>
          <tbody><tr><td colSpan={7} style={{ textAlign:'center', color:'#999', padding:24 }}>No employees found.</td></tr></tbody>
        </table>
      </div>
    </div>
  );
}
