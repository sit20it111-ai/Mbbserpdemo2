import React, { useState } from 'react';
import { FormField, Input, Select, SectionTitle, SubmitBtn, DEPTS } from './HRComponents.jsx';

export default function PaySalary() {
  const [form, setForm] = useState({ department:'', month:'', amount:'', method:'', date:'' });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <form className="hr-form" onSubmit={e => { e.preventDefault(); alert('Payment recorded!'); }}>
      <SectionTitle title="Salary Payment" />
      <div className="form-grid">
        <FormField label="Department" required><Select value={form.department} onChange={set('department')}><option value="">-- Select Department --</option>{DEPTS.map(d=><option key={d}>{d}</option>)}</Select></FormField>
        <FormField label="Salary Month" required><Input type="month" value={form.month} onChange={set('month')} /></FormField>
        <FormField label="Amount" required><Input type="number" min="0" value={form.amount} onChange={set('amount')} placeholder="0.00" /></FormField>
        <FormField label="Payment Method" required><Select value={form.method} onChange={set('method')}><option value="">-- Select --</option><option>Bank Transfer</option><option>Cash</option><option>Cheque</option><option>UPI</option></Select></FormField>
        <FormField label="Payment Date" required><Input type="date" value={form.date} onChange={set('date')} /></FormField>
      </div>
      <SubmitBtn label="Submit Payment" />
    </form>
  );
}
