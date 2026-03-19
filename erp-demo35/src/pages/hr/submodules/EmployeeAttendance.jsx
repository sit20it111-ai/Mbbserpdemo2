import React, { useState } from 'react';
import { FormField, Input, Select, SectionTitle, SubmitBtn, DEPTS } from './HRComponents.jsx';

export default function EmployeeAttendance() {
  const [form, setForm] = useState({ department:'', date:'', timeSlot:'', status:'' });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <form className="hr-form" onSubmit={e => { e.preventDefault(); alert('Attendance marked!'); }}>
      <SectionTitle title="Mark Attendance" />
      <div className="form-grid">
        <FormField label="Department" required><Select value={form.department} onChange={set('department')}><option value="">-- Select Department --</option>{DEPTS.map(d=><option key={d}>{d}</option>)}</Select></FormField>
        <FormField label="Date" required><Input type="date" value={form.date} onChange={set('date')} /></FormField>
        <FormField label="Time Slot"><Select value={form.timeSlot} onChange={set('timeSlot')}><option value="">-- Select Slot --</option><option>Morning</option><option>Afternoon</option><option>Evening</option></Select></FormField>
        <FormField label="Status" required><Select value={form.status} onChange={set('status')}><option value="">-- Select Status --</option><option>Present</option><option>Absent</option><option>Leave</option><option>Half Day</option></Select></FormField>
      </div>
      <SubmitBtn label="Mark Attendance" />
    </form>
  );
}
