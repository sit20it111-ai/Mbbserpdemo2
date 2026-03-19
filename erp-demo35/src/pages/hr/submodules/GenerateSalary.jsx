import React, { useState } from 'react';
import { FormField, Input, Select, SectionTitle, SubmitBtn, MONTHS, YEARS, DEPTS } from './HRComponents.jsx';

export default function GenerateSalary() {
  const [form, setForm] = useState({ department:'', month:'', year:'', basic:'', allowances:'', deductions:'' });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));
  return (
    <form className="hr-form" onSubmit={e => { e.preventDefault(); alert('Salary generated!'); }}>
      <SectionTitle title="Salary Generation" />
      <div className="form-grid">
        <FormField label="Department" required><Select value={form.department} onChange={set('department')}><option value="">-- Select Department --</option>{DEPTS.map(d=><option key={d}>{d}</option>)}</Select></FormField>
        <FormField label="Month" required><Select value={form.month} onChange={set('month')}><option value="">-- Select Month --</option>{MONTHS.map(m=><option key={m}>{m}</option>)}</Select></FormField>
        <FormField label="Year" required><Select value={form.year} onChange={set('year')}><option value="">-- Select Year --</option>{YEARS.map(y=><option key={y}>{y}</option>)}</Select></FormField>
        <FormField label="Basic Salary"><Input type="number" min="0" value={form.basic} onChange={set('basic')} placeholder="0.00" /></FormField>
        <FormField label="Allowances"><Input type="number" min="0" value={form.allowances} onChange={set('allowances')} placeholder="0.00" /></FormField>
        <FormField label="Deductions"><Input type="number" min="0" value={form.deductions} onChange={set('deductions')} placeholder="0.00" /></FormField>
      </div>
      <SubmitBtn label="Generate Salary" />
    </form>
  );
}
